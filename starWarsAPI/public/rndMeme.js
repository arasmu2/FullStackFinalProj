// https://stackoverflow.com/questions/32245687/node-js-and-custom-module-with-express-js

class Memes {
  memeList = [
    [14371066, "Wise Yoda", "https://imgflip.com/s/meme/Star-Wars-Yoda.jpg"],
    [19194965, "I am your father/Nooo", "https://imgflip.com/s/meme/Star-Wars-No.jpg"],
    [
      1373425,
      "Not the droids you're looking for",
      "https://imgflip.com/s/meme/These-Arent-The-Droids-You-Were-Looking-For.jpg",
    ],
    [18202798, "You were the chosen one", "https://imgflip.com/s/meme/You-Were-The-Chosen-One-Star-Wars.jpg"],
    [53489704, "Emperor Palpatine", "https://i.imgflip.com/vugx4.jpg"],
    [61080037, "Unlimited power", "https://i.imgflip.com/10d5np.jpg"],
    [21896657, "It's a trap", "https://i.imgflip.com/d1bkh.jpg"],
    [6289476, "Darth Vader", "https://i.imgflip.com/3qszo.jpg"],
    [27939042, "Han Solo", "https://imgflip.com/s/meme/Han-Solo.jpg"],
    [105667083, "Leia Hologram", "https://i.imgflip.com/1qwt8r.jpg"],
    [3556352, "Vader approves", "https://i.imgflip.com/2483k.jpg"],
    [76243734, "Angry Ewok", "https://i.imgflip.com/19e61i.jpg"],
    [24657376, "Jar Jar Binks", "https://i.imgflip.com/eohr4.jpg"],
    [284353, "Angry Anakin", "https://imgflip.com/s/meme/You-Underestimate-My-Power.jpg"],
    [48699739, "It's true, all of it", "https://imgflip.com/s/meme/Its-True-All-of-It-Han-Solo.jpg"],
    [159448159, "The archives are incomplete", "https://i.imgflip.com/2mxizj.jpg"],
    [116886647, "Excited Porg", "https://i.imgflip.com/1xlabb.jpg"],
    [20842084, "Force choke", "https://i.imgflip.com/cepus.jpg"],
    [25330875, "Sad stormtrooper", "https://i.imgflip.com/f2xff.jpg"],
    [40173248, "Happy Han", "https://i.imgflip.com/nx1vk.jpg"],
    [134748967, "So this is how liberty dies", "https://i.imgflip.com/2884yv.jpg"],
    [27853298, "Porkins", "https://i.imgflip.com/gkzqq.jpg"],
    [194250995, "Vauge and unconvincing", "https://i.imgflip.com/37nh0z.png"],
    [19890752, "Obi-Wan lightsaber", "https://i.imgflip.com/bubsw.jpg"],
    [202330453, "There is another", "https://i.imgflip.com/3cgn6d.jpg"],
    [11925933, "Older code, but it checks out", "https://i.imgflip.com/73m3x.jpg"],
    [39273090, "Escaping Millenium Falcon", "https://i.imgflip.com/ndrb6.jpg"],
    [67936974, "Wreched hive of scum and villany", "https://i.imgflip.com/14g4i6.jpg"],
    [29328726, "Luke and Han on Hoth", "https://i.imgflip.com/hgm6u.jpg"],
    [56425892, "Obi-Wan approves", "https://i.imgflip.com/xlehw.jpg"],
    [53412181, "I know", "https://i.imgflip.com/vst3p.jpg"],
    [88468304, "Move along", "https://i.imgflip.com/1go6kw.jpg"],
    [27854759, "I have altered the deal", "https://i.imgflip.com/gl0vb.jpg"],
    [148028936, "Obi-Wan and Vader fight", "https://i.imgflip.com/2g4ruw.jpg"],
    [15186919, "Medal ceremony", "https://i.imgflip.com/91iav.jpg"],
    [24662368, "Finn is lost", "https://i.imgflip.com/eolls.jpg"],
    [211624438, "Happy baby Yoda", "https://i.imgflip.com/3hzugm.jpg"],
  ];

  constructor() {}

  parseQuote(quote) {
    let captions = ["", ""];
    // sanitize input
    quote = quote.replaceAll("[", "");
    quote = quote.replaceAll("]", "");
    quote = quote.replaceAll('"', "");
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

    let end = false;
    let qi = 0;
    let ci = 0;
    let completed_sentences = 0;

    while (ci <= 1) {
      while (end == false) {
        captions[ci] += quote[qi];
        if (quote[qi] == "!" || quote[qi] == "?" || quote[qi] == ".") {
          completed_sentences++;
          if (completed_sentences >= sentence_count - completed_sentences || completed_sentences == sentence_count)
            end = true;
        }
        if (quote[qi] == " " || (quote[qi] == "-" && quote.length - qi < 3)) {
          completed_sentences++;
          if (completed_sentences >= sentence_count - completed_sentences || completed_sentences == sentence_count)
            end = true;
        } else {
          qi++;
        }
      }
      ci++;
      if (sentence_count == 1) ci++;
      end = false;
    }
    return captions;
  }

  randomMeme() {
    var temp = Math.floor(Math.random() * this.memeList.length);
    return this.memeList[temp];
  }

  allMemes() {
    return this.memeList;
  }
}

//added function for getting instance
module.exports.getInstance = function () {
  return new Memes();
};
