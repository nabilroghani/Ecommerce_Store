const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_KEY);
    console.log("Database Connected");
  } catch (error) {
    console.log("Database Error");
    process.exit(1);
  }
};

module.exports = connectDB;
