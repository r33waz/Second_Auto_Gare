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

export const Save_btn = ({ className, children, onClick, type }) => {
  return (
    <button type={`${type}`} className={`${className}`} onClick={onClick}>
      {children}
    </button>
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
