import React, { useState, useEffect } from 'react';
import { FaCookieBite } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if the user has already made a choice
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      // Small delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleConsent = (choice) => {
    localStorage.setItem('cookieConsent', choice);
    setIsClosing(true);
    // Wait for the slide-down animation to finish before removing from DOM
    setTimeout(() => {
      setIsVisible(false);
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-50 p-4 transition-transform duration-500 ease-in-out ${
        isClosing ? 'translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-slate-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        {/* Decorative Background */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-50 rounded-full blur-2xl opacity-50 pointer-events-none"></div>

        <div className="flex items-start gap-4 z-10">
          <div className="bg-blue-100 p-3 rounded-full shrink-0 mt-1">
            <FaCookieBite className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-800 mb-1">We value your privacy</h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We use cookies to enhance your browsing experience, serve personalized ads or content, and analyze our traffic. By clicking "Accept All", you consent to our use of cookies.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto shrink-0 z-10">
          <button 
            onClick={() => handleConsent('rejected')}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl border border-slate-300 text-slate-600 font-semibold hover:bg-slate-50 hover:text-slate-800 transition-colors"
          >
            Reject All
          </button>
          <button 
            onClick={() => handleConsent('accepted')}
            className="flex-1 md:flex-none px-6 py-2.5 rounded-xl bg-blue-600 text-white font-semibold shadow-md hover:bg-blue-700 hover:shadow-lg transition-all"
          >
            Accept All
          </button>
        </div>

        {/* Close Button */}
        <button 
          onClick={() => handleConsent('dismissed')}
          className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
        >
          <IoClose className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
