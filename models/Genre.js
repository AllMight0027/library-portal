const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const genreSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = Genre = mongoose.model("Genre", genreSchema);
