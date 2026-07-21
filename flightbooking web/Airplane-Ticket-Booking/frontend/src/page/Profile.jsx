import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { BACKENDURL } from "../Config/Config";
import { useNavigate, Link } from "react-router-dom";
import { TbEdit, TbLogout, TbTicket, TbUser } from "react-icons/tb";
import { FaSpinner } from "react-icons/fa";
import uploadImageToCloudinary from "../utils/uploadImageToCloudinary";
import { authContext } from "../context/authContext";
import { toast } from "react-toastify";

const Profile = () => {
  const { dispatch } = useContext(authContext);
  const [userData, setUserData] = useState({});
  const [tickets, setTickets] = useState([]);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  const fetchUserData = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios
      .get(BACKENDURL + "/api/v1/auth/getUser", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data.user);
        setTickets(response.data.tickets);
        setUserName(response.data.user.name);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  };

  useEffect(() => {
    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/login");
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageData = await uploadImageToCloudinary(file);
        setProfilePic(imageData.secure_url);
        toast.success("Image uploaded! Click 'Save Changes' to update your profile.");
      } catch (error) {
        console.error("Error uploading image:", error);
        toast.error("Failed to upload image.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleProfileUpdate = async () => {
    try {
      setIsSaving(true);
      const token = localStorage.getItem("token");
      if (!token) return navigate("/login");

      let updatedData = { name: userName };
      if (profilePic) {
        updatedData.profilePic = profilePic;
      }

      const response = await axios.put(
        BACKENDURL + "/api/v1/auth/updateUser",
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Profile updated successfully!");
      setUserData(response.data.user);

      // Update local storage so navbar and other components see the change immediately
      localStorage.setItem("user", JSON.stringify(response.data.user));
      dispatch({ type: "LOGIN_SUCCESS", payload: { user: response.data.user, token } });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile.");
    } finally {
      setIsSaving(false);
    }
  };

  // Helper to get first letter
  const getInitial = (name) => {
    return name ? name.charAt(0).toUpperCase() : "?";
  };

  const displayPic = profilePic || userData.profilePic;
  const isDefaultPic = !displayPic || displayPic.includes("avatar-3814049_1280.png") || displayPic.includes("default");

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      {/* Premium Header Background */}
      <div className="h-64 bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 relative">
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          {/* Profile Section */}
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-8 items-center md:items-start border-b border-slate-100">

            {/* Avatar Group */}
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-lg bg-slate-100 flex items-center justify-center relative">
                {isUploading ? (
                  <FaSpinner className="animate-spin text-4xl text-blue-500" />
                ) : isDefaultPic ? (
                  <span className="text-5xl md:text-7xl font-bold text-slate-300">
                    {getInitial(userName || userData.name)}
                  </span>
                ) : (
                  <img src={displayPic} alt="Profile" className="w-full h-full object-cover" />
                )}

                {/* Hover Overlay */}
                <label className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <TbEdit className="text-white text-3xl mb-1" />
                  <span className="text-white text-xs font-medium">Change Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>

            {/* User Info Form */}
            <div className="flex-1 w-full text-center md:text-left pt-2">
              <h1 className="text-3xl font-bold text-slate-800 mb-6 capitalize">{userName || userData.name || "Profile Settings"}</h1>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl">
                <div>
                  <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 text-left">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <TbUser className="text-slate-400 text-lg" />
                    </div>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none text-slate-700 font-medium"
                      placeholder="Enter your name"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2 text-left">
                    Email Address
                  </label>
                  <div className="w-full px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl text-slate-500 font-medium cursor-not-allowed text-left">
                    {userData.email}
                  </div>
                  <p className="text-xs text-slate-400 mt-1.5 ml-1 text-left">Email cannot be changed</p>
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button
                  onClick={handleProfileUpdate}
                  disabled={isSaving || isUploading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md shadow-blue-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSaving ? <FaSpinner className="animate-spin" /> : <TbEdit className="text-lg" />}
                  Save Changes
                </button>
                <button
                  onClick={handleLogout}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-8 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <TbLogout className="text-lg" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Tickets Section */}
          <div className="p-8 md:p-12 bg-slate-50">
            <div 
              className="flex items-center justify-center md:justify-start gap-3 mb-8 cursor-pointer hover:opacity-75 transition-opacity inline-flex px-4 py-2 bg-blue-100/50 rounded-xl"
              onClick={() => {
                fetchUserData();
                toast.success("Bookings refreshed!");
              }}
              title="Click to refresh bookings"
            >
              <TbTicket className="text-3xl text-blue-600" />
              <h2 className="text-2xl font-bold text-slate-800">My Bookings</h2>
              <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full ml-2">Refresh</span>
            </div>

            {tickets.length > 0 ? (
              <div className="max-h-[500px] overflow-y-auto pr-4 space-y-4">
                {[...tickets].reverse().map((ticket, idx) => (
                  <Link
                    key={ticket._id}
                    to={`/ticket/${ticket.uid}`}
                    className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md hover:border-blue-400 transition-all group flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 transform origin-bottom scale-y-0 group-hover:scale-y-100 transition-transform duration-300"></div>
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex justify-center items-center shrink-0 group-hover:bg-blue-100 transition-colors">
                        <TbTicket className="text-2xl text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-slate-800 font-bold text-lg">Booking #{tickets.length - idx}</span>
                          <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Confirmed</span>
                        </div>
                        <div className="text-sm text-slate-500 font-medium flex items-center gap-2">
                          <span>Ref: <span className="font-mono text-slate-700">{ticket.uid}</span></span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 w-full sm:w-auto justify-end mt-2 sm:mt-0">
                      <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors bg-blue-50 px-4 py-2 rounded-lg">View E-Ticket</span>
                      <span className="text-slate-300 group-hover:translate-x-1 group-hover:text-blue-500 transition-all">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TbTicket className="text-2xl text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-700 mb-2">No bookings yet</h3>
                <p className="text-slate-500 max-w-sm mx-auto mb-6">
                  When you book flights or hotels, your tickets will appear here for easy access.
                </p>
                <Link to="/search" className="text-blue-600 font-semibold hover:underline">
                  Start planning your trip →
                </Link>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
