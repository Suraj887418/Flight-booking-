import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoute from "./Routes/auth.js";
import flightRoute from "./Routes/flights.js";
import bookingRoute from "./Routes/booking.js";
import ticketRoute from "./Routes/tickets.js";
import hotelRoute from "./Routes/hotelRoute.js";
import multer from "multer";
import jsQR from "jsqr";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

const corsOptions = {
  origin: true,
  credentials: true,
};

app.use(cors(corsOptions));

// Multer Configuration
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Home Route
app.get("/", (req, res) => {
  res.status(200).send("API is Working 🚀");
});

// MongoDB Connection
mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};

// QR Decode Route (Temporarily Disabled)
app.post("/api/v1/decode-qr", upload.single("image"), async (req, res) => {
  res.status(500).json({
    status: false,
    message: "QR scanning is temporarily disabled.",
  });
});

// API Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/flights", flightRoute);
app.use("/api/v1/bookings", bookingRoute);
app.use("/api/v1/tickets", ticketRoute);
app.use("/api/v1/hotels", hotelRoute);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  await connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});