"use client";

interface ButtonPropType {
  variant: "primary" | "secondary" | "textButton";
  size: "sm" | "md" | "lg";
  buttonText: string;
  classnames?: string;
  [key: string]: any;
}

const variantStyles = {
  primary:
    "bg-[#18181b] text-white dark:text-[#18181b] dark:bg-[#FAFAFA] hover:bg-[#18181b]/80 dark:hover:text-white",
  secondary:
    "bg-transparent border-[1px] text-[#18181b] dark:text-[#FAFAFA] dark:bg-transparent",
  textButton:
    "bg-transparent text-[#18181b] dark:text-[#FAFAFA] dark:bg-transparent",
};

const sizeStyles = {
  sm: "px-2.5 py-0.5 text-xs rounded-sm",
  md: "px-4 py-1.5 text-sm rounded-md",
  lg: "px-6 py-3 text-base rounded-lg",
};
export const Button = (props: ButtonPropType) => {
  return (
    <div
      className={`${variantStyles[props.variant]} ${
        sizeStyles[props.size]
      } cursor-pointer flex justify-center items-center w-full ${props.classnames}`}
      {...props}
    >
      {props.buttonText}
    </div>
  );
};
