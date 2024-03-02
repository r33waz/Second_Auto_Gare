import React from "react";

export const Card = ({ children }) => {
  return (
    <div className="bg-white lg:w-full md:w-full w-72 p-4 rounded-lg shadow-[0px_0px_4px_1px_#00000024]">
      {children}
    </div>
  );
};

export const CarCard = ({ children }) => {
  return <div className="border-2 h-fit rounded-2xl bg-card">{children}</div>;
};

export const SmallCard = ({ children }) => {
  return (
    <div className="px-2.5 py-2 text-sm text-purple rounded-2xl bg-purple bg-opacity-20">
      {children}
    </div>
  );
};
