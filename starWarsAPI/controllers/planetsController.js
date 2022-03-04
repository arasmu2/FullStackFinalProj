const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.planets = function(req, res, next) {
    fetch('https://www.swapi.tech/api/planets')
    .then(result => result.json())
    .then((output) => {
        var planetData = [];
        var extraData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            planetData.push(output["results"][i]["name"]);
            
            fetch(output["results"][i]["url"].toLocaleString("en-US"))
            .then(result => result.json())
            .then((output2) => {
                extraData.push(["Diameter: " + output2["result"]["properties"]["diameter"] + '\n',
                    "Rotation Period: " + output2["result"]["properties"]["rotation_period"] + '\n',
                    "Orbital Period: " + output2["result"]["properties"]["orbital_period"] + '\n',
                    "Gravity: " + output2["result"]["properties"]["gravity"] + '\n',
                    "Population: " + output2["result"]["properties"]["population"] + '\n',
                    "Climate(s): " + output2["result"]["properties"]["climate"] + '\n',
                    "Terrain(s): " + output2["result"]["properties"]["terrain"] + '\n',
                    "Surface Water: " + output2["result"]["properties"]["surface_water"] + '\n']);
            });
        }
        console.log(planetData);
        res.render('lists', {
            title: 'Planets',
            data: planetData,
            extra: extraData
        });
    })
    .catch(err => console.error(err));
};
