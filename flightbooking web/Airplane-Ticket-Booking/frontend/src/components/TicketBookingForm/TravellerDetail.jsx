import React, { useState, useEffect } from "react";
import { countries } from "../../assets/data/Countries";
import PassengerDataForm from "./PassengerDataForm";
import { toast } from "react-toastify";

const TravellerDetail = ({
  setCurrentActiveForm,
  numberOfPassengers,
  formData,
  setFormData,
}) => {
  const handlePassengerDataChange = (passengerNumber, data) => {
    setFormData((prevData) => ({
      ...prevData,
      [`passenger${passengerNumber}`]: {
        ...prevData[`passenger${passengerNumber}`],
        ...data,
      },
    }));
  };

  const requiredFields = {
    firstName: "First Name",
    lastName: "Last Name",
    country: "Country",
    state: "State",
    phoneNumber: "Phone Number",
    email: "Email",
    dob: "Date of Birth",
    passportNumber: "Passport Number",
    passportSizePhoto: "Passport Size Photo",
  };

  const validatePassengerData = (formData) => {
    let isValid = true;

    for (let i = 1; i <= numberOfPassengers; i++) {
      const passengerKey = `passenger${i}`;
      const passengerData = formData[passengerKey];
      if (!passengerData) {
        toast.error(`Passenger ${i} data is missing`);
        isValid = false;
        continue;
      }
      for (const [field, displayName] of Object.entries(requiredFields)) {
        const val = passengerData[field] || "";
        if (typeof val === "string" && val.trim() === "") {
          toast.error(`Please enter passenger ${i} ${displayName}`);
          isValid = false;
          break;
        }

        // Specific Regex Validations
        if (field === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(val)) {
            toast.error(`Please enter a valid email for passenger ${i}`);
            isValid = false;
            break;
          }
        }
        
        if (field === "phoneNumber") {
          const phoneRegex = /^[0-9]{7,15}$/;
          if (!phoneRegex.test(val)) {
            toast.error(`Please enter a valid 7 to 15 digit phone number for passenger ${i}`);
            isValid = false;
            break;
          }
        }

        if (field === "firstName" || field === "lastName") {
          const nameRegex = /^[A-Za-z\s]{2,50}$/;
          if (!nameRegex.test(val)) {
            toast.error(`Please enter a valid ${displayName} (only letters, min 2 characters) for passenger ${i}`);
            isValid = false;
            break;
          }
        }
        
        if (field === "passportNumber") {
          const passportRegex = /^[A-Z0-9]{5,20}$/i;
          if (!passportRegex.test(val)) {
            toast.error(`Please enter a valid passport number for passenger ${i}`);
            isValid = false;
            break;
          }
        }
      }
    }

    if (Object.keys(formData).length === 0) {
      toast.error("Fields cannot be kept empty, please fill all fields");
      isValid = false;
    }

    if (isValid) {
      setCurrentActiveForm(2);
    }
  };

  const travelerForms = [];
  for (let i = 1; i <= numberOfPassengers; i++) {
    travelerForms.push(
      <div key={i}>
        <PassengerDataForm
          passengerNumber={i}
          handlePassengerDataChange={handlePassengerDataChange}
          formData={formData[`passenger${i}`] || {}}
        />
      </div>
    );
  }

  return (
    <div>
      {travelerForms}
      <div className="flex justify-between items-center gap-4 mt-8">
        <button
          className="border-2 border-slate-200 text-slate-500 font-semibold px-8 py-3 rounded-xl hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300 shadow-sm"
          onClick={() => setCurrentActiveForm(0)}
        >
          Previous
        </button>
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold px-10 py-3 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
          onClick={
            (() => validatePassengerData(formData))
          }
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default TravellerDetail;
