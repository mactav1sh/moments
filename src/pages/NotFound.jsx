import React from 'react';
import { BiError } from 'react-icons/bi';

function NotFound() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-beige-200">
      <BiError className="h-60 w-60 animate-pulse text-pTeal-200" />
      <h1 className="text-3xl font-semibold">Page Not Found</h1>
    </div>
  );
}

export default NotFound;
