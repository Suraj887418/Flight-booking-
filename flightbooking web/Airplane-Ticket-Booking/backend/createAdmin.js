import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import User from "./models/userSchema.js";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");

    const adminEmail = "admin@example.com";
    const adminPassword = "adminpassword123";

    // Check if admin already exists
    let admin = await User.findOne({ email: adminEmail });
    if (admin) {
      console.log("Admin account already exists with email: " + adminEmail);
      mongoose.connection.close();
      return;
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(adminPassword, salt);

    // Create the admin user
    admin = new User({
      name: "Admin User",
      email: adminEmail,
      password: hashPassword,
      isAdmin: true,
    });

    await admin.save();
    console.log("Admin account created successfully!");
    console.log("Email: " + adminEmail);
    console.log("Password: " + adminPassword);

    mongoose.connection.close();
  } catch (err) {
    console.error("Error creating admin:", err);
    mongoose.connection.close();
  }
};

createAdmin();
