import React from "react";
import { InputField } from "@repo/ui/inputField";
import { Button } from "@repo/ui/button";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
const LoginForm = () => {
  return (
    <div className="flex justify-center flex-col items-center w-full p-5 h-full">
      <div className="w-full flex justify-end ">
        <Link href={"/login"} className="font-bold">
          Login
        </Link>
      </div>
      <form className="flex-1 flex flex-col gap-3 justify-center items-center md:min-w-[390px] min-w-full">
        <h1 className="font-bold text-3xl">Create Account</h1>
        <h5 className="text-gray-500 md:text-base text-sm dark:text-gray-300">
          Enter your email below to Create your account
        </h5>

        <InputField
          placeholder="Enter your email"
          type="email"
          size="md"
          classNames="border-gray-300"
        />
        <Button buttonText="Continue" variant="primary" size="lg" />

        <div className="relative w-full mt-6 flex justify-center items-center">
          <div className="absolute h-0.5 w-full bg-gray-100 dark:bg-gray-800"></div>
          <p className="text-xs font-extralight text-gray-500 dark:text-gray-300 z-10 bg-white dark:bg-black px-1">
            OR CONTINUE WITH
          </p>
        </div>

        <Button
          buttonText="GitHub"
          variant="secondary"
          iconPosition="left"
          icon={<FaGithub size={22}/>}
          size="lg"
          classnames="font-bold mt-3"
        />

        <div className="text-xs flex justify-center flex-col items-center gap-1 text-gray-500 dark:text-gray-300">
          <p>By clicking continue, you agree to our</p>
          <p>
            <Link href="#" className="text-blue-600 font-bold cursor-pointer">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="" className="text-blue-600 font-bold cursor-pointer">
              Privacy Policy.
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
