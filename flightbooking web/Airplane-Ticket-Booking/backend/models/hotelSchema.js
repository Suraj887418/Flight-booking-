import mongoose from "mongoose";
const Schema = mongoose.Schema;

const hotelSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  rating: {
    type: Number,
  },
  reviews: {
    type: Number,
  },
  image: {
    type: String,
  },
  features: {
    type: [String],
  }
});

export default mongoose.model("Hotel", hotelSchema);
