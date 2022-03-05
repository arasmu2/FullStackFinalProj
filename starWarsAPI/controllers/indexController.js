const { body, validationResult } = require("express-validator");

var async = require("async");
var axios = require("axios");
var Parser = require("../public/rndMeme").getInstance();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.index = async function (req, res) {
  let response, data, err, img_response, img_url, img_err;
  // fetch a random quote
  try {
    response = await axios.get(
      "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
    );
    data = response.data.content;
    console.log(data);
  } catch (error) {
    console.group("GET quote err");
    console.error(error);
    console.groupEnd();
    err = error;
  }

  let captions = Parser.parseQuote(data);
  let meme = Parser.randomMeme();
  // console.log(meme);
  // captions = ["we live in", "a society"];

  try {
    img_response = await axios.post(
      "https://api.imgflip.com/caption_image",
      {},
      {
        params: {
          template_id: meme[0],
          username: "project_acct",
          password: "insecurePW",
          text0: captions[0],
          text1: captions[1],
          max_font_size: "30",
        },
      }
    );
    img_url = img_response.data.data.url;
    //console.log(img_response.data);
  } catch (error) {
    console.group("POST meme err");
    console.error(error);
    console.groupEnd();
    img_err = error;
  }

  res.render("index", {
    quote: data,
    err: err,
    meme: img_url,
    memeName: meme[1],
  });
};
