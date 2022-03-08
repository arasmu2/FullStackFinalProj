// Controls the meme API data

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.createMeme = function (req, res) {
  console.log("========= Form Submission =========");
  console.log("\tText0:", req.query.text0);
  console.log("\tText1:", req.query.text1);
  console.log("\tIamge:", req.query.image);
};