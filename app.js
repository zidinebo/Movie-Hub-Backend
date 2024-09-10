require("dotenv").config(); // Importing and configure dotenv

const express = require("express"); // Importing installed express

const mongoose = require("mongoose"); // Importing installed mongoose

const cors = require("cors");

const authRouter = require("./routes/authRouter"); // Imported routes from authRouter in route folder manually to app.js

const movieRouter = require("./routes/movieRouter"); // Imported routes from movieRouter in route folder manually to app.js

const bookmarkRouter = require("./routes/bookmarkRouter"); // Imported routes from bookmarkRouter in route folder manually to app.js
// ================================
const error = require("./middlewares/error"); // Imported the error file from middleware(error.js)

const app = express(); // Spining up the new express application

const port = 4000; // Creating the port

app.use(cors());

// Middleware that allows access to the req.body on all request(Without this, you cannot test on postman)
app.use(express.json()); // This must be done before connecting backend to POSTMAN

// Middleware for Login and Register for Authentication router
app.use("/api/auth", authRouter); // Manually creating a malware for path

// Middleware for Movie Router
app.use("/api/movie", movieRouter);

// Middleware for BookMark Router
app.use("/api/bookmark", bookmarkRouter);

// CUSTOM MIDDLEWARE FOR ERRORS.
app.use(error);

// CONNECTING MONGODB TO DATABASE
// Start listening on a given port and run the callback function when it does.
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL); // Connecting to our database
    console.log("Database Connected");

    await app.listen(port, () => {
      console.log(`Server is running on PORT ${port}`);
    });
  } catch (error) {
    console.log(error);
    console.log("Unable to connect");
  }
};

start();

// zidinebo
// U52F1aGH3IV3yfGv
