//  Controls the species API data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores the species API data
var speciesData = [];
var extraData = [];
var speciesNum = 15; // 37;

exports.species = function(req, res, next) {
    var promises = [];

    // Checks if API data has been collected already
    if (speciesData.length === 0) {

        // Collects the individual API urls
        for (let j = 1; j < speciesNum + 1; j++)
        {
            url = 'https://www.swapi.tech/api/species/' + j;
            promises.push(fetch(url).then(result => result.json()));
        }

        // Fetches data from the API
        Promise.all(promises).then((output) => {
            for (let i = 0; i < speciesNum; i++)
            {
                speciesData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Classification: " + output[i]["result"]["properties"]["classification"],
                    "Designation: " + output[i]["result"]["properties"]["designation"],
                    "Average Height: " + output[i]["result"]["properties"]["average_height"],
                    "Average Lifespan: " + output[i]["result"]["properties"]["average_lifespan"],
                    "Hair Color(s): " + output[i]["result"]["properties"]["hair_colors"],
                    "Eye Color(s): " + output[i]["result"]["properties"]["eye_colors"],
                    "Language: " + output[i]["result"]["properties"]["language"]]);
            }

            // Sends data to pug view
            res.render('lists', {
                title: 'Species',
                data: speciesData,
                extra: extraData
            });
        });
    }
    else {

        // Sends data to pug view
        res.render('lists', {
            title: 'Species',
            data: speciesData,
            extra: extraData
        });
    }
};
