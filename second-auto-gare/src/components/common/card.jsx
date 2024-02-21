import React from 'react';

export const Card = ({ children }) => {
  return (
    <div className="bg-white lg:w-full md:w-full w-72 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
      {children}
    </div>
  );
};


export const CarCard = ({ children }) => {
  return (
    <div className='h-fit rounded-2xl border-2 bg-card'>
      {children}
    </div>
  )
} 