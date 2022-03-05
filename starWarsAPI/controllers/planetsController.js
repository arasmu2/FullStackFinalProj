const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.planets = function(req, res, next) {
    var planetData = [];
    var extraData = [];
    var promises = [];

    for (let j = 1; j < 61; j++)
    {
        url = 'https://www.swapi.tech/api/planets/' + j;
        promises.push(fetch(url).then(result => result.json()));
    }

    Promise.all(promises).then((output) => {
        for (let i = 0; i < 60; i++)
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
        res.render('lists', {
            title: 'Planets',
            data: planetData,
            extra: extraData
        });
    });
};
