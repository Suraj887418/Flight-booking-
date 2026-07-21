import React, { useState } from "react";
// Force Vite HMR reload
const BookTicketBox = ({
  formData,
  handleFormDataChange,
  handleFlightSearch,
}) => {
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

  const onInputChange = (e) => {
    handleFormDataChange(e);
    fetchCities(e.target.value);
  };
  
  return (
    <div className="py-12 max-w-[1200px] mx-auto px-4 group/box">
      <div className="bg-white rounded-[32px] p-8 shadow-2xl shadow-blue-900/5 hover:shadow-blue-500/10 hover:-translate-y-1.5 transition-all duration-500 relative mb-12 border border-slate-100 hover:border-blue-100">
        
        {/* Trip Type Selector */}
        <div className="flex gap-6 items-center justify-start mb-8 text-sm font-bold text-slate-600">
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
            <input type="radio" name="ticketType" id="oneWay" className="w-4 h-4 text-blue-600 accent-blue-600" defaultChecked />
            ONE WAY
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:text-blue-600 transition-colors">
            <input type="radio" name="ticketType" id="return" className="w-4 h-4 text-blue-600 accent-blue-600" />
            RETURN
          </label>
        </div>

        {/* Main Search Fields Container */}
        <div className="flex flex-col lg:flex-row w-full rounded-2xl border border-slate-200 hover:border-blue-300 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 hover:divide-blue-100 bg-white shadow-sm hover:shadow-md hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/20 focus-within:divide-blue-200">
          
          {/* FROM */}
          <div className="flex flex-col p-5 flex-1 hover:bg-blue-50/50 transition-colors cursor-text relative group/input">
            <label className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1 group-hover/input:text-blue-600 transition-colors">From</label>
            <input
              name="from"
              type="text"
              list="cities"
              placeholder="Delhi"
              value={formData.from}
              className="outline-none bg-transparent text-2xl md:text-3xl font-light text-slate-600 placeholder-slate-300 w-full truncate"
              onChange={onInputChange}
            />
          </div>

          {/* TO */}
          <div className="flex flex-col p-5 flex-1 hover:bg-blue-50/50 transition-colors cursor-text relative group/input">
            <label className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1 group-hover/input:text-blue-600 transition-colors">To</label>
            <input
              name="to"
              type="text"
              list="cities"
              value={formData.to}
              placeholder="Mumbai"
              className="outline-none bg-transparent text-2xl md:text-3xl font-light text-slate-600 placeholder-slate-300 w-full truncate"
              onChange={onInputChange}
            />
          </div>

          {/* DEPARTURE */}
          <div className="flex flex-col p-5 flex-1 hover:bg-blue-50/50 transition-colors cursor-text group/input">
            <label className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1 group-hover/input:text-blue-600 transition-colors">Departure</label>
            <input
              name="departDate"
              type="date"
              value={formData.departDate}
              className="outline-none bg-transparent text-xl md:text-2xl font-light text-slate-600 w-full mt-1 cursor-pointer"
              onChange={handleFormDataChange}
            />
          </div>

          {/* FLIGHT TYPE */}
          <div className="flex flex-col p-5 flex-1 hover:bg-blue-50/50 transition-colors cursor-pointer group/input">
            <label className="text-[13px] font-bold text-slate-800 uppercase tracking-wider mb-1 group-hover/input:text-blue-600 transition-colors">Class</label>
            <select
              name="flightType"
              id="flightType"
              className="w-full text-xl md:text-2xl font-light text-slate-600 mt-1 outline-none bg-transparent border-none cursor-pointer appearance-none"
              onChange={handleFormDataChange}
            >
              <option value="Economy">Economy</option>
              <option value="Premium">Premium Economy</option>
              <option value="Business">Business</option>
              <option value="First">First Class</option>
            </select>
          </div>
        </div>

        {/* Search Button */}
        <div className="flex justify-center mt-8">
          <button
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-base uppercase tracking-wider py-3.5 px-12 rounded-full shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 hover:scale-[1.02] transition-all duration-300"
            onClick={handleFlightSearch}
          >
            Search Flights
          </button>
        </div>
      </div>

      <datalist id="cities">
        {citySuggestions.map((city, index) => (
          <option key={index} value={city} />
        ))}
      </datalist>
    </div>
  );
};

export default BookTicketBox;
