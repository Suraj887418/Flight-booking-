import React, { useState } from "react";

import { GoPaperAirplane } from "react-icons/go";
import { IoWalletOutline } from "react-icons/io5";
import { MdOutlinePeople } from "react-icons/md";
import { CiDiscount1 } from "react-icons/ci";

const ValuesWeProvide = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const values = [
    {
      icon: <GoPaperAirplane className="rotate-[-35deg]" />,
      title: "Airport pickup",
      desc: "We provide escort from the airport to the hotel seamlessly.",
      fullDesc: "Enjoy a stress-free arrival with our premium airport pickup service. Our professional drivers will be waiting for you at the terminal with a personalized sign, ready to assist with your luggage and escort you seamlessly to your hotel. Say goodbye to the hassle of navigating foreign public transport or waiting for cabs."
    },
    {
      icon: <IoWalletOutline />,
      title: "Easy payment",
      desc: "Quick and easy booking of flights with secure gateways.",
      fullDesc: "We believe booking your dream vacation should be as relaxing as the trip itself. Our platform supports a wide array of payment methods including all major credit cards, digital wallets, and secure bank transfers. Enjoy encrypted, lightning-fast transactions with flexible installment plans available for your convenience."
    },
    {
      icon: <MdOutlinePeople />,
      title: "Best tour guide",
      desc: "Our top-rated tour guides are ready to elevate your trip.",
      fullDesc: "Immerse yourself in the local culture with our hand-picked, certified tour guides. Fluent in multiple languages and deeply knowledgeable about hidden gems, our guides go beyond the standard tourist trails to provide authentic, enriching experiences tailored exclusively for you."
    },
    {
      icon: <CiDiscount1 />,
      title: "Lots of promos",
      desc: "Various exclusive promotions and massive discount drops.",
      fullDesc: "Travel more while spending less! We constantly update our platform with massive discount drops, seasonal sales, and exclusive loyalty rewards. Members get early access to flash sales, ensuring you always get the best possible value for your premium travel experiences."
    },
  ];

  return (
    <div className="py-20 max-w-[1400px] mx-auto px-4 md:px-0 relative">
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-800 mb-4 tracking-tight">
          Top values for you
        </h1>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">
          Try a variety of premium benefits using our world-class services
        </p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((val, index) => (
          <div 
            key={index} 
            onClick={() => setSelectedCard(val)}
            className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center cursor-pointer relative overflow-hidden"
          >
            <div className="w-20 h-20 bg-blue-50 group-hover:bg-blue-600 rounded-full text-4xl text-blue-600 group-hover:text-white flex justify-center items-center mb-6 transition-colors duration-300 shadow-inner z-10">
              {val.icon}
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors z-10">{val.title}</h2>
            <p className="text-slate-500 leading-relaxed z-10">
              {val.desc}
            </p>
            
            {/* Click indicator */}
            <div className="absolute bottom-4 opacity-0 group-hover:opacity-100 transition-opacity text-blue-500 text-sm font-semibold flex items-center gap-1 z-10">
              Learn more <span className="text-lg leading-none">&rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Popup */}
      {selectedCard && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
            onClick={() => setSelectedCard(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white rounded-[2rem] p-8 md:p-10 max-w-lg w-full shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in duration-200">
            <button 
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-full p-2.5 transition-colors"
              onClick={() => setSelectedCard(null)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <div className="w-20 h-20 bg-blue-50 rounded-2xl text-4xl text-blue-600 flex justify-center items-center mb-6 shadow-sm">
              {selectedCard.icon}
            </div>
            
            <h2 className="text-3xl font-extrabold text-slate-800 mb-4">{selectedCard.title}</h2>
            
            <div className="h-1 w-12 bg-blue-600 rounded-full mb-6"></div>
            
            <p className="text-slate-600 text-lg leading-relaxed">
              {selectedCard.fullDesc}
            </p>
            
            <button 
              className="mt-10 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg py-4 px-6 rounded-xl transition-colors shadow-lg hover:shadow-xl hover:shadow-blue-500/30"
              onClick={() => setSelectedCard(null)}
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ValuesWeProvide;
