import React, { ReactNode } from "react";
interface cardprops {
  children?: React.ReactNode;
  classNames?: string;
}
const Card = ({ children, classNames }: cardprops) => {
  return (
    <div
      className={`${classNames} dark:bg-black-700 dark:border-[0.1px] border-l-slate-300 dark:text-white w-full h-full rounded-lg  dark:shadow-none shadow-md  shadow-gray-500`}
    >
      {children}
    </div>
  );
};

export default Card;
