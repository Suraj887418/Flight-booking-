import React, { useEffect, useRef, useState } from "react";
import AirplaneHead from "../../assets/images/airplaneHead.png";

import { toast } from "react-toastify";

const SeatReservation = ({
  setCurrentActiveForm,
  numberOfPassengers,
  setNumberOfPassengers,
  selectedSeats,
  setSelectedSeats,
  reservedSeats,
}) => {
  const seats = {
    A: [8, 7, 6, 5, 4, 3, 2, 1],
    B: [8, 7, 6, 5, 4, 3, 2, 1],
    C: [8, 7, 6, 5, 4, 3, 2, 1],
    D: [8, 7, 6, 5, 4, 3, 2, 1],
  };

  const [bookedSeats, setBookedSeats] = useState(reservedSeats);

  const handleNextClick = () => {
    if (numberOfPassengers === 0) {
      toast.warn("Please select atleast one seat to proceed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
      });
    } else {
      setCurrentActiveForm(1);
    }
  };

  const handleSeatClick = (row, seat) => {
    if (!bookedSeats.includes(row + seat)) {
      if (selectedSeats[row] && selectedSeats[row].includes(seat)) {
        setSelectedSeats({
          ...selectedSeats,
          [row]: selectedSeats[row].filter((s) => s !== seat),
        });
      } else {
        setSelectedSeats({
          ...selectedSeats,
          [row]: [...(selectedSeats[row] || []), seat],
        });
      }
    }
  };

  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const imageRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setContainerSize({ width: clientWidth, height: clientHeight });
      }
    };

    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);

    return () => {
      window.removeEventListener("resize", updateContainerSize);
    };
  }, []);

  useEffect(() => {
    if (imageRef.current) {
      const { width, height } = containerSize;
      if (width && height) {
        if (width >= 768) {
          imageRef.current.style.width = `${width}px`;
          imageRef.current.style.height = "auto";
        } else {
          imageRef.current.style.width = "auto";
          imageRef.current.style.height = `${height}px`;
        }
      }
    }
  }, [containerSize]);

  useEffect(() => {
    // Calculate total number of selected seats and update numberOfPassengers prop
    let totalSelectedSeats = 0;
    for (const row in selectedSeats) {
      totalSelectedSeats += selectedSeats[row].length;
    }
    setNumberOfPassengers(totalSelectedSeats);
  }, [selectedSeats, setNumberOfPassengers]);

  const renderSeats = (row) => {
    return seats[row].map((seat) => (
      <div
        key={seat}
        className={`seatContainer ${
          selectedSeats[row] && selectedSeats[row].includes(seat)
            ? "selectedSeats"
            : bookedSeats.includes(row + seat)
            ? "bookedSeats"
            : "seatsHover"
        }`}
        onClick={() => handleSeatClick(row, seat)}
      >
        <p className="text-[15px]">
          {row}
          {seat}
        </p>
      </div>
    ));
  };

  const numPassengersText =
    Object.values(selectedSeats).reduce(
      (total, seats) => total + seats.length,
      0
    ) + " Passenger(s)";

  return (
    <div className="my-8 bg-white border border-slate-100 shadow-xl shadow-blue-900/5 rounded-3xl p-6 md:p-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Seat Booking</h2>
        <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-semibold flex items-center gap-2 shadow-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-500"></span>
          </span>
          {numPassengersText}
        </div>
      </div>
      
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-center overflow-hidden">
        <div
          ref={containerRef}
          className="flex flex-row md:flex-col gap-3 w-fit h-fit p-6 bg-slate-50 border border-slate-100 rounded-2xl md:rounded-l-3xl md:rounded-r-none relative z-10"
        >
          {Object.keys(seats).map((row) => (
            <div key={row} className="flex flex-col md:flex-row gap-2">
              {renderSeats(row)}
            </div>
          ))}
        </div>

        <div className="w-full hidden md:block max-w-[200px] relative -ml-4 z-0">
          <img
            ref={imageRef}
            src={AirplaneHead}
            alt=""
            className="w-full object-contain"
          />
        </div>
      </div>

      <div className="mt-10 flex justify-end">
        <button
          className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-10 rounded-xl shadow-md hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-300"
          onClick={handleNextClick}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default SeatReservation;
