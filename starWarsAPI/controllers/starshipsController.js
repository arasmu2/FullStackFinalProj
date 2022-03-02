const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.starships = function(req, res, next) {
    fetch('https://www.swapi.tech/api/starships')
    .then(result => result.json())
    .then((output) => {
        var starshipData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            starshipData.push(output["results"][i]["name"])
        }
        console.log(starshipData);
        res.render('lists', {
            title: 'Starships',
            data: starshipData
        });
    })
    .catch(err => console.error(err));
};
