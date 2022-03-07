// Controls the meme API data

const { body, validationResult } = require("express-validator");

var async = require("async");
var SWMemes = require("../public/rndMeme").getInstance();

// Stores meme data
var memeData = [];
var extraData = [];

exports.meme = function (req, res) {
  var memeList = SWMemes.allMemes();

  if (memeData.length === 0)
    for (var i = 0; i < memeList.length; i++) {
      memeData.push([memeList[i][0], memeList[i][1], memeList[i][2]]);
    }

  // Sends data to pug view
  res.render("lists", {
    title: "Memes",
    data: memeData,
  });
};
