import React, { ReactNode } from "react";
interface cardprops {
  children?: React.ReactNode;
  classNames?: string;
  rows: number;
}
const Card = ({ children, classNames, rows }: cardprops) => {
  return (
    <div
      style={{
        minHeight: `${rows * 275}px`
      }}
      className={`${classNames} overflow-y-auto dark:bg-gray-700 border-[1px] border-[#E5E5E5] dark:border-[#6b7280]  dark:text-white w-full h-full rounded-lg `}
    >
      {children}
    </div>
  );
};

export default Card;
