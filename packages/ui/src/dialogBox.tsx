"use client"
import { useState } from 'react';
interface DialogBoxProps{
    state:boolean;
    setState: (state: boolean) => void;
    onClick?:()=>void;
    children: React.ReactNode;
    title?:string
}
export function DialogBox({state,setState,onClick,children,...rest}:DialogBoxProps) {

    const toggleModal = () => {
        setState(!state);
    };

    return (
        <>
      <div
        id="default-modal"
        aria-hidden={!state}
        className={`${
            state ? '' : 'hidden'
        } overflow-x-hidden overflow-y-auto fixed h-modal md:h-full top-4 left-0 right-0 md:inset-0 z-50 flex flex-row justify-center items-center  dark:bg-transparent `}
      >
        <div className="relative w-full max-w-2xl px-4 h-full md:h-auto">
          <div className="bg-white rounded-lg shadow relative dark:bg-black">
            <div className="flex items-start justify-between  rounded-t dark:border-gray-600  pt-5 pl-6 pr-6">
                {rest.title && 
              <h3 className="text-gray-900 text-xl lg:text-2xl font-semibold dark:text-white">
                {rest?.title}
              </h3>
                }
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={toggleModal}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div className=" space-y-6 pt-5 pl-6 pr-6 pb-5">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
        )
}
