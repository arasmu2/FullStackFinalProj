const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');
var starshipsData = [];
var extraData = [];

exports.starships = function(req, res, next) {
    var promises = [];
    var uids = [2,3, 5, 9, 11, 10, 13, 15, 12, 17, 21, 22, 23, 28, 27, 29, 31, 32,
        39, 40, 43, 41, 47, 48, 52, 49, 59, 58, 61, 63, 64, 65, 66, 68, 74, 75];

    if (starshipsData.length === 0) {
        for (let j = 0; j < 36; j++)
        {
            url = 'https://www.swapi.tech/api/starships/' + uids[j];
            promises.push(fetch(url).then(result => result.json()));
        }

        Promise.all(promises).then((output) => {
            for (let i = 0; i < 36; i++)
            {
                starshipsData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Model: " + output[i]["result"]["properties"]["model"] + '\n',
                    "Starship Class: " + output[i]["result"]["properties"]["starship_class"] + '\n',
                    "Manufacturer: " + output[i]["result"]["properties"]["manufacturer"] + '\n',
                    "Cost in Credits: " + output[i]["result"]["properties"]["cost_in_credits"] + '\n',
                    "Length: " + output[i]["result"]["properties"]["length"] + '\n',
                    "Crew: " + output[i]["result"]["properties"]["crew"] + '\n',
                    "Passenger(s): " + output[i]["result"]["properties"]["passengers"] + '\n',
                    "Maximum Atmosphering Speed: " + output[i]["result"]["properties"]["max_atmosphering_speed"] + '\n',
                    "Hyperdrive Rating: " + output[i]["result"]["properties"]["hyperdrive_rating"] + '\n',
                    "MGLT: " + output[i]["result"]["properties"]["MGLT"] + '\n',
                    "Cargo Capacity: " + output[i]["result"]["properties"]["cargo_capacity"] + '\n',
                    "Consumables: " + output[i]["result"]["properties"]["consumables"] + '\n',
                    "Pilot(s): " + output[i]["result"]["properties"]["pilots"] + '\n']);
            }
            res.render('lists', {
                title: 'Starships',
                data: starshipsData,
                extra: extraData
            });
        });
    }
    else {
        res.render('lists', {
            title: 'Starships',
            data: starshipsData,
            extra: extraData
        });
    }
};
