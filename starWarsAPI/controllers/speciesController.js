const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.species = function(req, res, next) {
    var speciesData = [];
    var extraData = [];

    Promise.all([
        fetch('https://www.swapi.tech/api/species/1').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/2').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/3').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/4').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/5').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/6').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/7').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/8').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/9').then(result => result.json()),
        fetch('https://www.swapi.tech/api/species/10').then(result => result.json())
        ]).then((output) => {
            for (let i = 0; i < 10; i++)
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





};
