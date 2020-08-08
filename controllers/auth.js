const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const { validationResult } = require("express-validator");

//signup controller
exports.signup = (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user)
        return res.json({ status: "Failed", error: "Email id already exists" });
      else {
        //validation
        if (req.body.password.length < 8)
          return res.json({
            status: "Failed",
            error: "Minimum password length is 8",
          });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(422).json({
            status: "Failed",
            error: errors.array()[0].msg,
          });
        }
        //save in db
        const newUser = new User(req.body);
        newUser
          .save()
          .then((resUser) => {
            res.json(resUser);
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
};

//signin controller
exports.signin = (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      //validation
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).json({
          status: "Failed",
          error: errors.array()[0].msg,
        });
      }

      //chech if email exists in db
      if (!user)
        return res
          .status(500)
          .json({ status: "Failed", error: "Email id doesn't exists" });

      //check password
      if (!user.authenticate(password))
        return res
          .status(500)
          .json({ status: "Failed", error: "Password doesn't match" });

      //create token
      const token =
        "Bearer " + jwt.sign({ _id: user._id }, process.env.SECRET).toString();

      //put token in cookies
      res.cookie("token", token);

      //send res to frontend
      const { _id, name, email, role } = user;
      return res.status(200).json({ token, user: { _id, name, email, role } });
    })
    .catch((err) => console.log(err));
};

//signout controller
exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({ status: "Success", error: "Signed Out" });
};

//middlewares
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

exports.isAuthenticated = (req, res, next) => {
  let checker = req.process && req.auth && req.process._id == req.auth._id;
  if (checker)
    return res.status(403).json({ status: "Failed", error: "Access Denied" });
  next();
};
