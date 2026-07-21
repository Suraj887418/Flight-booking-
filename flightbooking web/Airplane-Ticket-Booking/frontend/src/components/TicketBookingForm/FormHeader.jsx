import React from "react";
import { HiCheck } from "react-icons/hi";

const steps = [
  { id: 0, label: "Seat Booking" },
  { id: 1, label: "Traveller Details" },
  { id: 2, label: "Review" },
  { id: 3, label: "Payment" },
];

const FormHeader = ({ currentActiveForm }) => {
  return (
    <div className="my-4 bg-white border border-slate-100 shadow-sm rounded-full py-4 px-6 md:px-12 flex justify-center mx-auto max-w-5xl">
      <div className="w-full max-w-4xl">
        <ul className="flex justify-between items-center relative">
          
          {/* Background Line for Progress */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-slate-100 rounded-full z-0 hidden md:block"></div>
          
          {/* Active Progress Line */}
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 rounded-full z-0 transition-all duration-500 hidden md:block"
            style={{ width: `${(currentActiveForm / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((step, index) => {
            const isCompleted = currentActiveForm > step.id;
            const isActive = currentActiveForm === step.id;
            const isUpcoming = currentActiveForm < step.id;

            return (
              <li key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                <div 
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex justify-center items-center font-bold text-xs md:text-sm border-2 transition-all duration-300
                    ${isCompleted ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/30" : ""}
                    ${isActive ? "bg-white border-blue-600 text-blue-600 shadow-lg shadow-blue-500/40 scale-110" : ""}
                    ${isUpcoming ? "bg-white border-slate-200 text-slate-400" : ""}
                  `}
                >
                  {isCompleted ? <HiCheck size={20} /> : step.id + 1}
                </div>
                <span 
                  className={`text-xs md:text-sm font-bold tracking-wide hidden sm:block transition-colors duration-300
                    ${isActive ? "text-blue-700" : ""}
                    ${isCompleted ? "text-slate-700" : ""}
                    ${isUpcoming ? "text-slate-400" : ""}
                  `}
                >
                  {step.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default FormHeader;
