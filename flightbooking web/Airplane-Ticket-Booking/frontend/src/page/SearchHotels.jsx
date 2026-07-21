import React, { useState, useEffect, useRef } from "react";
import { FaSearch, FaStar, FaMapMarkerAlt } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { BACKENDURL } from "../Config/Config";

const MOCK_CITIES = [
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Goa, India",
  "Lucknow, India",
  "Kolkata, India",
  "Chennai, India",
  "Maldives",
  "New York, USA",
  "Swiss Alps",
  "Dubai, UAE",
  "London, UK",
  "Paris, France",
  "Tokyo, Japan"
];

const MOCK_HOTELS = [
  {
    id: 1,
    name: "Grand Horizon Resort",
    location: "Maldives",
    price: 350,
    rating: 4.9,
    reviews: 124,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Ocean View", "Private Pool", "Spa"],
  },
  {
    id: 2,
    name: "The Urban Suite",
    location: "New York, USA",
    price: 220,
    rating: 4.7,
    reviews: 312,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["City Center", "Gym", "Rooftop Bar"],
  },
  {
    id: 3,
    name: "Alpine Retreat",
    location: "Swiss Alps",
    price: 450,
    rating: 4.8,
    reviews: 89,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Skiing", "Fireplace", "Hot Tub"],
  },
  {
    id: 4,
    name: "Oasis Desert Camp",
    location: "Dubai, UAE",
    price: 180,
    rating: 4.6,
    reviews: 420,
    image: "https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Desert Safari", "BBQ", "Stargazing"],
  },
  {
    id: 5,
    name: "Taj Mahal Palace",
    location: "Mumbai, India",
    price: 300,
    rating: 4.9,
    reviews: 850,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Sea View", "Luxury", "Heritage"],
  },
  {
    id: 6,
    name: "Leela Palace",
    location: "Delhi, India",
    price: 250,
    rating: 4.8,
    reviews: 540,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["City Center", "Spa", "Fine Dining"],
  },
  {
    id: 7,
    name: "Goa Beach Resort",
    location: "Goa, India",
    price: 150,
    rating: 4.5,
    reviews: 320,
    image: "https://images.pexels.com/photos/338504/pexels-photo-338504.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Beachfront", "Pool", "Bar"],
  },
  {
    id: 8,
    name: "ITC Gardenia",
    location: "Bangalore, India",
    price: 280,
    rating: 4.7,
    reviews: 610,
    image: "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Eco Friendly", "Luxury", "City Center"],
  },
  {
    id: 9,
    name: "Taj Mahal, Lucknow",
    location: "Lucknow, India",
    price: 190,
    rating: 4.8,
    reviews: 430,
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=800",
    features: ["Heritage", "Pool", "Fine Dining"],
  }
];

const SearchHotels = () => {
  const [destination, setDestination] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isSearching, setIsSearching] = useState(false);
  const [displayedHotels, setDisplayedHotels] = useState([]);
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  
  const today = new Date().toISOString().split("T")[0];
  const dropdownRef = useRef(null);

  // Handle outside click to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    
    if (value.length > 0) {
      const filtered = MOCK_CITIES.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (city) => {
    setDestination(city);
    setShowSuggestions(false);
  };

  const fetchLiveHotels = async (searchCity) => {
    const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;
    
    // Fallback if no real API key is provided
    if (!apiKey || apiKey === "your_rapidapi_key_here") {
      setDisplayedHotels([]);
      toast.error("RapidAPI Key is missing in .env file");
      return;
    }

    try {
      // Step 1: Get Destination ID
      const locationOptions = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/locations/auto-complete',
        params: { text: searchCity, languagecode: 'en-us' },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
      };

      const locResponse = await axios.request(locationOptions);
      if (!locResponse.data || locResponse.data.length === 0) {
        setDisplayedHotels([]);
        toast.info("No live hotels found for this location.");
        return;
      }

      const destId = locResponse.data[0].dest_id;
      const destType = locResponse.data[0].dest_type;

      // Step 2: Fetch Hotels for Destination
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      const arrivalDate = tomorrow.toISOString().split('T')[0];
      const departureDate = dayAfter.toISOString().split('T')[0];

      const hotelOptions = {
        method: 'GET',
        url: 'https://apidojo-booking-v1.p.rapidapi.com/properties/list',
        params: {
          arrival_date: arrivalDate,
          departure_date: departureDate,
          adults_number: guests,
          dest_ids: destId,
          dest_type: destType,
          room_qty: '1',
          order_by: 'popularity',
          languagecode: 'en-us',
          currency_code: 'INR'
        },
        headers: {
          'X-RapidAPI-Key': apiKey,
          'X-RapidAPI-Host': 'apidojo-booking-v1.p.rapidapi.com'
        }
      };

      const hotelResponse = await axios.request(hotelOptions);
      const results = hotelResponse.data.result;

      if (results && results.length > 0) {
        toast.success("Live hotels loaded!");
        // Map live data to our card structure
        const mappedHotels = results.slice(0, 12).map(hotel => ({
          id: hotel.hotel_id,
          name: hotel.hotel_name,
          location: hotel.city_trans,
          price: hotel.min_total_price || Math.floor(Math.random() * 300) + 50,
          rating: hotel.review_score || 4.0,
          reviews: hotel.review_nr || 0,
          image: (hotel.main_photo_url ? hotel.main_photo_url.replace('square60', 'max500') : null) || hotel.max_photo_url || "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=800",
          features: ["Free WiFi", "Live API Data"],
          url: hotel.url,
        }));
        setDisplayedHotels(mappedHotels);
      } else {
        setDisplayedHotels([]);
        toast.info("No live hotels available for these dates.");
      }
    } catch (error) {
      console.error("API Error:", error);
      setDisplayedHotels([]);
      toast.error(`RapidAPI Error: ${error.response?.data?.message || error.message}. Please check your API key subscription.`);
    }
  };



  const handleSearch = async (e) => {
    e.preventDefault();
    setIsSearching(true);
    setShowSuggestions(false);
    
    // Call our new live API fetch function
    await fetchLiveHotels(destination);
    
    setIsSearching(false);
  };

  const handleBookNow = async (hotel) => {
    try {
      const response = await fetch(`${BACKENDURL}/api/v1/hotels/sync-api-hotel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(hotel),
      });
      // We don't block the redirect if sync fails
    } catch (error) {
      console.error("Error saving hotel:", error);
    }

    if (hotel.url) {
      toast.success(`Redirecting to Booking.com for ${hotel.name}!`);
      window.open(hotel.url, '_blank');
    } else {
      toast.error("Real booking link is not available for this hotel.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Hero Header */}
      <div className="bg-blue-900 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Find Your Perfect Stay</h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">Discover luxury hotels, resorts, and getaways worldwide.</p>
          
          {/* Search Box */}
          <form onSubmit={handleSearch} className="bg-white rounded-2xl md:rounded-full p-2 md:p-3 flex flex-col md:flex-row shadow-2xl items-center gap-4 relative">
            <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 relative" ref={dropdownRef}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">Location</label>
              <input 
                type="text" 
                placeholder="Where are you going?" 
                value={destination}
                onChange={handleDestinationChange}
                onFocus={() => destination.length > 0 && setShowSuggestions(true)}
                className="w-full min-w-[200px] text-gray-800 bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus:border-transparent p-0 font-medium placeholder-gray-400"
                required
              />
              {/* Autocomplete Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-3 bg-white border border-gray-100 shadow-xl rounded-xl overflow-hidden z-50">
                  {suggestions.map((city, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSuggestionClick(city)}
                      className="px-5 py-3 hover:bg-blue-50 cursor-pointer flex items-center gap-3 text-gray-700 transition-colors border-b border-gray-50 last:border-0"
                    >
                      <FaMapMarkerAlt className="text-gray-400 shrink-0" />
                      <span className="font-medium whitespace-nowrap truncate text-left w-full">{city}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="flex-1 w-full px-4 py-2 border-b md:border-b-0 md:border-r border-gray-300 flex gap-4">
              <div className="w-1/2 border-r border-gray-300 pr-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">Check In</label>
                <input 
                  type="date" 
                  value={checkIn}
                  onChange={(e) => {
                    setCheckIn(e.target.value);
                    if (checkOut && e.target.value > checkOut) setCheckOut("");
                  }}
                  min={today}
                  className="w-full text-gray-800 focus:outline-none font-medium bg-transparent cursor-pointer"
                  required
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">Check Out</label>
                <input 
                  type="date" 
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  min={checkIn || today}
                  className="w-full text-gray-800 focus:outline-none font-medium bg-transparent cursor-pointer"
                  required
                />
              </div>
            </div>
            <div className="w-full md:w-auto px-4 py-2">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1 text-left">Guests</label>
              <input 
                type="number" 
                min="1"
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full text-gray-800 focus:outline-none font-medium bg-transparent"
              />
            </div>
            <button 
              type="submit" 
              className="w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white p-4 rounded-xl md:rounded-full transition-colors flex items-center justify-center min-w-[60px]"
            >
              <FaSearch className="text-xl" />
              <span className="ml-2 md:hidden font-semibold">Search</span>
            </button>
          </form>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {destination && !isSearching ? `Hotels in ${destination}` : "Search for a destination"}
            </h2>
            <p className="text-gray-500 mt-1">
              {displayedHotels.length} {displayedHotels.length === 1 ? 'property' : 'properties'} found
            </p>
          </div>
        </div>

        {isSearching ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          </div>
        ) : displayedHotels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedHotels.map((hotel) => (
              <div key={hotel.id} className="bg-white rounded-[24px] overflow-hidden shadow-xl shadow-blue-900/5 hover:shadow-2xl hover:shadow-blue-900/15 transition-all duration-300 group cursor-pointer border border-slate-100">
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={hotel.image} 
                    alt={hotel.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1.5 shadow-sm text-[13px] font-extrabold text-slate-800">
                    <FaStar className="text-yellow-400" /> {hotel.rating}
                  </div>
                </div>
                
                <div className="p-5">
                  <div className="flex items-center gap-1.5 text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2">
                    <FaMapMarkerAlt /> {hotel.location}
                  </div>
                  <h3 className="text-lg font-extrabold text-slate-800 mb-2 truncate">{hotel.name}</h3>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {hotel.features.map((feature, idx) => (
                      <span key={idx} className="bg-blue-50 text-blue-700 text-[11px] px-2.5 py-1 rounded-md font-bold">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div className="text-slate-500 text-sm font-medium">
                      <span className="text-xl font-extrabold text-blue-600">₹{hotel.price}</span> / night
                    </div>
                    <button 
                      onClick={() => handleBookNow(hotel)}
                      className="text-slate-700 font-bold hover:text-blue-600 transition-colors text-sm uppercase tracking-wider"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="text-xl font-bold text-gray-700 mb-2">No hotels found</h3>
            <p className="text-gray-500">We couldn't find any properties matching "{destination}". Try a different location.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchHotels;
