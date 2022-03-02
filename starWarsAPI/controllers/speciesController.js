const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.species = function(req, res, next) {
    fetch('https://www.swapi.tech/api/species')
    .then(result => result.json())
    .then((output) => {
        var speciesData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            speciesData.push(output["results"][i]["name"])
        }
        console.log(speciesData);
        res.render('lists', {
            title: 'Species',
            data: speciesData
        });
    })
    .catch(err => console.error(err));
};
