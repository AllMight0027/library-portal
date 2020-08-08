const Book = require("../models/Book");
const formidable = require("formidable");
const mongoose = require("mongoose");
const _ = require("lodash");
const fs = require("fs");

//param middleware for book
exports.getBookById = (req, res, next, id) => {
  Book.findById(id)
    .populate("Genre")
    .then((book) => {
      if (!book)
        return res
          .status(400)
          .json({ status: "Failed", error: "Book id doesn't exists" });
      req.book = book;
      next();
    })
    .catch((err) => console.log(err));
};

//create a new book
exports.createBook = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 2 * 1024 * 1024;

  form.parse(req, (err, fields, files) => {
    if (err)
      return res
        .status(400)
        .json({ status: "Failed", error: "Problem with image file" });

    //destructuring fields
    const { name, description, genre, author } = fields;

    if (!name || !description || !genre || !author)
      return res
        .status(400)
        .json({ status: "Failed", error: "Enter all fields" });

    let book = new Book(fields);

    if (files.photo) {
      book.photo.data = fs.readFileSync(files.photo.path);
      book.photo.contentType = files.photo.type;
    }

    //save to the db
    book
      .save()
      .then((book) => {
        if (!book)
          return res
            .status(400)
            .json({ status: "Failed", error: "Problem with image save" });
        res.json(book);
      })
      .catch((err) => console.log(err));
  });
};

//get book based on bookId
exports.getBook = (req, res) => {
  req.book.photo = undefined;
  res.status(200).json(req.book);
};

//middleware to optimize image loading
exports.photo = (req, res) => {
  if (req.book.photo.data) {
    res.set("Content-Type", req.book.photo.contentType);
    res.send(req.book.photo.data);
  }
};

//delete a book
exports.deleteBook = (req, res) => {
  let book = req.book;
  book.remove((err, deletedBook) => {
    if (err) {
      return res
        .status(400)
        .json({ status: "Failed", error: "Problem with deleting" });
    }
    res.json({ message: "Deleted" });
  });
};

//update a book
exports.updateBook = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.maxFileSize = 2 * 1024 * 1024;

  form.parse(req, (err, fields, files) => {
    if (err)
      return res
        .status(400)
        .json({ status: "Failed", message: "Problem with image file" });

    //updation code
    let book = req.book;
    book = _.extend(book, fields);

    if (files.photo) {
      book.photo.data = fs.readFileSync(files.photo.path);
      book.photo.contentType = files.photo.type;
    }

    //save to the db
    book
      .save()
      .then((book) => {
        if (!book)
          return res
            .status(400)
            .json({ status: "Failed", message: "Problem with book updation" });
        res.json(book);
      })
      .catch((err) => console.log(err));
  });
};

//list all books
exports.getAllBooks = (req, res) => {
  let limit = req.query.limit ? parseInt(req.query.limit) : 8;
  let sortBy = req.query.sortBy ? req.query.sortBy : "name";

  Book.find()
    .limit(limit)
    .sort([[sortBy, "asc"]])
    .select("-photo")
    .then((books) => {
      if (books.length == 0)
        return res
          .status(200)
          .json({ status: "Success", error: "No Book exists" });
      res.json(books);
    })
    .catch((err) => console.log(err));
};
