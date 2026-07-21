import Hotel from "../models/hotelSchema.js";

export const syncApiHotel = async (req, res) => {
  const { name, location, price, rating, reviews, image, features } = req.body;

  try {
    // Check if hotel already exists in DB
    let hotel = await Hotel.findOne({ name, location });

    if (!hotel) {
      hotel = new Hotel({
        name,
        location,
        price,
        rating,
        reviews,
        image,
        features,
      });
      await hotel.save();
    }

    res.status(200).json({ status: true, hotelId: hotel._id, message: "Hotel synced to database" });
  } catch (error) {
    console.error("Error syncing API hotel:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({});
    res.status(200).json({ status: true, data: hotels });
  } catch (error) {
    console.error("Error fetching hotels:", error);
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};
