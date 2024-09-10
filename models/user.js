const mongoose = require("mongoose"); // Importing mongoose here

// CREATING THE SCHEMA STRUCTURE FOR THE AUTH PAGE
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Please Provide a Valid email",
    ],
  },

  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema); // Exporting the model and nexting the userSchema.

// Regex (Regular expressions): They are used to define patterns. e.g user@gmail.com/ user@mail.gmail.com/ user@gmail.co.uk
