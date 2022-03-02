const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.planets = function(req, res, next) {
    fetch('https://www.swapi.tech/api/planets')
    .then(result => result.json())
    .then((output) => {
        var planetData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            planetData.push(output["results"][i]["name"])
        }
        res.render('lists', {
            image: false,
            title: 'Planets',
            data: planetData
        });
    })
    .catch(err => console.error(err));
};
