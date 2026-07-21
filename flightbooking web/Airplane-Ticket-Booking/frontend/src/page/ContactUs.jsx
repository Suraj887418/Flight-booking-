import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill all required fields!");
      return;
    }
    toast.success("Thank you! Your message has been sent successfully.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-[85vh] relative flex justify-center items-center py-16 px-4 sm:px-6 lg:px-8 bg-slate-50 overflow-hidden">
      {/* Trending Background Blobs for Glassmorphism */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-60"></div>
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-pink-400 rounded-full mix-blend-multiply filter blur-[128px] opacity-50"></div>

      <div className="max-w-6xl w-full bg-white/60 backdrop-blur-2xl border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-[2rem] overflow-hidden flex flex-col md:flex-row relative z-10">
        
        {/* Left Side: Contact Information */}
        <div className="md:w-5/12 bg-gradient-to-br from-indigo-950 via-purple-900 to-indigo-900 text-white p-10 lg:p-14 flex flex-col justify-between relative overflow-hidden">
          <div className="z-10 relative">
            <div className="inline-block px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-6">
              <span className="text-sm font-semibold tracking-wider uppercase text-purple-200">Contact Us</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight text-white leading-tight">Let's start a <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300">conversation.</span></h2>
            <p className="text-lg mb-12 text-indigo-100/80 font-light leading-relaxed">
              Have a question or just want to say hi? We'd love to hear from you. Drop us a line and we'll get back to you as soon as possible.
            </p>

            <div className="space-y-8 mt-12">
              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/5 shadow-inner">
                  <FaEnvelope className="text-2xl text-purple-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-purple-300 tracking-widest uppercase mb-1 opacity-80">Email Us</h4>
                  <p className="text-lg font-medium text-white">thakursuraj73072@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center space-x-6 group">
                <div className="bg-white/10 p-4 rounded-2xl group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-white/5 shadow-inner">
                  <FaMapMarkerAlt className="text-2xl text-purple-300" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-purple-300 tracking-widest uppercase mb-1 opacity-80">Headquarters</h4>
                  <p className="text-lg font-medium text-white leading-relaxed">123 Aviation Way, Suite 400<br/>New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Decorative shapes inside the left panel */}
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-br from-purple-500 to-pink-500 opacity-30 rounded-full blur-3xl"></div>
          <div className="absolute top-20 -left-20 w-56 h-56 bg-gradient-to-br from-blue-500 to-indigo-500 opacity-30 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side: Contact Form */}
        <div className="md:w-7/12 p-10 lg:p-14 bg-white/40">
          <h3 className="text-3xl font-extrabold text-gray-900 mb-2">Send a Message</h3>
          <p className="text-gray-500 mb-10 font-medium">Fill out the form below and we will be in touch shortly.</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative group">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/70 focus:bg-white shadow-sm hover:shadow-md outline-none peer text-gray-800 font-medium"
                  placeholder=" "
                  required
                />
                <label className="absolute left-5 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:font-bold peer-valid:-translate-y-7 peer-valid:text-xs peer-valid:text-gray-500 peer-valid:font-bold bg-white/80 px-1 rounded backdrop-blur-sm">Full Name *</label>
              </div>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-5 py-4 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/70 focus:bg-white shadow-sm hover:shadow-md outline-none peer text-gray-800 font-medium"
                  placeholder=" "
                  required
                />
                <label className="absolute left-5 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:font-bold peer-valid:-translate-y-7 peer-valid:text-xs peer-valid:text-gray-500 peer-valid:font-bold bg-white/80 px-1 rounded backdrop-blur-sm">Email Address *</label>
              </div>
            </div>

            <div className="relative group">
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-5 py-4 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/70 focus:bg-white shadow-sm hover:shadow-md outline-none peer text-gray-800 font-medium"
                placeholder=" "
              />
              <label className="absolute left-5 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:font-bold peer-valid:-translate-y-7 peer-valid:text-xs peer-valid:text-gray-500 peer-valid:font-bold bg-white/80 px-1 rounded backdrop-blur-sm">Subject</label>
            </div>

            <div className="relative group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="4"
                className="w-full px-5 py-4 rounded-xl border border-gray-200/80 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/70 focus:bg-white shadow-sm hover:shadow-md outline-none resize-none peer text-gray-800 font-medium"
                placeholder=" "
                required
              ></textarea>
              <label className="absolute left-5 top-4 text-gray-400 pointer-events-none transition-all peer-focus:-translate-y-7 peer-focus:text-xs peer-focus:text-purple-600 peer-focus:font-bold peer-valid:-translate-y-7 peer-valid:text-xs peer-valid:text-gray-500 peer-valid:font-bold bg-white/80 px-1 rounded backdrop-blur-sm">Your Message *</label>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-extrabold text-lg py-4 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all transform hover:-translate-y-1 shadow-[0_10px_20px_rgba(124,58,237,0.3)] flex justify-center items-center gap-3 mt-4"
            >
              <span>Send Message</span>
              <FaPaperPlane className="text-sm" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
