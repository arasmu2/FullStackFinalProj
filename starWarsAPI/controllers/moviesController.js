const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.movies = function(req, res, next) {
    fetch('https://www.swapi.tech/api/films')
    .then(result => result.json())
    .then((output) => {
        var movieData = [];
        for (let i = 0; i < output["result"].length; i++)
        {
            movieData.push(output["result"][i]["properties"]["title"])
        }
        res.render('lists', {
            image: false,
            title: 'Movies',
            data: movieData
        });
    })
    .catch(err => console.error(err));
};
