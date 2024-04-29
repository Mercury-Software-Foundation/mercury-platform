"use client";

import { ReactNode } from "react";

interface ButtonPropType {
  variant: "primary" | "secondary" | "textButton";
  size: "sm" | "md" | "lg";
  buttonText: string;
  classnames?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  disabled?: boolean;
  [key: string]: any;
}

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-xs rounded-sm",
  md: "px-4 py-1.5 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg",
};
export const Button = ({ disabled = false, ...props }: ButtonPropType) => {
  const variantStyles = {
    primary:
      `text-white dark:text-[#18181b] bg-[#18181b] dark:bg-[#FAFAFA] ${!props.disabled && " hover:bg-[#18181b]/80 dark:hover:text-white"}`,
    secondary:
      "bg-transparent border-[1px] text-[#18181b] dark:text-[#FAFAFA] dark:bg-transparent",
    textButton:
      "bg-transparent text-[#18181b] dark:text-[#FAFAFA] dark:bg-transparent",
  };
  return (
    <button
      className={`${variantStyles[props.variant]} ${sizeStyles[props.size]
        } ${disabled ? " cursor-not-allowed bg-opacity-80" : " cursor-pointer bg-opacity-100"} flex justify-center gap-2 items-center w-full ${props.classnames}`}
      {...props}
    >
      {props.iconPosition === "left" && props.icon}
      {props.buttonText}
      {props.iconPosition === "right" && props.icon}
    </button>
  );
};
