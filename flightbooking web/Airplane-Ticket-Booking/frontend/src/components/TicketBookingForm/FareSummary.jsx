import React from "react";
import { HiOutlineReceiptTax } from "react-icons/hi";

const FareSummary = ({ price, numberOfPassengers, selectedSeats = {} }) => {
  // Calculate dynamic seat prices
  let baseTotal = 0;
  const seatBreakdowns = [];

  Object.entries(selectedSeats).forEach(([row, seats]) => {
    seats.forEach((seatNumber) => {
      let seatMarkup = 0;
      let seatType = "Standard Seat";

      if (row === "A" || row === "D") {
        seatMarkup = 500; // Window seat
        seatType = "Window Seat";
      } else if (row === "B" || row === "C") {
        seatMarkup = 200; // Aisle/Middle seat
        seatType = "Aisle/Middle Seat";
      }

      const seatPrice = price + seatMarkup;
      baseTotal += seatPrice;
      seatBreakdowns.push({ seatName: `${row}${seatNumber}`, seatPrice, seatType });
    });
  });

  // Fallback if no seats selected yet
  if (seatBreakdowns.length === 0) {
    baseTotal = price * numberOfPassengers;
  }

  // Calculate Taxes and Discounts
  const taxesAndFees = Math.round(baseTotal * 0.18); // 18% GST
  const specialDiscount = numberOfPassengers > 0 ? 500 * numberOfPassengers : 0; // Flat discount per passenger
  
  // Final Total
  const finalTotal = baseTotal > 0 ? Math.max(0, baseTotal + taxesAndFees - specialDiscount) : 0;

  return (
    <div className="w-full rounded-3xl border border-slate-100 bg-white shadow-xl shadow-blue-900/5 overflow-hidden flex flex-col">
      <div className="p-6 md:p-8 flex items-center gap-3 border-b border-slate-100">
        <div className="bg-blue-50 text-blue-600 p-2.5 rounded-xl">
          <HiOutlineReceiptTax size={24} />
        </div>
        <p className="text-2xl font-bold text-slate-800 tracking-tight">Fare Summary</p>
      </div>
      
      <div className="p-6 md:p-8 flex-1">
        <div className="flex flex-col gap-4">
          {seatBreakdowns.length > 0 ? (
            seatBreakdowns.map((seat, index) => (
              <div key={index} className="flex justify-between items-center group">
                <div>
                  <p className="text-[15px] font-semibold text-slate-700 transition-colors">
                    Seat {seat.seatName}
                  </p>
                  <p className="text-[12px] font-medium text-slate-400">
                    {seat.seatType}
                  </p>
                </div>
                <p className="text-[16px] font-bold text-slate-800">
                  ₹ {seat.seatPrice}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-between items-center group">
              <p className="text-[15px] font-medium text-slate-500 group-hover:text-slate-800 transition-colors">
                Base Ticket ({numberOfPassengers}x)
              </p>
              <p className="text-[16px] font-semibold text-slate-700">
                ₹ {price * numberOfPassengers}
              </p>
            </div>
          )}
          
          {/* Taxes */}
          <div className="flex justify-between items-center group mt-2 pt-4 border-t border-slate-50">
            <p className="text-[15px] font-medium text-slate-500 group-hover:text-slate-800 transition-colors">Taxes & Fees (18% GST)</p>
            <p className="text-[16px] font-semibold text-slate-700">₹ {taxesAndFees}</p>
          </div>

          {/* Discount */}
          <div className="flex justify-between items-center group">
            <p className="text-[15px] font-medium text-emerald-500">Special Discount</p>
            <p className="text-[16px] font-semibold text-emerald-500">- ₹ {specialDiscount}</p>
          </div>
        </div>
      </div>
      
      {/* Dashed Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden="true">
          <div className="w-full border-t-2 border-dashed border-slate-200"></div>
        </div>
        <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-r-2 border-slate-200"></div>
        <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-slate-50 rounded-full border-l-2 border-slate-200"></div>
      </div>

      <div className="bg-gradient-to-r from-slate-50 to-blue-50 p-6 md:p-8">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-1">Total Amount</p>
            <p className="text-3xl font-extrabold text-blue-700">
              ₹ {finalTotal}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FareSummary;
