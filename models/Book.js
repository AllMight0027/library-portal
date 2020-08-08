const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bookSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Genre",
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    status: {
      type: String,
      default: "Available",
      enum: ["Available", "Issued", "Maintenance"],
    },
  },
  { timestamps: true }
);

module.exports = Book = mongoose.model("Book", bookSchema);
