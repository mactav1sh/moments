import { useState, createContext } from 'react';
import firestoreDB from '../firebase.config';
import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
export const CommentsContext = createContext();

function CommentsProvider({ children }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const addComment = async (docData) => {
    const commentsRef = collection(firestoreDB, 'comments');
    const docsnap = await addDoc(commentsRef, docData);
    setComments((comments) => [
      ...comments,
      { data: { ...docData }, id: docsnap.id },
    ]);
  };

  const deleteComment = async (commentId) => {
    const docRef = doc(firestoreDB, 'comments', commentId);
    const isSure = window.confirm('Are you sure you want to delete ?');
    if (isSure) {
      await deleteDoc(docRef);
      const filterdComments = comments.filter((com) => com.id !== commentId);
      setComments(filterdComments);
    }
  };

  const value = {
    comments,
    loading,
    setLoading,
    setComments,
    deleteComment,
    addComment,
  };

  return (
    <CommentsContext.Provider value={value}>
      {children}
    </CommentsContext.Provider>
  );
}

export default CommentsProvider;
