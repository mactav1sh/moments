import React, { useContext, useEffect, useState, useCallback } from 'react';
import CommentsList from './CommentsList';
import CommentForm from './CommentForm';
import { SignedContext } from '../context/SignedContext';
import firestoreDB from '../firebase.config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import CommentItem from './CommentItem';
import { loadingContext } from '../context/LoadingContext';
import Loader from './Loader';

function Comments({ postId }) {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);
  const { signedIn } = useContext(SignedContext);

  const fetchComments = useCallback(async () => {
    // Create collection ref
    const commentsRef = collection(firestoreDB, 'comments');
    // Creating Query
    const q = query(
      commentsRef,
      where('postId', '==', postId),
      orderBy('timestamp')
    );

    const commentsArr = [];
    // Getting data from firebase
    const querySnap = await getDocs(q);
    // Adding data to posts array and saving to states
    querySnap.forEach((doc) =>
      commentsArr.push({ id: doc.id, data: doc.data() })
    );

    setComments(commentsArr);
    setLoading(false);
  }, [postId]);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  if (loading) return <Loader />;
  return (
    <>
      <CommentsList postId={postId} comments={comments} />
      {signedIn ? (
        <CommentForm fetchComments={fetchComments} postId={postId} />
      ) : null}
    </>
  );
}

export default Comments;
