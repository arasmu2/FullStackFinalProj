// Controls the meme API data
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const { body, validationResult } = require("express-validator");

var async = require("async");

exports.createMeme = function (req, res) {
  console.log("========= Form Submission =========");
  console.log("\tText0:", req.query.text0);
  console.log("\tText1:", req.query.text1);
  console.log("\tIamge:", req.query.image);

  var params = {
    template_id: req.query.image,
    username: "project_acct",
    password: "insecurePW",
    text0: req.query.text0,
    text1: req.query.text1,
    max_font_size: "30",
  };

  var url = new URL("https://api.imgflip.com/caption_image");
  Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

  fetch(url, { method: "POST" })
    .then((result) => result.json())
    .then((output) => {
      res.render("newMeme", {
        meme: output.data.url,
      });
    })
    .catch((err) => console.error(err));
};
