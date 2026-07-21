import React from "react";
import { FaPlane, FaHotel, FaTicketAlt, FaQuestionCircle } from "react-icons/fa";

const HelpCenter = () => {
  const faqs = [
    {
      question: "How do I book a flight?",
      answer: "You can book a flight by navigating to the Flights section, selecting your origin, destination, and dates, and then clicking 'Search'. Once you find a suitable flight, click 'Book' and follow the checkout process.",
      icon: <FaPlane className="text-blue-500 text-2xl" />
    },
    {
      question: "How do I book a hotel?",
      answer: "Navigate to the Hotels section, enter your destination city, and click search. You can browse through various hotels and click 'Book Now' which will safely redirect you to our booking partner.",
      icon: <FaHotel className="text-blue-500 text-2xl" />
    },
    {
      question: "Where can I find my tickets?",
      answer: "All your booked flights will appear in your Profile under 'My Bookings'. You can view, download, or print your e-tickets directly from there.",
      icon: <FaTicketAlt className="text-blue-500 text-2xl" />
    },
    {
      question: "How do I contact support?",
      answer: "You can contact our support team by visiting the 'Contact Us' page. We are available via email at thakursuraj73072@gmail.com.",
      icon: <FaQuestionCircle className="text-blue-500 text-2xl" />
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">How can we help you?</h1>
          <p className="text-xl text-slate-600">Browse our FAQs or get in touch with our support team.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow border border-slate-200">
              <div className="flex items-start gap-4">
                <div className="bg-blue-50 p-4 rounded-full shrink-0">
                  {faq.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{faq.question}</h3>
                  <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-700 to-indigo-700 rounded-3xl p-10 text-center text-white shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our support team is always ready to assist you with any questions or concerns you might have regarding your bookings.
          </p>
          <a href="/contact" className="inline-block bg-white text-blue-700 font-bold px-8 py-3 rounded-full hover:bg-slate-100 transition-colors shadow-lg">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
