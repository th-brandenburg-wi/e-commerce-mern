import axios from "axios";
import React, { useState } from "react";
import { backendUrl } from "../utils.js";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      //console.log("login and pw -- " + email + password); // for testing
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      //console.log(response);
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Admin Login</h2>
        <p className="mb-6 text-gray-500 text-center">
          Sign in to the admin dashboard
        </p>
        <form onSubmit={onSubmitHandler} className="w-full flex flex-col gap-4">
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Admin Email"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <button
            type="submit"
            className="bg-orange-500 text-white font-semibold py-2 rounded hover:bg-orange-600 transition-colors mt-2"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
