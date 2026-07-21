import React, { useState, useContext } from "react";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import { authContext } from "../../context/authContext";

function Navbar() {
  const { user, isUserLoggedIn, isAdmin } = useContext(authContext);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const defaultPic = "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png";
  const profilePic = user?.profilePic || defaultPic;
  const isDefaultPic = !profilePic || profilePic.includes("avatar-3814049_1280.png") || profilePic.includes("default");
  
  const userName = user?.name || "User";
  const initial = userName.charAt(0).toUpperCase();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="bg-white/95 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 print:hidden relative">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo */}
          <Link to={"/"} onClick={closeMenu} className="flex-shrink-0 flex items-center z-50">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight">
              AeroSync<span className="text-slate-800">Booking</span>
            </h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex items-center gap-8">
              <li><Link to={"/"} className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Home</Link></li>
              <li><Link to={"/search"} className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Flights</Link></li>
              <li><Link to={"/hotels"} className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Hotels</Link></li>
              <li><Link to={"/contact"} className="text-slate-600 hover:text-blue-600 font-semibold transition-colors">Contact</Link></li>
            </ul>
          </nav>

          {/* Right Actions (Profile / Sign In) */}
          <div className="flex items-center gap-4 z-50">
            {isUserLoggedIn ? (
              <Link to={isAdmin ? "/admin" : "/profile"} onClick={closeMenu}>
                {isDefaultPic ? (
                  <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-base shadow hover:shadow-md transition-all">
                    {initial}
                  </div>
                ) : (
                  <img
                    src={profilePic}
                    alt="Profile"
                    className="w-9 h-9 md:w-11 md:h-11 rounded-full object-cover shadow hover:shadow-md transition-all"
                  />
                )}
              </Link>
            ) : (
              <Link to={"/login"} onClick={closeMenu}>
                <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs md:text-sm font-bold px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-lg transition-all">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile Hamburger Button */}
            <button className="md:hidden text-2xl text-slate-700 p-1" onClick={toggleMenu}>
              {menuOpen ? <RxCross2 /> : <RxHamburgerMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-xl transition-all duration-300 ease-in-out origin-top ${
          menuOpen ? "opacity-100 scale-y-100 pointer-events-auto" : "opacity-0 scale-y-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col px-6 py-6 gap-6">
          <Link to={"/"} onClick={closeMenu} className="text-lg font-semibold text-slate-700 hover:text-blue-600">Home</Link>
          <Link to={"/search"} onClick={closeMenu} className="text-lg font-semibold text-slate-700 hover:text-blue-600">Flights</Link>
          <Link to={"/hotels"} onClick={closeMenu} className="text-lg font-semibold text-slate-700 hover:text-blue-600">Hotels</Link>
          <Link to={"/contact"} onClick={closeMenu} className="text-lg font-semibold text-slate-700 hover:text-blue-600">Contact</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
