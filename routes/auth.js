const express = require("express");
const router = express.Router();
const { signup, signout, signin, isSignedIn } = require("../controllers/auth");
const { check, validationResult } = require("express-validator");

//Signup route
router.post(
  "/signup",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Minimum length of 8").isLength({ min: 8 }),
  ],
  signup
);

//Signin route
router.post(
  "/signin",
  [
    check("email", "Valid email required").isEmail(),
    check("password", "Password is required").isLength({ min: 1 }),
  ],
  signin
);

//Signout route
router.get("/signout", signout);

router.get("/test", isSignedIn, (req, res) => {
  res.json(req.auth);
});

module.exports = router;
