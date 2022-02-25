const { body, validationResult } = require("express-validator");

var async = require("async");
var axios = require("axios");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

exports.index = async function (req, res) {
  let response, data, err;
  try {
    response = await axios.get(
      "http://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote"
    );
    data = response.data;
    console.log(data.content);
  } catch (error) {
    console.group("Fetch quote");
    console.error(error);
    console.groupEnd();
    err = error;
  }

  res.render("index", { results: data.content, err: err });
};
