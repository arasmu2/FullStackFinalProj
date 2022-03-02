const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.vehicles = function(req, res, next) {
    fetch('https://www.swapi.tech/api/vehicles')
    .then(result => result.json())
    .then((output) => {
        var vehicleData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            vehicleData.push(output["results"][i]["name"])
        }
        res.render('lists', {
            image: false,
            title: 'Vehicles',
            data: vehicleData
        });
    })
    .catch(err => console.error(err));
};
