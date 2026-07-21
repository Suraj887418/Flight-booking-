import mongoose from "mongoose";
import dotenv from "dotenv";
import Airline from "./models/airlineSchema.js";
import Flight from "./models/flightSchema.js";

dotenv.config();

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    // Add an airline
    let indigo = await Airline.findOne({ airlineName: "IndiGo" });
    if (!indigo) {
      indigo = new Airline({
        airlineName: "IndiGo",
        airlineLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/5/58/IndiGo_logo.svg/1200px-IndiGo_logo.svg.png",
      });
      await indigo.save();
      console.log("Added IndiGo Airline");
    }

    let airIndia = await Airline.findOne({ airlineName: "Air India" });
    if (!airIndia) {
      airIndia = new Airline({
        airlineName: "Air India",
        airlineLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Air_India_Logo.svg/1200px-Air_India_Logo.svg.png",
      });
      await airIndia.save();
      console.log("Added Air India");
    }

    // Get today's date as string YYYY-MM-DD
    const todayDate = new Date();
    const today = todayDate.getFullYear() + '-' + String(todayDate.getMonth() + 1).padStart(2, '0') + '-' + String(todayDate.getDate()).padStart(2, '0');
    
    const nextWeekDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const nextWeek = nextWeekDate.getFullYear() + '-' + String(nextWeekDate.getMonth() + 1).padStart(2, '0') + '-' + String(nextWeekDate.getDate()).padStart(2, '0');

    // Add flights
    const flightsData = [
      {
        airline: indigo._id,
        from: "Delhi",
        to: "Mumbai",
        departTime: "10:00",
        arriveTime: "12:15",
        departDate: today,
        arriveDate: today,
        price: 5500,
      },
      {
        airline: airIndia._id,
        from: "Delhi",
        to: "Mumbai",
        departTime: "16:30",
        arriveTime: "18:45",
        departDate: today,
        arriveDate: today,
        price: 6200,
      },
      {
        airline: indigo._id,
        from: "Mumbai",
        to: "Delhi",
        departTime: "14:00",
        arriveTime: "16:15",
        departDate: nextWeek,
        arriveDate: nextWeek,
        price: 4500,
      },
      {
        airline: airIndia._id,
        from: "London",
        to: "Delhi",
        departTime: "08:00",
        arriveTime: "22:00",
        departDate: today,
        arriveDate: today,
        price: 45000,
      }
    ];

    for (const flight of flightsData) {
      const newFlight = new Flight(flight);
      await newFlight.save();
    }
    
    console.log("Added 4 test flights successfully! (Dates used: " + today + " and " + nextWeek + ")");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error seeding DB:", err);
    mongoose.connection.close();
  }
};

seedDB();
