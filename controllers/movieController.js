const Movie = require("../models/movies");

// ================== CONTROLLER TO FIND(GET) ALL SHOWS ===================
const allShows = async (req, res) => {
  const shows = await Movie.find({});
  res.status(200).json({ shows: shows });
};

// ================== CONTROLLER TO FIND(GET) ONLY THE SERIES =============
const allSeries = async (req, res) => {
  const series = await Movie.find({ type: "series" });
  res.status(200).json({ shows: series });
};

// ================ CONTROLLER TO FIND(GET) ONLY THE MOVIES ===============
const allMovies = async (req, res) => {
  const movies = await Movie.find({ type: "movie" });
  res.status(200).json({ shows: movies });
};

module.exports = { allShows, allSeries, allMovies };
