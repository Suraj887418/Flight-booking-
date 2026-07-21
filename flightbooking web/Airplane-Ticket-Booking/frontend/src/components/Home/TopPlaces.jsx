import React, { useRef, useState } from "react";
import HotelCards from "../Card/HotelCards";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import { HiOutlineArrowSmLeft, HiOutlineArrowSmRight, HiLocationMarker } from "react-icons/hi";
import { FaStar } from "react-icons/fa";

import "swiper/css";

import { flightLocationData } from "../../assets/data/FlightData";

const TopPlaces = () => {
  const swiperRef = useRef(null);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const goNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const goPrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  return (
    <div className="mt-5 max-w-[1400px] mx-auto relative">
      <div className="mb-5">
        <h1 className="text-[35px] md:text-[50px] font-bold">
          Choose your tour!
        </h1>
      </div>

      <Swiper
        ref={swiperRef}
        modules={[Navigation]}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 70,
          },
        }}
      >
        {flightLocationData.map((data, index) => (
          <SwiperSlide
            className="w-full flex justify-center items-stretch h-auto py-4"
            key={index}
          >
            <HotelCards data={data} onClick={() => setSelectedPlace(data)} />
          </SwiperSlide>
        ))}
        <div className="flex gap-2 my-5">
          <div
            className="w-[45px] h-[45px] border-[1px] border-black flex justify-center items-center rounded-full hover:bg-black hover:text-white cursor-pointer transition duration-200 swiper-button-prev"
            onClick={goPrev}
          >
            <HiOutlineArrowSmLeft size={25} />
          </div>
          <div
            className="w-[45px] h-[45px] border-[1px] border-black flex justify-center items-center rounded-full hover:bg-black hover:text-white cursor-pointer transition duration-200 swiper-button-next"
            onClick={goNext}
          >
            <HiOutlineArrowSmRight size={25} />
          </div>
        </div>
      </Swiper>

      {/* Detail Modal Popup */}
      {selectedPlace && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedPlace(null)}
          ></div>
          
          <div className="relative bg-white rounded-[2rem] w-full max-w-2xl shadow-2xl transform transition-all overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in duration-200 max-h-[90vh]">
            <button 
              className="absolute top-4 right-4 text-white hover:text-slate-200 bg-black/30 hover:bg-black/50 rounded-full p-2 transition-colors z-20"
              onClick={() => setSelectedPlace(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-full md:w-2/5 h-48 md:h-auto relative shrink-0">
              <img src={selectedPlace.imageUrl} alt={selectedPlace.location} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 flex justify-center items-center gap-[6px] bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full">
                <p className="text-white font-bold">{selectedPlace.rating}</p>
                <FaStar className="text-yellow-400" />
              </div>
            </div>
            
            <div className="p-8 flex flex-col w-full overflow-y-auto">
              <h2 className="text-3xl font-extrabold text-slate-800 mb-2">{selectedPlace.location}</h2>
              <div className="flex items-center gap-1 mb-6">
                <HiLocationMarker className="text-blue-500 text-lg" />
                <p className="text-slate-500 font-medium text-lg">{selectedPlace.country}</p>
              </div>
              
              <div className="h-1 w-12 bg-blue-600 rounded-full mb-6"></div>
              
              <p className="text-slate-600 text-[16px] leading-relaxed mb-8 flex-1">
                {selectedPlace.description || "Experience the breathtaking beauty of this exotic destination. Discover local culture, stunning landscapes, and create unforgettable memories."}
              </p>
              
              <button 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-3.5 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30 flex justify-center items-center gap-2 mt-auto"
                onClick={() => setSelectedPlace(null)}
              >
                <span>Close Details</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopPlaces;
