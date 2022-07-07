import React, { useEffect, useState } from 'react';
import firestoreDB, { auth } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { AiOutlineEdit } from 'react-icons/ai';
import { TiTimesOutline } from 'react-icons/ti';

function CommentItem({ comment }) {
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (auth.currentUser.uid === comment.data.userId) setAuthorized(true);
  }, [comment.data.userId]);

  const fullDate = new Date(comment.data.timestamp.seconds * 1000)
    .toLocaleString()
    .split(', ');
  const [date, time] = fullDate;

  const onDelete = async (commentId) => {
    const docRef = doc(firestoreDB, 'comments', commentId);
    const isSure = window.confirm('Are you sure you want to delete ?');

    if (isSure) {
      await deleteDoc(docRef);
    }
  };

  const onEdit = async (commentId) => {};

  return (
    <div className="border-b pr-1 pb-1 mb-3 break-words relative">
      <p className="text-teal-700 text-sm mb-1">@{comment.data.username}</p>
      <p className="max-w-xs">{comment.data.text}</p>
      <div className="flex space-x-2 text-xs justify-end mt-2 mr-2 text-gray-500">
        <span>{time}</span>
        <span>{date}</span>
      </div>
      {/* EDIT AND DELETE */}

      {authorized ? (
        <div className="flex justify-end mb-2 space-x-1 absolute top-0 right-2">
          <button
            onClick={() => onEdit(comment.id)}
            className="hover:text-pTeal-200 text-base"
          >
            <AiOutlineEdit />
          </button>

          <button
            onClick={() => onDelete(comment.id)}
            className="hover:text-red-700 text-lg"
          >
            <TiTimesOutline />
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default CommentItem;
