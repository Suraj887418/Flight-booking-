import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-10 print:hidden">
      <div className="max-w-[1400px] mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center text-sm md:text-base">
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-slate-500 font-medium mb-6 md:mb-0">
          <Link to="/">
            <h2 className="text-xl md:text-2xl font-bold text-blue-600 tracking-tight mr-0 md:mr-4 hover:opacity-80 transition-opacity">AeroSync<span className="text-slate-800">Booking</span></h2>
          </Link>
          <div className="flex items-center gap-4 md:gap-6 mt-2 md:mt-0">
            <Link to="/privacy" className="hover:text-blue-600 cursor-pointer transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-blue-600 cursor-pointer transition-colors">Terms of Service</Link>
            <Link to="/help" className="hover:text-blue-600 cursor-pointer transition-colors">Help Center</Link>
          </div>
        </div>
        <div className="text-slate-400 font-medium text-center md:text-right text-sm">
          © {new Date().getFullYear()} AeroSync. Elevating your travel experience. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
