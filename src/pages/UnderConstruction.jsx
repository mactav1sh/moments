import React from 'react';
import { IoConstructOutline } from 'react-icons/io5';

function UnderConstruction() {
  return (
    <div className="flex flex-col space-y-4 items-center justify-center min-h-screen bg-beige-200">
      <IoConstructOutline className="h-60 w-60 animate-pulse text-pTeal-200" />
      <h1 className="text-3xl font-semibold">Will be Available Soon</h1>
    </div>
  );
}

export default UnderConstruction;
