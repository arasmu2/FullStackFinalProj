const { body, validationResult } = require("express-validator");

var async = require("async");

exports.meme = function (req, res) {
  res.render("meme");
};
