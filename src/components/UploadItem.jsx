import React from 'react';
import { Link } from 'react-router-dom';

function UploadItem({ post }) {
  // DATE AND TIME
  const date = new Date(
    post?.data.timestamp.seconds * 1000
  ).toLocaleDateString();
  const time = new Date(post?.data.timestamp.seconds * 1000).toLocaleTimeString(
    [],
    {
      hour: '2-digit',
      minute: '2-digit',
    }
  );

  return (
    <Link
      to={`/moment/${post.id}`}
      className="flex space-x-2 border rounded-md relative hover:brightness-90 hover:bg-gray-50 duration-200 overflow-hidden"
    >
      <div>
        <img
          src={post.data.imageUrl}
          alt={post.data.title}
          className="h-24 w-20 object-cover"
        />
      </div>

      <div className="flex flex-col p-1 w-full">
        <p className=" text-md ">{post.data.title}</p>
        <p className="text-sm text-gray-500 ">
          {post.data.description.slice(0, 15)}...
        </p>
        <div className="flex space-x-1 mt-3 mr-2 text-gray-400 text-xs">
          <span>{time}</span> <span>{date}</span>
        </div>
      </div>
      {/* PRIVATE BADGE */}
      {post.data.private ? (
        <div className="bg-gray-200 absolute top-2 right-2 px-2 py-1 rounded-full text-xs">
          private
        </div>
      ) : null}
    </Link>
  );
}

export default UploadItem;
