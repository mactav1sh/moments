import { useEffect, useState, useContext } from 'react';
import firestoreDB from '../firebase.config';
import { getDoc, doc, deleteDoc } from 'firebase/firestore';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Loader from '../components/Loader';
import CommentsList from '../components/CommentsList';
import CommentForm from '../components/CommentForm';
import { auth } from '../firebase.config';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { SignedContext } from '../context/SignedContext';

function Post() {
  const [user, setUser] = useState(null);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const { signedIn } = useContext(SignedContext);

  // FETCH POST
  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(firestoreDB, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      setPost({ id: docSnap.id, data: docSnap.data() });
      // Get user
      const userRef = doc(firestoreDB, 'users', docSnap.data().userId);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());

      setLoading(false);

      if (auth.currentUser?.uid === docSnap.data().userId) setAuthorized(true);
    };

    fetchPost();
  }, [params.id]);

  const onDelete = async (postid) => {
    const docRef = doc(firestoreDB, 'posts', postid);
    const isSure = window.confirm('Are you sure you want to delete ?');
    if (isSure) {
      await deleteDoc(docRef);
      navigate('/');
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-beige-200">
      <div className="flex flex-col max-w-6xl bg-beige-100 shadow-lg md:flex-row my-10">
        {/* IMAGE */}
        <img
          src={post.data.imageUrl}
          alt={post.data.title}
          className="max-w-sm mb-5 md:mb-0"
        />

        <div className="px-8 pb-9 w-96 md:mt-10">
          {/* Modify and delete - only if authorized */}
          {authorized ? (
            <div className="flex justify-end mb-2 space-x-4">
              <Link
                to={`/edit-moment/${post.id}`}
                onClick={onDelete}
                className="hover:text-pTeal-200 text-xl"
              >
                <FaEdit />
              </Link>
              <button
                onClick={() => onDelete(post.id)}
                className="hover:text-red-700 text-lg"
              >
                <FaTrashAlt />
              </button>
            </div>
          ) : null}

          {/*Post Information */}
          <h3 className="text-3xl font-semibold mb-1"> {post.data.title} </h3>
          {/* Link to profile */}
          <Link
            to={`/profile/${post.data.userId}`}
            className="text-lg mb-2 text-gray-500 inline-block"
          >
            @{user.name}
          </Link>

          <div className="h-0.5 w-1/3 bg-gray-200 mb-3"></div>
          <p className="text-xl mb-10">{post.data.description} </p>

          {/* Comments section */}
          <CommentsList postId={params.id} />
          {signedIn ? <CommentForm postId={params.id} /> : null}
        </div>
      </div>
    </div>
  );
}

export default Post;
