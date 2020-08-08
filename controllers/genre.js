const Genre = require("../models/Genre");

//genre param (middleware)
exports.getGenreById = (req, res, next, id) => {
  Genre.findById(id)
    .then((genre) => {
      if (!genre)
        return res
          .status(400)
          .json({ status: "Failed", error: "Genre id doesn't exists" });
      req.genre = genre;
      next();
    })
    .catch((err) => console.log(err));
};

//get genre by id
exports.getGenre = (req, res) => {
  res.status(200).json(req.genre);
};

//add new genre
exports.postGenre = (req, res) => {
  const genre = new Genre(req.body);
  genre
    .save()
    .then((genre) => {
      if (!genre) {
        return res.json({ error: "Failed to add genre" });
      }
      res.status(200).json(genre);
    })
    .catch((err) => console.log(err));
};

//get all genres
exports.getAllGenres = (req, res) => {
  Genre.find()
    .then((genres) => {
      if (genres.length == 0)
        return res
          .status(200)
          .json({ status: "Success", error: "No Genre exists" });
      genres.sort((a, b) =>
        a.name.toLowerCase() > b.name.toLowerCase()
          ? 1
          : b.name.toLowerCase() > a.name.toLowerCase()
          ? -1
          : 0
      );

      res.json(genres);
    })
    .catch((err) => console.log(err));
};

//update a genre
exports.updateGenre = (req, res) => {
  Genre.findByIdAndUpdate(
    { _id: req.genre._id },
    { $set: req.body },
    { new: true, useFindAndModify: false }
  )
    .then((genre) => {
      res.status(200).json(genre);
    })
    .catch((err) => console.log(err));
};

//delete a genre
exports.deleteGenre = (req, res) => {
  Genre.findByIdAndDelete({ _id: req.genre._id })
    .then((genre) => {
      return res
        .status(200)
        .json({ status: "Success", message: "Genre Deleted" });
    })
    .catch((err) => console.log(err));
};
