// Controls the movies API data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores the movie API data
var movieData = [];
var extraData = [];

exports.movies = function(req, res, next) {
    // Checks if movie API data  has already been collected
    if (movieData.length === 0) {
        // Fetches movie API data
        fetch('https://www.swapi.tech/api/films')
        .then(result => result.json())
        .then((output) => {
            for (let i = 0; i < output["result"].length; i++)
            {
                movieData.push(output["result"][i]["properties"]["title"]);
                extraData.push(["Producer(s): " + output["result"][i]["properties"]["producer"] + '\n',
                    "Director(s): " + output["result"][i]["properties"]["director"] + '\n',
                    "Release Date: " + output["result"][i]["properties"]["release_date"] + '\n',
                    "Opening Crawl: " + output["result"][i]["properties"]["opening_crawl"] + '\n']);
            }
            // Sends data to pug view
            res.render('lists', {
                title: 'Movies',
                data: movieData,
                extra: extraData
            });
        })
        .catch(err => console.error(err));
    }
    else {
        // Sends data to API view
        res.render('lists', {
            title: 'Movies',
            data: movieData,
            extra: extraData
        });
    }
};
