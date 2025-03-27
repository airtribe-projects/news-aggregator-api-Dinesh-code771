const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "news",
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    });
    console.log("Connected to the database...");
  } catch (err) {
    console.error("Could not connect to the database...", err);
    process.exit(1); // Exit with failure
  }
};

module.exports = connectDB;
