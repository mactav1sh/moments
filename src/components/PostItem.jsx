import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CardLoader from './CardLoader';
import firestoreDB from '../firebase.config';
import { doc, getDoc } from 'firebase/firestore';

function PostItem({ post, id }) {
  const { title, userId, description, imageUrl, timestamp } = post;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Date and time
  const date = new Date(timestamp.seconds * 1000).toLocaleDateString();
  const time = new Date(timestamp.seconds * 1000).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  useEffect(() => {
    const fetchPost = async () => {
      // Get user
      const userRef = doc(firestoreDB, 'users', userId);
      const userSnap = await getDoc(userRef);
      setUser(userSnap.data());
      setLoading(false);
    };

    fetchPost();
  }, [userId]);

  const onLoad = () => {
    if (imageRef.current.complete) setImageLoaded(true);
  };

  if (loading) return <CardLoader />;
  return (
    <>
      {/* Card */}
      <Link
        to={`/moment/${id}`}
        className={`group flex-col w-72 space-y-1 bg-beige-100 shadow-lg hover:scale-105 duration-300 overflow-hidden ${
          imageLoaded ? 'flex' : 'hidden'
        }`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-72 group-hover:brightness-75 duration-300"
          onLoad={onLoad}
          ref={imageRef}
        />

        <div className="p-4">
          <p className="font-semibold">{title}</p>
          <p className="text-gray-500 text-sm mb-1">@{user.name}</p>
          <div className="h-0.5 w-1/3 bg-gray-200 mb-2"></div>
          {description ? (
            <p className="text-base">{description.slice(0, 25)} . . .</p>
          ) : null}
          <div className="flex space-x-2 text-xs text-gray-500 mt-4">
            <span>{time}</span>
            <span>{date}</span>
          </div>
        </div>
      </Link>

      {!imageLoaded && <CardLoader />}
    </>
  );
}

export default PostItem;
