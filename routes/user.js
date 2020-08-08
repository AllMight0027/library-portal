const express = require("express");
const router = express.Router();

const { getUser, getUserById } = require("../controllers/user");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");

//middleware to get param and populate req.ptofile
router.param("userId", getUserById);

//route to get user by id
router.get("/:userId", isSignedIn, isAuthenticated, getUser);

module.exports = router;
