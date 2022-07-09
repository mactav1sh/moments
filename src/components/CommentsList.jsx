import { useEffect, useContext } from 'react';
import firestoreDB from '../firebase.config';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import CommentItem from './CommentItem';
import { CommentsContext } from '../context/CommentsContext';

function CommentsList({ postId }) {
  const { comments, setComments } = useContext(CommentsContext);

  useEffect(() => {
    const fetchComments = async () => {
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
    };

    fetchComments();
  }, [postId]);

  return (
    <>
      {/* Comments section */}
      <div className="mb-7">
        <p className="font-semibold mb-1">Comments</p>

        <div className="h-0.5 w-16 bg-gray-200 mb-4"></div>

        {/* Comments */}
        {comments.length > 0 ? (
          <div className="h-60 overflow-auto">
            {comments.length > 0
              ? comments.map((comment) => {
                  console.log(comment);
                  return <CommentItem comment={comment} key={comment.id} />;
                })
              : null}
          </div>
        ) : (
          <p className="text-gray-400 mb-5">No Comments yet</p>
        )}
      </div>
    </>
  );
}

export default CommentsList;
