// Controls the planets API data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores data to reduce API calls
var planetData = [];
var extraData = [];
var planetsNum  =  12; // 60;

exports.planets = function(req, res, next) {
    var promises = [];

    // Checks if data has already been collected
    if (planetData.length === 0) {
        // Gets the individual 
        for (let j = 1; j < planetsNum + 1; j++)
        {
            url = 'https://www.swapi.tech/api/planets/' + j;
            promises.push(fetch(url).then(result => result.json()));
        }

        // Fetches data from API 
        Promise.all(promises).then((output) => {
            for (let i = 0; i < planetsNum; i++)
            {
                planetData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Diameter: " + output[i]["result"]["properties"]["diameter"] + '\n',
                    "Rotation Period: " + output[i]["result"]["properties"]["rotation_period"] + '\n',
                    "Orbital Period: " + output[i]["result"]["properties"]["orbital_period"] + '\n',
                    "Gravity: " + output[i]["result"]["properties"]["gravity"] + '\n',
                    "Population: " + output[i]["result"]["properties"]["population"] + '\n',
                    "Climate(s): " + output[i]["result"]["properties"]["climate"] + '\n',
                    "Terrain(s): " + output[i]["result"]["properties"]["terrain"] + '\n',
                    "Surface Water: " + output[i]["result"]["properties"]["surface_water"] + '\n']);
            }

            // Sends data to pug view
            res.render('lists', {
                title: 'Planets',
                data: planetData,
                extra: extraData
            });
        });
    }
    else {
        //  Sends data to pug view
        res.render('lists', {
            title: 'Planets',
            data: planetData,
            extra: extraData
        });
    }
};
