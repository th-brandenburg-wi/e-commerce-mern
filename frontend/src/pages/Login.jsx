import React, { useState } from "react";
import { assets } from "../assets/assets";

const Login = () => {
  const [currentState, setCurrentState] = useState("login");

  const onSubmitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-screen flex items-center justify-center border-t">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <img src={assets.logo} alt="Logo" className="w-20 mb-6" />
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          {currentState === "login" ? "Login" : "Sign Up"}
        </h2>
        <p className="mb-6 text-gray-500 text-center">
          {currentState === "login"
            ? "Sign in to your account"
            : "Create a new account"}
        </p>
        <form onSubmit={onSubmitHandler} className="w-full flex flex-col gap-4">
          {currentState === "signup" && (
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          {currentState === "signup" && (
            <input
              type="password"
              placeholder="Confirm Password"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          )}
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors mt-2"
          >
            {currentState === "login" ? "Login" : "Sign Up"}
          </button>
        </form>
        <div className="mt-4 w-full flex flex-col items-center">
          {currentState === "login" ? (
            <button
              type="button"
              className="text-orange-500 hover:underline text-sm"
              onClick={() => setCurrentState("signup")}
            >
              New Account?
            </button>
          ) : (
            <button
              type="button"
              className="text-orange-500 hover:underline text-sm"
              onClick={() => setCurrentState("login")}
            >
              Already have an Account?
            </button>
          )}
          <p
            className={`text-orange-500 hover:underline text-sm mt-1 ${
              currentState === "signup" ? "hidden" : ""
            }`}
          >
            Forgot Password?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
