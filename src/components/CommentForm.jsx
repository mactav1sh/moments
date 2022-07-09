import { useState, useContext } from 'react';
import { auth } from '../firebase.config';
import { serverTimestamp } from 'firebase/firestore';
import { CommentsContext } from '../context/CommentsContext';
import { toast } from 'react-toastify';

function CommentForm({ postId }) {
  const [text, setText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const { addComment } = useContext(CommentsContext);

  const onChange = (e) => {
    setText(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setDisabled(true);
      const docData = {
        text,
        postId: postId,
        userId: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      };

      addComment(docData);
      setText('');
      setDisabled(false);
    } catch (error) {
      toast.error('Some error happened, please try again');
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        value={text}
        onChange={onChange}
        id="comment"
        type="text"
        placeholder="Comment"
        className="py-2 px-2 text-sm bg-beige-100 border  border-pTeal-200 focus:outline-none mb-3 w-full "
      />

      <button
        type="submit"
        className="text-center w-full bg-gradient-to-r from-pTeal-100 to-teal-300 text-white uppercase text-base py-1 tracking-wider shadow-md hover:brightness-105 active:shadow-sm disabled:bg-slate-500 duration-300"
        disabled={disabled}
      >
        Submit
      </button>
    </form>
  );
}

export default CommentForm;
