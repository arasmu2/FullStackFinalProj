// Controls the home page API data collection

const { body, validationResult } = require("express-validator");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));
const https = require("https");
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

var async = require("async");
var SWMemes = require("../public/rndMeme").getInstance();

exports.index = function (req, res, next) {
  let response, quote, err, img_response, img_url, img_err;
  var memeData = [];
  fetch("https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote", { agent: httpsAgent })
    .then((result) => result.json())
    .then((output) => {
      quote = JSON.stringify(output.content);

      let captions = SWMemes.parseQuote(quote);
      let meme = SWMemes.randomMeme();
      // console.log(meme);
      // captions = ["we live in", "a society"];

      var params = {
        template_id: meme[0],
        username: "project_acct",
        password: "insecurePW",
        text0: captions[0],
        text1: captions[1],
        max_font_size: "30",
      };

      var url = new URL("https://api.imgflip.com/caption_image");
      Object.keys(params).forEach((key) => url.searchParams.append(key, params[key]));

      fetch(url, { method: "POST" })
        .then((result) => result.json())
        .then((output) => {
          res.render("index", {
            quote: quote,
            err: err,
            meme: output.data.url,
            memeName: meme[1],
          });
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
};
