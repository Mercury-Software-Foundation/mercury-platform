import React from "react";
import LoginForm from "./LoginForm";
import image from "../../public/assets/loginSideImage.png";

const Login = () => {
  return (
    <div className="grid lg:grid-cols-10 grid-cols-1 h-screen">
      <div className="lg:col-span-6">
        <LoginForm />
      </div>

      <div
        className="w-full h-full bg-cover relative col-span-4 lg:visible invisible"
        style={{
          backgroundImage: `url(${image.src})`,
        }}
      >
        <p className="absolute text-black text-2xl font-[600] bottom-24 px-16 font- text-center leading-10">
          “Unlock the power of simplicity with Mercury Where websites come to
          life effortlessly”
        </p>
      </div>
    </div>
  );
};

export default Login;
