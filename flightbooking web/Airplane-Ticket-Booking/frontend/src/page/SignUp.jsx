import React, { useEffect, useState } from "react";
import { BACKENDURL } from "../Config/Config";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser } from "react-icons/fi";

const SignUp = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
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

  const handleSignup = async (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

    for (const key in formData) {
      if (!formData[key]) {
        toast.error(
          `${
            key === "name"
              ? "Full Name"
              : key === "email"
              ? "Email"
              : key === "password"
              ? "Password"
              : key
          } is required`
        );
        return;
      } else if (key === "email" && !emailRegex.test(formData.email)) {
        toast.error("Invalid email format");
        return;
      } else if (key === "password" && !passwordRegex.test(formData.password)) {
        toast.error(
          "Password must contain at least 8 characters, including uppercase, lowercase letters, and numbers"
        );
        return;
      }
    }

    try {
      const SignUpURL = BACKENDURL + "/api/v1/auth/register";

      const response = await fetch(SignUpURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Successful registration
        toast.success(data.message);
        setFormData({
          name: "",
          email: "",
          password: "",
        });

        // Redirect to login page
        navigate("/login");
      } else {
        // Error response from backend
        toast.error(data.error);
      }
    } catch (error) {
      console.log(error);
      // Handle network or other errors
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="px-[30px] md:px-[30px] my-16">
      <div className="flex flex-col items-center justify-center p-0 md:px-6 mx-auto md:min-h-[60vh]">
        <div className="w-full bg-white rounded-[32px] shadow-2xl shadow-blue-900/5 border border-slate-100 sm:max-w-md p-8 md:p-10 relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 space-y-6">
            <div className="text-center">
              <h1 className="text-2xl font-extrabold leading-tight tracking-tight text-slate-800 md:text-3xl">
                Create an account
              </h1>
              <p className="text-sm text-slate-500 mt-2 font-medium">Join us to book your next adventure.</p>
            </div>
            
            <form className="space-y-5">
              <div>
                <label
                  htmlFor="name"
                  className="block mb-1.5 text-[13px] font-bold text-slate-700 uppercase tracking-wider"
                >
                  Full name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                    <FiUser size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="bg-slate-50 border border-slate-200 text-slate-800 sm:text-sm rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white block w-full p-3.5 pl-11 transition-all outline-none placeholder-slate-400"
                    placeholder="Enter your full name"
                    required=""
                    onChange={handleFormDataChange}
                  />
                </div>
              </div>
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
                    placeholder="Create a strong password"
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
              <button
                onClick={handleSignup}
                className="w-full text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold uppercase tracking-wider rounded-xl text-sm px-5 py-4 text-center shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02] transition-all duration-300 mt-6"
              >
                Create Account
              </button>
              <p className="text-sm font-medium text-slate-500 text-center pt-2">
                Already have an account?{" "}
                <Link
                  to={"/login"}
                  className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
