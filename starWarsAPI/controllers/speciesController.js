const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');
var speciesData = [];
var extraData = [];

exports.species = function(req, res, next) {
    var promises = [];

    if (speciesData.length === 0) {
        for (let j = 1; j < 38; j++)
        {
            url = 'https://www.swapi.tech/api/species/' + j;
            promises.push(fetch(url).then(result => result.json()));
        }

        Promise.all(promises).then((output) => {
            for (let i = 0; i < 37; i++)
            {
                speciesData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Classification: " + output[i]["result"]["properties"]["classification"] + '\n',
                    "Designation: " + output[i]["result"]["properties"]["designation"] + '\n',
                    "Average Height: " + output[i]["result"]["properties"]["average_height"] + '\n',
                    "Average Lifespan: " + output[i]["result"]["properties"]["average_lifespan"] + '\n',
                    "Hair Color(s): " + output[i]["result"]["properties"]["hair_colors"] + '\n',
                    "Eye Color(s): " + output[i]["result"]["properties"]["eye_colors"] + '\n',
                    "Language: " + output[i]["result"]["properties"]["language"] + '\n']);
            }
            res.render('lists', {
                title: 'Species',
                data: speciesData,
                extra: extraData
            });
        });
    }
    else {
        res.render('lists', {
            title: 'Species',
            data: speciesData,
            extra: extraData
        });
    }
};
