import React from "react";
export const Primary_btn = ({ children }) => {
  return (
    <>
      <div className="p-2 px-2 py-2 text-xs text-white rounded-sm md:text-base hover:scale-105 bg-purple">
        {children}
      </div>
    </>
  );
};

export const Save_btn = ({ children }) => {
  return (
    <div className="flex justify-end">
      <button
        type="submit"
        className="bg-green bg-opacity-90 text-white px-2.5 py-1 rounded-md"
      >
        {children}
      </button>
    </div>
  );
};

export const Delete_btn = ({ className, children, onClick }) => {
  return (
    <button className={` ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

export const Update_btn = ({ className, children, onClick }) => {
  return (
    <button className={` ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};
