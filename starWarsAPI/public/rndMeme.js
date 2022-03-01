// https://stackoverflow.com/questions/32245687/node-js-and-custom-module-with-express-js

class Parser {
  constructor(quote) {}

  parseQuote(quote) {
    // sanitize input
    quote = quote.replaceAll("[", "");
    quote = quote.replaceAll("]", "");
    // break up the quote into substrings to insert into the meme
    quote = quote.split(/([!?.-])/);

    // parse the substrings to count the number of sentences in the quote
    let sentence_count = 0;
    for (let i = 1; i < quote.length; i++) {
      if (quote[i] == "!" || quote[i] == "?" || quote[i] == ".")
        sentence_count++;
      if (quote[i] == " " || (quote[i] == "-" && quote.length - i < 3)) {
        if (sentence_count == 0) sentence_count++;
        break;
      }
    }
    console.log(quote);
    console.log(sentence_count + " sentences");

    return sentence_count;
  }
}

//added function for getting instance
module.exports.getInstance = function () {
  return new Parser();
};
