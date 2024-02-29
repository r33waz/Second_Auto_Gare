import React from "react";

export const HeroTitle = ({ children }) => {
  return <div className="font-semibold md:text-4xl ">{children}</div>;
};

export const HeroSubtitle = ({ children }) => {
  return <div className="font-semibold md:text-3xl ">{children}</div>;
};
