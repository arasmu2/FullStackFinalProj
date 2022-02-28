const { body, validationResult } = require("express-validator");

var async = require("async");
var axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.index = async function (req, res) {
  let response, data, err, img_response, img_url, img_err;
  try {
    response = await axios.get(
      "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
    );
    data = response.data;
    console.log(data.content);
  } catch (error) {
    console.group("GET quote err");
    console.error(error);
    console.groupEnd();
    err = error;
  }

  try {
    img_response = await axios.post(
      "https://api.imgflip.com/caption_image",
      {},
      {
        params: {
          template_id: "1373425",
          username: "project_acct",
          password: "insecurePW",
          text0: "we live in a society",
          text1: "bottom text",
          max_font_size: "20",
        },
      }
    );
    img_url = img_response.data.data.url;
    console.log(img_response.data);
  } catch (error) {
    console.group("POST meme err");
    console.error(error);
    console.groupEnd();
    img_err = error;
  }

  res.render("index", { results: data.content, err: err, meme: img_url });
};
