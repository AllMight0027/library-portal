const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const {
  getBookById,
  createBook,
  getBook,
  photo,
  deleteBook,
  updateBook,
  getAllBooks,
} = require("../controllers/book");

//middleware to get userId param and populate req.profile
router.param("userId", getUserById);

//middleware to get bookId param
router.param("bookId", getBookById);

//add book
router.post("/create/:userId", isSignedIn, isAuthenticated, createBook);

//get book by bookId
router.get("/:bookId", getBook);

//get book's photo by photo middleware
router.get("/photo/:bookId", photo);

//delete a book
router.delete(
  "/delete/:bookId/:userId",
  isSignedIn,
  isAuthenticated,
  deleteBook
);

//update a book
router.put("/update/:bookId/:userId", isSignedIn, isAuthenticated, updateBook);

//get all books
router.get("/", getAllBooks);

module.exports = router;
