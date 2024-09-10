const Movie = require("../models/movies");
const customError = require("../utils/customError");

// ========== CONTROLLER TO FIND ALL BOOKMARKED MOVIES ============
const allBookmarks = async (req, res) => {
  const { userId } = req.user; // DESTRUCTURING (Keeping userId inside req.user)
  const bookmarks = await Movie.find({ bookmarkBy: userId });
  res.status(200).json({ data: bookmarks });
};

// ========= CONTROLLER TO ADD A MOVIE TO BOOKMARK ================
const addBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $push: { bookmarkBy: userId } }
  );

  if (!bookmarkedShows) {
    return next(customError(`No Movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "Movie BookMarked!" });
};

//  ======== CONTROLLER TO REMOVE A MOVIE FROM BOOKMARK ==========
const removeBookmark = async (req, res) => {
  const { id } = req.params;

  const { userId } = req.user;

  const bookmarkedShows = await Movie.findOneAndUpdate(
    { _id: id },
    { $pull: { bookmarkBy: userId } }
  );
  //   ERROR HANDLING
  if (!bookmarkedShows) {
    return next(customError(`No Movie with ID: ${id}`, 400));
  }

  res.status(200).json({ message: "BookMark Removed!" });
};

module.exports = { allBookmarks, addBookmark, removeBookmark };
