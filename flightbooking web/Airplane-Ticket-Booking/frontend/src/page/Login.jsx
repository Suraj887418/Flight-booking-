import React, { useState, useContext } from "react";
import { BACKENDURL } from "../Config/Config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../context/authContext";
import { FiEye, FiEyeOff, FiMail, FiLock } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(authContext);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleFormDataChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    for (const key in formData) {
      if (!formData[key]) {
        toast.error(
          `${
            key === "email" ? "Email" : key === "password" ? "Password" : key
          } is required`
        );
        return;
      } else if (key === "email" && !emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        return;
      }
    }

    try {
      const loginURL = BACKENDURL + "/api/v1/auth/login";

      const response = await fetch(loginURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error);
        return;
      }

      console.log(data);

      console.log(response.ok);

      if (response.ok) {
        toast.success("User logged in successfully");

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: data.data,
            isAdmin: data.data.isAdmin,
            token: data.token,
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="px-[30px] md:px-[30px] my-16">
      <div className="flex flex-col items-center justify-center p-0 md:px-6 mx-auto md:min-h-[60vh]">
        <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 border border-slate-100 sm:max-w-md p-8 md:p-10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-800 md:text-3xl">
                Welcome back
              </h1>
              <p className="text-sm text-slate-500 mt-2 font-medium">Please enter your details to sign in.</p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-1.5 text-[13px] font-bold text-slate-700 uppercase tracking-wider"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-slate-50 border border-slate-200 text-slate-800 sm:text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white block w-full p-3.5 pl-11 transition-all outline-none placeholder-slate-400"
                    placeholder="Enter your email address"
                    required=""
                    onChange={handleFormDataChange}
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-1.5 text-[13px] font-bold text-slate-700 uppercase tracking-wider"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                    <FiLock size={18} />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                    className="bg-slate-50 border border-slate-200 text-slate-800 sm:text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white block w-full p-3.5 pl-11 pr-12 transition-all outline-none placeholder-slate-400"
                    required=""
                    onChange={handleFormDataChange}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-400 hover:text-blue-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-between pt-1">
                <Link
                  to={"/forgotPassword"}
                  className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors ml-auto"
                >
                  Forgot password?
                </Link>
              </div>
              <button
                onClick={handleLogin}
                className="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold uppercase tracking-wider rounded-xl text-sm px-5 py-4 text-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 mt-4"
              >
                Sign in to account
              </button>
              <p className="text-sm font-medium text-slate-500 text-center pt-2">
                Don't have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
