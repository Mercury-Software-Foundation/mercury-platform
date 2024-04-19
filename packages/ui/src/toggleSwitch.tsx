"use client"
import  { useEffect } from "react";
import { useTheme } from "next-themes";

const ModeToggleButton = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    setTheme("system");
  }, []);

  return (
    <div
      className={` w-[60px] rounded-[100px] shadow-gray-500 shadow-md ${
        theme == "dark" ? "bg-[black]" : "bg-[white]"
      }`}
    >
      <button
        className={`w-8 h-8 rounded-full  ${theme == "dark"?"bg-black":"bg-black"} flex items-center transition duration-300 focus:outline-none shadow  ${
          theme == "dark"
            ? "bg-gray-700 translate-x-full"
            : "bg-yellow-500 -translate-x-2"
        }`}
        onClick={() => (theme == "dark" ? setTheme("light") : setTheme("dark"))}
      >
        <div
          id="switch-toggle"
          className="w-8 h-8 relative rounded-full transition duration-500 transform p-1 text-white"
        >
          {theme == "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                // style={{ stroke: 'black' }} 
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
          )}
        </div>
      </button>
    </div>
  );
};

export default ModeToggleButton;