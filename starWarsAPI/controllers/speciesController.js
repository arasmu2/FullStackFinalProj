const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.species = function(req, res, next) {
    fetch('https://www.swapi.tech/api/species')
    .then(result => result.json())
    .then((output) => {
        var speciesData = [];
        var extraData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            speciesData.push(output["results"][i]["name"])
            
            fetch(output["results"][i]["url"].toLocaleString("en-US"))
            .then(result => result.json())
            .then((output2) => {
                extraData.push(["Classification: " + output2["result"]["properties"]["classification"] + '\n',
                    "Designation: " + output2["result"]["properties"]["designation"] + '\n',
                    "Average Height: " + output2["result"]["properties"]["average_height"] + '\n',
                    "Average Lifespan: " + output2["result"]["properties"]["average_lifespan"] + '\n',
                    "Hair Color(s): " + output2["result"]["properties"]["hair_colors"] + '\n',
                    "Eye Color(s): " + output2["result"]["properties"]["eye_colors"] + '\n',
                    "Language: " + output2["result"]["properties"]["language"] + '\n']);
            });
        }

        res.render('lists', {
            title: 'Species',
            data: speciesData,
            extra: extraData
        });
    })
    .catch(err => console.error(err));
};
