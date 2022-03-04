const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.planets = function(req, res, next) {
    var planetData = [];
    var extraData = [];

    Promise.all([
        fetch('https://www.swapi.tech/api/planets/1').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/2').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/3').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/4').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/5').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/6').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/7').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/8').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/9').then(result => result.json()),
        fetch('https://www.swapi.tech/api/planets/10').then(result => result.json())
        ]).then((output) => {
            for (let i = 0; i < 10; i++)
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
