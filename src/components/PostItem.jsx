import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import CardLoader from './CardLoader';

function PostItem({ post, id }) {
  const { title, username, description, imageUrl } = post;
  const [imageLoaded, setImageLoaded] = useState(false);
  const imageRef = useRef();

  const onLoad = () => {
    // console.log('loaded');
    if (imageRef.current.complete) setImageLoaded(true);
  };

  // TODO: Add Link component with image url to image page
  return (
    <>
      {/* Card */}
      <Link
        to={`/moment/${id}`}
        className={`flex-col w-72 space-y-1 bg-beige-100 shadow-lg hover:scale-105 duration-300 ${
          imageLoaded ? 'flex' : 'hidden'
        }`}
      >
        <img
          src={imageUrl}
          alt={title}
          className="object-cover h-72"
          onLoad={onLoad}
          ref={imageRef}
        />

        <div className="p-4">
          <p className="font-semibold">{title}</p>
          <p className="text-gray-500 text-sm mb-1">@{username}</p>
          <div className="h-0.5 w-1/3 bg-gray-200 mb-2"></div>
          <p className="text-base">{description.slice(0, 25)} . . .</p>
        </div>
      </Link>

      {!imageLoaded && <CardLoader />}
    </>
  );
}

export default PostItem;
