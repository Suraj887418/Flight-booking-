import React, { useState, useContext } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

function Navbar() {
  const { user, token, isUserLoggedIn, isAdmin } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const defaultPic = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
  const profilePic = user?.profilePic || defaultPic;
  const isDefaultPic = !profilePic || profilePic.includes("avatar-3814049_1280.png") || profilePic.includes("default");
  
  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="bg-white/90 backdrop-blur-lg sticky top-0 z-50 border-b border-slate-100 px-6 md:px-12 py-4 print:hidden">
      <nav className="flex justify-between items-center w-full max-w-[1400px] mx-auto">
        <div className="flex-1 flex items-center">
          <Link to={"/"}>
            <h2 className="text-2xl font-bold text-blue-600 tracking-tight">
              AeroSync<span className="text-slate-800">Booking</span>
            </h2>
          </Link>
        </div>

        {/* Mobile Menu & Links */}
        <div
          className={`nav-links duration-500 md:static absolute bg-white md:bg-transparent md:min-h-fit min-h-[60vh] left-0 ${
            menuOpen ? "top-[70px] shadow-xl" : "top-[-100%]"
          } md:w-auto w-full flex justify-center items-center px-5 md:px-0 z-40 shrink-0 mx-4`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-2 gap-8 w-full md:w-auto pt-8 md:pt-0 pb-8 md:pb-0">
            <li>
              <Link to={"/"} className="relative px-4 py-2 text-[15px] font-semibold text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 block w-full text-center">
                Home
              </Link>
            </li>
            <li>
              <Link to={"/search"} className="relative px-4 py-2 text-[15px] font-semibold text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 block w-full text-center">
                Flights
              </Link>
            </li>
            <li>
              <Link to={"/hotels"} className="relative px-4 py-2 text-[15px] font-semibold text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 block w-full text-center">
                Hotels
              </Link>
            </li>
            <li>
              <Link to={"/contact"} className="relative px-4 py-2 text-[15px] font-semibold text-slate-600 hover:text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300 block w-full text-center">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Right Actions */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-6 z-50">
          {isUserLoggedIn ? (
            <Link to={isAdmin ? "/admin" : "/profile"}>
              {isDefaultPic ? (
                <div className="w-11 h-11 rounded-full border-2 border-blue-100 shadow-sm hover:border-blue-500 transition-colors bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-lg">
                  {initial}
                </div>
              ) : (
                <img
                  src={profilePic}
                  alt="Profile"
                  className="w-11 h-11 rounded-full border-2 border-blue-100 shadow-sm hover:border-blue-500 transition-colors object-cover"
                />
              )}
            </Link>
          ) : (
            <Link to={"/login"}>
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-bold uppercase tracking-wider px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 transition-all duration-300">
                Sign In
              </button>
            </Link>
          )}
          <RxHamburgerMenu
            onClick={toggleMenu}
            className="text-3xl text-slate-700 cursor-pointer md:hidden hover:text-blue-600 transition-colors"
          />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
