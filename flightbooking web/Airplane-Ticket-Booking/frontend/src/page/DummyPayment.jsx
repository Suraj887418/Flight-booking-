import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaCreditCard, FaLock } from "react-icons/fa";

const DummyPayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
  const navigate = useNavigate();

  const handleExpiryChange = (e) => {
    let val = e.target.value.replace(/[^0-9]/g, '');
    if (val.length > 2) {
      val = val.substring(0, 2) + '/' + val.substring(2, 4);
    }
    setExpiry(val);
  };

  const handlePayment = (e) => {
    e.preventDefault();

    if (paymentMethod === "card") {
      if (!name || !cardNumber || !expiry || !cvv) {
        toast.error("Please fill in all the card details.");
        return;
      }

      // Check expiry date
      const [month, year] = expiry.split("/");
      if (!month || !year || month < 1 || month > 12) {
        toast.error("Invalid expiry date format. Use MM/YY");
        return;
      }

      const currentDate = new Date();
      const currentYear = parseInt(currentDate.getFullYear().toString().slice(-2));
      const currentMonth = currentDate.getMonth() + 1;

      const expMonth = parseInt(month);
      const expYear = parseInt(year);

      if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
        toast.error("Your card has expired. Expiry date must be in the future.");
        return;
      }
    } else {
      if (!upiId) {
        toast.error("Please enter your UPI ID.");
        return;
      }
      if (!upiId.includes("@")) {
        toast.error("Invalid UPI ID format. Must contain '@'.");
        return;
      }
    }

    setIsProcessing(true);
    
    // Simulate payment processing time
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Payment Successful! Redirecting...");
      navigate("/checkout-page");
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 px-8 py-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
          <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
          
          <div className="relative z-10 flex justify-center mb-4">
            <div className="bg-white/20 p-3 rounded-full backdrop-blur-md">
              <FaLock className="text-2xl text-white" />
            </div>
          </div>
          <h2 className="text-2xl font-bold tracking-wide relative z-10">Secure Checkout</h2>
          <p className="text-blue-100 mt-2 text-sm font-medium relative z-10">Test Payment Gateway Simulation</p>
        </div>

        {/* Method Tabs */}
        <div className="flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setPaymentMethod("card")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${paymentMethod === "card" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"} transition-all`}
          >
            Credit/Debit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentMethod("upi")}
            className={`flex-1 py-4 text-sm font-bold uppercase tracking-wider ${paymentMethod === "upi" ? "text-blue-600 border-b-2 border-blue-600" : "text-slate-400 hover:text-slate-600"} transition-all`}
          >
            UPI Payment
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handlePayment} className="px-8 py-8">
          <div className="space-y-5">
            {paymentMethod === "card" ? (
              <>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium"
                    placeholder="Name on card"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                    Card Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value.replace(/[^0-9 ]/g, ''))}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-12 pr-4 py-3 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium tracking-widest"
                      placeholder="0000 0000 0000 0000"
                    />
                    <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg" />
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      value={expiry}
                      onChange={handleExpiryChange}
                      maxLength="5"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium text-center"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div className="w-1/2">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                      CVV / CVC
                    </label>
                    <input
                      type="password"
                      required
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                      maxLength="3"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium text-center tracking-widest"
                      placeholder="***"
                    />
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  UPI ID (VPA)
                </label>
                <input
                  type="text"
                  required
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all text-slate-700 font-medium"
                  placeholder="example@okaxis"
                />
                <p className="text-xs text-slate-500 mt-3 font-medium bg-blue-50 p-3 rounded-lg border border-blue-100">
                  Open your UPI app on your phone and approve the payment request after clicking "Pay Now".
                </p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 rounded-xl font-bold text-lg text-white shadow-lg transition-all duration-300 flex justify-center items-center gap-3 ${
                isProcessing
                  ? "bg-blue-400 shadow-none cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 hover:shadow-blue-500/40 hover:-translate-y-1"
              }`}
            >
              {isProcessing ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing Payment...
                </>
              ) : (
                "Pay Now"
              )}
            </button>
          </div>
          <p className="text-center text-xs font-medium text-slate-400 mt-6 flex items-center justify-center gap-1.5">
            <FaLock className="text-slate-300" /> Payments are secure and encrypted
          </p>
        </form>
      </div>
    </div>
  );
};

export default DummyPayment;
