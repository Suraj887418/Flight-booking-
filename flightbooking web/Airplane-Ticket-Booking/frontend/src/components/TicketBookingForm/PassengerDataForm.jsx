// PassengerDataForm.js
import React, { useEffect, useState } from "react";
import { countries } from "../../assets/data/Countries";
import { states as fallbackStates } from "../../assets/data/States";
import { toast } from "react-toastify";

const PassengerDataForm = ({
  passengerNumber,
  handlePassengerDataChange,
  formData,
}) => {
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [showCodeDropdown, setShowCodeDropdown] = useState(false);
  const [countryStates, setCountryStates] = useState([]);
  const [dialCodes, setDialCodes] = useState([]);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/codes")
      .then(res => res.json())
      .then(data => {
        if (!data.error && data.data) {
          setDialCodes(data.data);
        }
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (formData.country) {
      fetch("https://countriesnow.space/api/v0.1/countries/states", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ country: formData.country })
      })
      .then(res => res.json())
      .then(data => {
        if (!data.error && data.data && data.data.states) {
          setCountryStates(data.data.states.map(s => s.name));
        } else {
          setCountryStates([]);
        }
      })
      .catch(() => {
        setCountryStates([]);
      });
    } else {
      setCountryStates([]);
    }
  }, [formData.country]);

  const handleStateFocus = (e) => {
    if (!formData.country) {
      toast.warn("First select your country");
      e.target.blur();
      setShowStateDropdown(false);
    } else {
      setShowStateDropdown(true);
    }
  };

  const handleChange = (e, field) => {
    if (e.target.type === "file") {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const fileData = event.target.result;
          handlePassengerDataChange(passengerNumber, { [field]: fileData });
        };
        reader.readAsDataURL(file);
      }
    } else {
      const { value } = e.target;
      handlePassengerDataChange(passengerNumber, { [field]: value });
    }
  };

  return (
    <div className="my-8 bg-white border border-slate-100 rounded-3xl shadow-xl shadow-blue-900/5 p-6 md:p-10">
      <div>
        <h2 className="mb-8 text-2xl font-extrabold text-slate-800 tracking-tight">
          Traveller Details - Passenger {passengerNumber}
        </h2>
      </div>
      {/* Traveller Details */}
      <div className="mb-5">
        <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`firstName-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              First Name
            </label>
            <input
              type="text"
              placeholder="First Name"
              id={`firstName-${passengerNumber}`}
              value={formData.firstName}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "firstName")}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`lastName-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Last Name
            </label>
            <input
              type="text"
              placeholder="Last Name"
              id={`lastName-${passengerNumber}`}
              value={formData.lastName}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "lastName")}
            />
          </div>
        </div>
        {/* Date of Birth and Passport Number */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
          <div className="w-full md:w-1/2">
            <label htmlFor={`dob-${passengerNumber}`} className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1">
              Date of birth
            </label>
            <input
              type="date"
              id={`dob-${passengerNumber}`}
              value={formData.dob || ""}
              max={new Date().toISOString().split("T")[0]}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "dob")}
            />
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`passportNumber-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Passport Number
            </label>
            <input
              type="number"
              placeholder="Passport Number"
              id={`passportNumber-${passengerNumber}`}
              value={formData.passportNumber}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "passportNumber")}
            />
          </div>
        </div>
        {/* Country and State */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
          <div className="w-full md:w-1/2 relative">
            <label
              htmlFor={`country-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Country
            </label>
            <input
              type="text"
              placeholder="Search Country"
              id={`country-${passengerNumber}`}
              value={formData.country || ""}
              onFocus={() => setShowCountryDropdown(true)}
              onBlur={() => setTimeout(() => setShowCountryDropdown(false), 200)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => {
                 handleChange(e, "country");
                 setShowCountryDropdown(true);
              }}
            />
            {showCountryDropdown && (
              (() => {
                const filteredCountries = countries.filter((c) => c.toLowerCase().includes((formData.country || "").toLowerCase()));
                if (filteredCountries.length === 0) return null;
                
                return (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-2xl max-h-56 overflow-y-auto custom-scrollbar">
                    {filteredCountries.map((countryName, idx) => (
                      <div
                        key={idx}
                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-slate-700 font-medium transition-colors border-b border-slate-50 last:border-none"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handlePassengerDataChange(passengerNumber, { country: countryName, state: "" });
                          setShowCountryDropdown(false);
                        }}
                      >
                        {countryName}
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
          <div className="w-full md:w-1/2 relative">
            <label
              htmlFor={`stat-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              State
            </label>
            <input
              type="text"
              placeholder="State"
              id={`stat-${passengerNumber}`}
              value={formData.state || ""}
              onFocus={handleStateFocus}
              onBlur={() => setTimeout(() => setShowStateDropdown(false), 200)}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => {
                 handleChange(e, "state");
                 if (formData.country) setShowStateDropdown(true);
              }}
            />
            {showStateDropdown && formData.country && countryStates.length > 0 && (
              (() => {
                const filteredStates = countryStates.filter((s) => s.toLowerCase().includes((formData.state || "").toLowerCase()));
                if (filteredStates.length === 0) return null;
                
                return (
                  <div className="absolute z-50 w-full mt-2 bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-2xl max-h-56 overflow-y-auto">
                    {filteredStates.map((stateName, idx) => (
                      <div
                        key={idx}
                        className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-slate-700 font-medium transition-colors border-b border-slate-50 last:border-none"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          handlePassengerDataChange(passengerNumber, { state: stateName });
                          setShowStateDropdown(false);
                        }}
                      >
                        {stateName}
                      </div>
                    ))}
                  </div>
                );
              })()
            )}
          </div>
        </div>
        {/* Phone Number and Email */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`phNumber-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Phone Number
            </label>
            <div className="flex gap-3">
              <div className="relative w-[110px]">
                <input
                  type="text"
                  id={`countryCode-${passengerNumber}`}
                  value={formData.countryCode || ""}
                  placeholder="Code"
                  autoComplete="off"
                  className="bg-slate-50 border border-slate-200 rounded-xl px-2 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-500 cursor-pointer text-sm"
                  onClick={() => setShowCodeDropdown(true)}
                  onChange={(e) => {
                    handleChange(e, "countryCode");
                    setShowCodeDropdown(true);
                  }}
                  onBlur={() => setTimeout(() => setShowCodeDropdown(false), 200)}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
                {showCodeDropdown && (
                  <div className="absolute z-50 w-[180px] mt-2 bg-white border border-slate-100 shadow-2xl shadow-blue-900/10 rounded-2xl max-h-56 overflow-y-auto">
                    {dialCodes
                      .filter((c) =>
                        (c.dial_code + " " + c.code)
                          .toLowerCase()
                          .includes((formData.countryCode || "").toLowerCase())
                      )
                      .map((item, idx) => (
                        <div
                          key={idx}
                          className="px-5 py-3 hover:bg-blue-50 cursor-pointer text-slate-700 font-medium transition-colors border-b border-slate-50 last:border-none text-sm"
                          onMouseDown={(e) => {
                            e.preventDefault();
                            handlePassengerDataChange(passengerNumber, { countryCode: item.dial_code });
                            setShowCodeDropdown(false);
                          }}
                        >
                          {item.dial_code} ({item.code})
                        </div>
                      ))}
                  </div>
                )}
              </div>
              <input
                type="number"
                id={`phNumber-${passengerNumber}`}
                value={formData.phoneNumber || ""}
                placeholder="Phone Number"
                className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
                onChange={(e) => handleChange(e, "phoneNumber")}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`email-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              id={`email-${passengerNumber}`}
              value={formData.email}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "email")}
            />
          </div>
        </div>
        {/* PASSPORT SIZE PHOTO */}
        <div className="flex flex-col gap-5 md:flex-row md:gap-5 w-full py-3">
          <div className="w-full md:w-1/2">
            <label
              htmlFor={`passportSizePhoto-${passengerNumber}`}
              className="block text-[11px] font-extrabold text-slate-500 uppercase tracking-widest mb-1.5 ml-1"
            >
              Passport Size Photo
            </label>
            <input
              type="file"
              id={`passportSizePhoto-${passengerNumber}`}
              className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 w-full outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium placeholder-slate-400"
              onChange={(e) => handleChange(e, "passportSizePhoto")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PassengerDataForm;
