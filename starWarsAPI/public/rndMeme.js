// https://stackoverflow.com/questions/32245687/node-js-and-custom-module-with-express-js

class Parser {
  memeList = [
    [14371066, "Wise Yoda"],
    [19194965, "Vade Nooo"],
    [1373425, "Not the droids you're looking for"],
    [18202798, "You were the chosen one"],
    [53489704, "Emperor Palpatine"],
    [61080037, "Unlimited power"],
    [21896657, "It's a trap"],
    [6289476, "Darth Vader"],
    [27939042, "Han Solo"],
    [105667083, "Our only hope"],
    [3556352, "Vader approves"],
    [76243734, "Angry Ewok"],
    [24657376, "Jar Jar Binks"],
    [47203863, "Angry Anakin"],
    [48699739, "It's true, all of it"],
    [159448159, "Archives are incomplete"],
    [116886647, "Excited Porg"],
    [20842084, "Force choke"],
    [25330875, "Sad stormtrooper"],
    [40173248, "Happy Han"],
    [134748967, "So this is how liberty dies"],
    [27853298, "Red leader"],
    [194250995, "Vauge and unconvincing"],
    [19890752, "Obi-Wan lightsaber"],
    [202330453, "There is another"],
    [11925933, "... but it checks out"],
    [39273090, "Escaping Millenium Falcon"],
    [67936974, "Wreched hive of scum and villany"],
    [29328726, "Luke and Han on Hoth"],
    [56425892, "Obi-Wan approves"],
    [53412181, "I know"],
    [88468304, "Move along"],
    [27854759, "I have altered the deal"],
    [148028936, "Obi-Wan and Vader fight"],
    [15186919, "Medal ceremony"],
    [24662368, "Finn is lost"],
  ];

  constructor(quote) {}

  parseQuote(quote) {
    let captions = ["", ""];
    // sanitize input
    quote = quote.replaceAll("[", "");
    quote = quote.replaceAll("]", "");
    // break up the quote into substrings to insert into the meme
    quote = quote.split(/([!?.-])/);

    // parse the substrings to count the number of sentences in the quote
    let sentence_count = 0;
    for (let i = 1; i < quote.length; i++) {
      if (quote[i] == "!" || quote[i] == "?" || quote[i] == ".") {
        sentence_count++;
      }
      if (quote[i] == " " || (quote[i] == "-" && quote.length - i < 3)) {
        if (sentence_count == 0) sentence_count++;
        break;
      }
    }
    // console.log(quote);
    // console.log(sentence_count + " sentences");

    let end = false;
    let qi = 0;
    let ci = 0;
    let completed_sentences = 0;

    while (ci <= 1) {
      while (end == false) {
        captions[ci] += quote[qi];
        if (quote[qi] == "!" || quote[qi] == "?" || quote[qi] == ".") {
          completed_sentences++;
          if (
            completed_sentences >= sentence_count - completed_sentences ||
            completed_sentences == sentence_count
          )
            end = true;
        }
        if (quote[qi] == " " || (quote[qi] == "-" && quote.length - qi < 3)) {
          completed_sentences++;
          if (
            completed_sentences >= sentence_count - completed_sentences ||
            completed_sentences == sentence_count
          )
            end = true;
        } else {
          qi++;
        }
      }
      ci++;
      if (sentence_count == 1) ci++;
      end = false;
    }

    console.log(captions);

    return captions;
  }

  randomMeme() {
    let temp = Math.floor(Math.random() * 36);
    return this.memeList[temp];
  }
}

//added function for getting instance
module.exports.getInstance = function () {
  return new Parser();
};
