require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();
const auth = require("./routes/auth");
const user = require("./routes/user");
const genre = require("./routes/genre");
const book = require("./routes/book");
const issue = require("./routes/issue");

//bodyparser middleware
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

//cookieparser middleware
app.use(cookieParser());

//cors middleware
app.use(cors());

//Mongodb connect
mongoose
  .connect(process.env.MONGODB_URI || process.env.DATABASE, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log(err));

//set routes to api
app.use("/api/auth", auth);
app.use("/api/user", user);
app.use("/api/book", book);
app.use("/api/genre", genre);
app.use("/api/issue", issue);

port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Port ${port} is running`);
});
