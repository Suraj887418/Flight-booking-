import mongoose from "mongoose";
import dotenv from "dotenv";
import Airline from "./models/airlineSchema.js";

dotenv.config();

const updateDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    await Airline.updateOne(
      { airlineName: "IndiGo" },
      { $set: { airlineLogo: "https://logo.clearbit.com/goindigo.in" } }
    );
    
    await Airline.updateOne(
      { airlineName: "Air India" },
      { $set: { airlineLogo: "https://logo.clearbit.com/airindia.com" } }
    );

    console.log("Logos updated successfully!");
    mongoose.connection.close();
  } catch (err) {
    console.error("Error updating DB:", err);
    mongoose.connection.close();
  }
};

updateDB();
