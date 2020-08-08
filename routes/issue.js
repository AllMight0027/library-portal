const express = require("express");
const router = express.Router();

const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");
const { getBookById } = require("../controllers/book");
const {
  getIssueById,
  postIssue,
  getIssue,
  getIssueByBookId,
  getIssueByPhone,
} = require("../controllers/issue");

//middleware to get userId param and populate req.profile
router.param("userId", getUserById);

//middleware to get bookId param and populate req.book
router.param("bookId", getBookById);

//middleware to get issueId param and populate req.issue
router.param("issueId", getIssueById);

//get genre by id
router.get("/:issueId", getIssue);

router.post("/create/:userId", isSignedIn, isAuthenticated, postIssue);

router.get("/issuehistory/:bookId/:userId", getIssueByBookId);

router.get(
  "/userissuehistory/:userId",
  isSignedIn,
  isAuthenticated,
  getIssueByPhone
);

module.exports = router;
