const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.people = function(req, res, next) {
    fetch('https://raw.githubusercontent.com/akabab/starwars-api/0.2.1/api/all.json')
    .then(result => result.json())
    .then((output) => {
        var peopleData = [];
        for (let i = 0; i < output.length; i++)
        {
            peopleData.push([output[i]["name"], output[i]["image"]])
        }
        console.log(peopleData);
        res.render('lists', {
            title: 'Characters',
            data: peopleData
        });
    })
    .catch(err => console.error(err));
};
