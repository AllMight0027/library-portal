const Issue = require("../models/Issue");

//issue param (middleware)
exports.getIssueById = (req, res, next, id) => {
  Genre.findById(id)
    .then((issue) => {
      if (!issue)
        return res
          .status(400)
          .json({ status: "Failed", error: "Issue id doesn't exists" });
      req.issue = issue;
      next();
    })
    .catch((err) => console.log(err));
};

exports.getIssue = (req, res) => {
  res.status(200).json(req.issue);
};

exports.postIssue = (req, res) => {
  const issue = new Issue(req.body);
  issue
    .save()
    .then((issue) => {
      if (!issue) {
        return res.json({ error: "Failed to add issue" });
      }
      res.status(200).json(issue);
    })
    .catch((err) => console.log(err));
};

exports.getIssueByBookId = (req, res) => {
  Issue.find({ book: req.book._id })
    .then((issues) => {
      res.json(issues);
    })
    .catch((e) => console.log(e));
};

exports.getIssueByPhone = (req, res) => {
  Issue.find({ phone: req.body.phone })
    .then((issues) => {
      res.json(issues);
    })
    .catch((e) => console.log(e));
};
