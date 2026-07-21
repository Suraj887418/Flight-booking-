import React from "react";

const SearchedFlightCards = ({ flight }) => {
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
    <div className="relative w-full p-3 border border-gray-200 bg-white rounded-xl flex justify-between items-center flex-col gap-3 max-w-[370px] lg:flex-row lg:max-w-full lg:gap-5 cursor-pointer hover:shadow-lg hover:border-blue-200 duration-200 transition-all">
      <div className="h-[150px] w-full bg-slate-50 border border-slate-100 p-3 flex justify-center items-center rounded-lg lg:h-[90px] lg:w-[120px]">
        <img 
          src={flight?.airline?.airlineLogo || flight?.airlineLogo || "https://cdn-icons-png.flaticon.com/512/916/916664.png"} 
          alt={flight?.airlineName || "Airline Logo"} 
          className="w-full h-full object-contain mix-blend-multiply opacity-90"
          onError={(e) => {
            e.target.onerror = null; // prevents looping
            e.target.src = "https://cdn-icons-png.flaticon.com/512/916/916664.png"; // Premium generic plane icon fallback
          }}
        />
      </div>
      <div className="flex max-w-[700px] w-full m-auto justify-between items-center relative z-10 px-2 lg:px-4">
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Depart</p>
          <p className="text-2xl font-bold text-slate-800 mt-0.5">{flight.departTime}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {formatDate(flight.departDate)}
          </p>
        </div>
        <div className="flex items-center my-4 lg:my-0">
          <div className="w-[10px] h-[10px] rounded-full border-2 border-blue-300 bg-white"></div>
          <div className="w-[20px] h-[2px] bg-blue-100 lg:w-[40px]"></div>
          <div className="text-xs px-3 py-1 text-blue-700 bg-blue-50/80 rounded-full font-semibold tracking-wide text-center border border-blue-100 shadow-sm">
            {calcDuration(flight.departTime, flight.arriveTime)}
          </div>
          <div className="w-[20px] h-[2px] bg-blue-100 lg:w-[40px]"></div>
          <div className="w-[10px] h-[10px] rounded-full bg-blue-400"></div>
        </div>
        <div className="text-center">
          <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Arrive</p>
          <p className="text-2xl font-bold text-slate-800 mt-0.5">{flight.arriveTime}</p>
          <p className="text-xs text-slate-500 font-medium mt-0.5">
            {formatDate(flight.arriveDate)}
          </p>
        </div>
      </div>
      <div className="w-full h-fit lg:w-[160px] lg:h-[90px] flex justify-center items-center border-t lg:border-t-0 lg:border-l border-slate-100 lg:pl-5 mt-3 lg:mt-0 pt-3 lg:pt-0">
        <div className="flex flex-row flex-wrap justify-between lg:justify-center items-center w-full">
          <div className="text-left lg:text-center w-full">
            <p className="text-[11px] text-slate-500 font-medium mb-0.5">Price per adult</p>
            <p className="text-2xl font-extrabold text-blue-600">
              ₹ {flight.price.toLocaleString('en-IN')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchedFlightCards;
