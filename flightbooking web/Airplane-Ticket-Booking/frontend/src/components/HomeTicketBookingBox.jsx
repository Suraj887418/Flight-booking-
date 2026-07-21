import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TbPlaneDeparture, TbPlaneArrival, TbCalendarEvent, TbArmchair } from "react-icons/tb";

const HomeTicketBookingBox = () => {
  const navigate = useNavigate();
  const [citySuggestions, setCitySuggestions] = useState([]);

  const fetchCities = async (query) => {
    if (query.length < 2) return;
    try {
      const res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${query}&count=5`);
      const data = await res.json();
      if (data.results) {
        setCitySuggestions(data.results.map(city => `${city.name}, ${city.admin1 ? city.admin1 + ', ' : ''}${city.country}`));
      }
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };

  const navToSearchPage = () => {
    const from = document.querySelector('input[name="from"]').value;
    const to = document.querySelector('input[name="to"]').value;
    const departDate = document.querySelector('input[name="departDate"]').value;
    navigate(`/search?from=${from}&to=${to}&departDate=${departDate}`);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-4 md:px-0 relative z-20 mt-8 mb-16 group">
      <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-10 border border-slate-100 hover:shadow-[0_20px_50px_rgba(37,99,235,0.1)] hover:-translate-y-1.5 transition-all duration-500">
        
        {/* Trip Type Selector */}
        <div className="flex gap-6 items-center mb-8 pb-6 border-b border-slate-100">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="ticketType" id="oneWay" defaultChecked className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">One way</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer group">
            <input type="radio" name="ticketType" id="return" className="w-5 h-5 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <span className="font-semibold text-slate-700 group-hover:text-blue-600 transition-colors">Return</span>
          </label>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          
          {/* Location Inputs */}
          <div className="lg:col-span-5 grid grid-cols-1 md:grid-cols-2 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-300 relative group/location">
            <div className="flex flex-col px-6 py-4 border-b md:border-b-0 md:border-r border-slate-200/60">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <TbPlaneDeparture className="text-blue-500 text-base" /> FROM
              </span>
              <input
                name="from"
                type="text"
                list="cities"
                placeholder="Where from?"
                className="bg-transparent outline-none focus:outline-none focus:ring-0 border-none focus:border-transparent text-xl font-bold text-slate-800 placeholder-slate-300 w-full p-0 transition-colors"
                onChange={(e) => fetchCities(e.target.value)}
              />
            </div>
            
            <div className="flex flex-col px-6 py-4 md:pl-10">
              <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                <TbPlaneArrival className="text-blue-500 text-base" /> TO
              </span>
              <input
                name="to"
                type="text"
                list="cities"
                placeholder="Where to?"
                className="bg-transparent outline-none focus:outline-none focus:ring-0 border-none focus:border-transparent text-xl font-bold text-slate-800 placeholder-slate-300 w-full p-0 transition-colors"
                onChange={(e) => fetchCities(e.target.value)}
              />
            </div>

            {/* Floating swap button */}
            <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-11 h-11 bg-white rounded-full shadow-lg items-center justify-center border border-slate-100 hover:bg-blue-50 hover:text-blue-600 hover:scale-110 cursor-pointer z-10 transition-all duration-300 group-hover/location:shadow-blue-500/20">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" /></svg>
            </div>
          </div>

          <datalist id="cities">
            {citySuggestions.map((city, idx) => (
              <option key={idx} value={city} />
            ))}
          </datalist>

          {/* Date Input */}
          <div className="lg:col-span-3 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] px-6 py-4 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-300">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <TbCalendarEvent className="text-blue-500 text-base" /> DEPARTURE
            </span>
            <input
              name="departDate"
              type="date"
              className="bg-transparent outline-none focus:outline-none focus:ring-0 border-none focus:border-transparent text-xl font-bold text-slate-800 w-full cursor-pointer p-0"
            />
          </div>

          {/* Flight Type Input */}
          <div className="lg:col-span-2 bg-slate-50/50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.05)] hover:shadow-[0_8px_30px_-4px_rgba(6,81,237,0.1)] px-6 py-4 focus-within:bg-white focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 transition-all duration-300">
            <span className="text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <TbArmchair className="text-blue-500 text-base" /> CLASS
            </span>
            <select
              name="flightType"
              id="flightType"
              className="bg-transparent outline-none focus:outline-none focus:ring-0 border-none focus:border-transparent text-xl font-bold text-slate-800 w-full cursor-pointer p-0"
            >
              <option value="Economy">Economy</option>
              <option value="Premium">Premium</option>
              <option value="Business">Business</option>
              <option value="First">First</option>
            </select>
          </div>

          {/* Search Button */}
          <div className="lg:col-span-2 h-full flex items-center lg:items-center justify-center lg:justify-end">
            <button
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-base py-3 px-6 rounded-lg shadow-md hover:shadow-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              onClick={navToSearchPage}
            >
              <span>Search</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HomeTicketBookingBox;
