import React, { ReactNode } from 'react'
interface cardprops{
width?:number;
height?:number;
br?:number;
elevation?:number;
text?:string;
children?:React.ReactNode;
}
const Card = ({width,height,br,text,children}:cardprops) => {
    
  return (
    <div className='dark:bg-black-700 dark:border-[0.1px] border-l-slate-300 dark:text-white w-full h-full rounded-lg  dark:shadow-none shadow-md  shadow-gray-500 '>
         {children}
    </div>
  )
}

export default Card;