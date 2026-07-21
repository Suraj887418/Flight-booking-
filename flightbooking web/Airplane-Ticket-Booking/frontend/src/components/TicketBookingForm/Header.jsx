import React from "react";

const Header = ({ currentFlight }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${date.getDate()} ${
      monthNames[date.getMonth()]
    } ${date.getFullYear()}`;

    return formattedDate;
  };

  const calcDuration = (departTime, arriveTime) => {
    // Parse departure and arrival times
    const [departHour, departMinute] = departTime.split(":").map(Number);
    const [arriveHour, arriveMinute] = arriveTime.split(":").map(Number);

    // Calculate total minutes for departure and arrival
    const departTotalMinutes = departHour * 60 + departMinute;
    let arriveTotalMinutes = arriveHour * 60 + arriveMinute;

    // Check if arrival time is earlier than departure time (crosses midnight)
    if (arriveTotalMinutes < departTotalMinutes) {
      // Add 24 hours worth of minutes to arrival time
      arriveTotalMinutes += 24 * 60;
    }

    // Calculate the duration
    let durationMinutes = arriveTotalMinutes - departTotalMinutes;

    // Calculate hours and minutes
    const durationHour = Math.floor(durationMinutes / 60);
    const durationMinute = durationMinutes % 60;

    // Format the duration
    const formattedDuration = `${durationHour}h ${durationMinute}m`;

    return formattedDuration;
  };
  return (
    <div className="overflow-hidden bg-white rounded-3xl border border-slate-100 shadow-xl shadow-blue-900/5">
      {/* Top Bar */}
      <div className="w-full bg-gradient-to-r from-slate-50 to-white border-b border-slate-100 px-6 py-4 md:px-8 md:py-5 flex justify-between items-center">
        <div className="flex justify-start items-center gap-4">
          <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center p-2 border border-slate-100">
            <img src={currentFlight.airline.airlineLogo} alt="..." className="w-full h-full object-contain" />
          </div>
          <div>
            <p className="text-lg md:text-xl font-bold text-slate-800 tracking-tight">
              {currentFlight.airline.airlineName}
            </p>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">Airlines</p>
          </div>
        </div>
        <div className="bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
          Economy class
        </div>
      </div>
      
      {/* Bottom Area (Timings) */}
      <div className="px-5 py-4 md:px-8 md:py-4">
        <div className="flex max-w-4xl w-full mx-auto justify-between items-center relative z-10">
          
          <div className="text-center md:text-left">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Depart</p>
            <p className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {currentFlight.departTime}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {formatDate(currentFlight.departDate)}
            </p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4 md:px-12">
            <div className="w-full flex items-center justify-center gap-2 md:gap-4 relative">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-200 ring-4 ring-blue-50"></div>
              <div className="flex-1 h-0.5 bg-slate-200"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center -mt-5">
                 <svg className="w-5 h-5 text-blue-500 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </div>
              <div className="flex-1 h-0.5 bg-slate-200"></div>
              <div className="w-2.5 h-2.5 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
            </div>
            <div className="mt-3 text-[10px] font-bold px-2.5 py-1 text-slate-500 bg-slate-100 rounded-full tracking-wide">
              {calcDuration(currentFlight.departTime, currentFlight.arriveTime)}
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Arrive</p>
            <p className="text-2xl md:text-3xl font-extrabold text-slate-800 tracking-tight">
              {currentFlight.arriveTime}
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">
              {formatDate(currentFlight.arriveDate)}
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Header;
