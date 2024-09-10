// Import and configurecdotenv
require("dotenv").config();

const mongoose = require("mongoose");

const Movie = require("./models/movies");

const movieJson = require("./movies.json");

// ============FUNCTION TO SEND API movies.json to database======================
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Connecting to the mongooseDB to database
    console.log("DB onnected");
    console.log("Deletinnnng..........");

    // To Delete the previous movies in the database
    await Movie.deleteMany();
    console.log("Previous movies deleted");

    console.log("Uploading...");
    await Movie.create(movieJson); // Brining our API into the mongoose
    console.log("Movie Uploaded Successfully");
    process.exit(0);
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
    process.exit(1);
  }
};

start();
