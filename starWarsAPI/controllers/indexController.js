const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const https = require('https');
const httpsAgent = new https.Agent({
  rejectUnauthorized: false
});

var async = require('async');

exports.index = function(req, res, next) {
    var memeData = [];
    fetch('https://swquotesapi.digitaljedi.dk/api/SWQuote/RandomStarWarsQuote', {agent: httpsAgent})
    .then(result => result.json())
    .then((output) => {
        memeData.push(output["content"]);
        fetch('https://api.imgflip.com/get_memes')
        .then(result => result.json())
        .then((output) => {
            var random = Math.floor(Math.random() * (output["data"]["memes"].length - 1));
            memeData.push(output["data"]["memes"][random]["url"]);
            res.render('lists', {
                title: 'Index',
                data: memeData
            });
        })
        .catch(err => console.error(err));
    })
    .catch(err => console.error(err));
};