const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const issueSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    book: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Book",
    },
    issuedOn: {
      type: String,
      default: Date(),
    },
    returnedOn: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = Issue = mongoose.model("Issue", issueSchema);
