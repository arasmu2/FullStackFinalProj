// Controls the people API data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores the people  API data
var peopleData = [];
var extraData = [];

exports.people = function(req, res, next) {
    // Checks if API data has already been collected
    if (peopleData.length === 0) {
        // Fetches API data
        fetch('https://raw.githubusercontent.com/akabab/starwars-api/0.2.1/api/all.json')
        .then(result => result.json())
        .then((output) => {
            for (let i = 0; i < output.length; i++)
            {
                peopleData.push([output[i]["name"], output[i]["image"]]);
                extraData.push(["Height: " + output[i]["height"] + '\n',
                    "Homeworld: " + output[i]["homeworld"] + '\n',
                    "Born: " + output[i]["born"] + '\n',
                    "Birth Location: " + output[i]["bornLocation"] + '\n',
                    "Died: " + output[i]["died"] + '\n',
                    "Hair Color: " + output[i]["hairColor"] + '\n',
                    "Eye Color: " + output[i]["eyeColor"] + '\n',
                    "Master(s): " + output[i]["masters"] + '\n',
                    "Apprentice(s): " + output[i]["apprentices"] + '\n']);
            }
            // Sends data to pug view
            res.render('lists', {
                title: 'Characters',
                data: peopleData,
                extra: extraData
            });
        })
        .catch(err => console.error(err));
    }
    else  {
        // Sends data to  pug view
        res.render('lists', {
            title: 'Characters',
            data: peopleData,
            extra: extraData
        });
    }
};
