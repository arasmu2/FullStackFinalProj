const { body, validationResult } = require("express-validator");

var async = require("async");
var SWMemes = require("../public/rndMeme").getInstance();

var memeData = [];
var extraData = [];

exports.meme = function (req, res) {
  var memeList = SWMemes.allMemes();

  for (var i = 0; i < memeList.length; i++) memeData.push([memeList[i][1], memeList[i][2]]);

  res.render("lists", {
    title: "Memes",
    data: memeData,
    extra: extraData,
  });
};
