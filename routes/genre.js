const express = require("express");
const router = express.Router();
const {
  postGenre,
  getAllGenres,
  getGenreById,
  getGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genre");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

//middleware to get userId param and populate req.profile
router.param("userId", getUserById);

//middleware to get genreId param
router.param("genreId", getGenreById);

//get genre by id
router.get("/:genreId", getGenre);

//post a genre
router.post("/create/:userId", isSignedIn, isAuthenticated, postGenre);

//get all genres
router.get("/", getAllGenres);

//update a genre
router.put(
  "/update/:genreId/:userId",
  isSignedIn,
  isAuthenticated,
  updateGenre
);

//dalete a genre
router.delete(
  "/delete/:genreId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteGenre
);

module.exports = router;
