import React from 'react';

function CardLoader() {
  return (
    <div className="flex flex-col w-72 space-y-1 bg-beige-100 shadow-lg">
      <div className="h-56 bg-gray-200 animate-pulse"></div>

      <div className="p-4 animate-pulse">
        <div className="h-4 w-2/3 bg-gray-200 mb-1"></div>

        <div className="h-3 w-1/2 bg-gray-200 mb-2"></div>

        <div className="h-0.5 w-1/3 bg-gray-200 mb-2"></div>
        <div className="h-4 w-full bg-gray-200 mb-1"></div>
        <div className="h-4 w-1/3 bg-gray-200"></div>
      </div>
    </div>
  );
}

export default CardLoader;
