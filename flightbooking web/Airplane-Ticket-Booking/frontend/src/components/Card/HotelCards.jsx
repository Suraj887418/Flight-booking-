import React from "react";
import { FaStar } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { HiLocationMarker } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

const HotelCards = (props) => {
  const navigate = useNavigate();

  const handleBookFlight = (e) => {
    e.stopPropagation(); // Prevent opening the detail modal
    navigate(`/search?to=${encodeURIComponent(props.data.location)}`);
  };

  return (
    <div 
      onClick={props.onClick}
      className="group w-[240px] rounded-[30px] overflow-hidden border-[1px] border-gray-200 hover:border-blue-200 pb-5 h-full flex flex-col bg-white hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 cursor-pointer relative"
    >
      <div className="relative rounded-t-[30px] rounded-b-[20px] overflow-hidden shrink-0 mx-2 mt-2">
        <img
          src={props.data.imageUrl}
          alt=""
          className="w-full h-[280px] object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
        <div className="flex justify-center items-center gap-[10px] absolute top-5 right-5 bg-black/40 px-3 py-1 rounded-full z-10">
          <p className="text-white">{props.data.rating}</p>
          <FaStar className="text-white" />
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="px-5 flex-1 flex flex-col">
          <h1 className="text-[18px] font-bold mt-5 leading-tight group-hover:text-blue-600 transition-colors">{props.data.location}</h1>
          <div className="flex items-center gap-1 mt-1 mb-auto">
            <HiLocationMarker className="text-gray-500 shrink-0" />
            <p className="text-gray-600 text-sm truncate">{props.data.country}</p>
          </div>
          <button 
            onClick={handleBookFlight}
            className="bg-black hover:bg-blue-600 w-full text-white px-5 py-2.5 mt-5 rounded-lg transition duration-300 font-semibold shadow-md relative z-20"
          >
            Book Flight now
          </button>
        </div>
      </div>
    </div>
  );
};

export default HotelCards;
