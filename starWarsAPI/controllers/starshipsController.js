// Controls starships API data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores starships API data
var starshipsData = [];
var extraData = [];
var starshipsNum = 15; // 36;

exports.starships = function(req, res, next) {
    var promises = [];
    var uids = [2,3, 5, 9, 11, 10, 13, 15, 12, 17, 21, 22, 23, 28, 27, 29, 31, 32,
        39, 40, 43, 41, 47, 48, 52, 49, 59, 58, 61, 63, 64, 65, 66, 68, 74, 75];

    // Checks if API data has been collected
    if (starshipsData.length === 0) {

        // Gets the individual starship API urls
        for (let j = 0; j < starshipsNum; j++)
        {
            url = 'https://www.swapi.tech/api/starships/' + uids[j];
            promises.push(fetch(url).then(result => result.json()));
        }

        // Fetches the data from the API
        Promise.all(promises).then((output) => {
            for (let i = 0; i < starshipsNum; i++)
            {
                starshipsData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Model: " + output[i]["result"]["properties"]["model"],
                    "Starship Class: " + output[i]["result"]["properties"]["starship_class"],
                    "Manufacturer: " + output[i]["result"]["properties"]["manufacturer"],
                    "Cost in Credits: " + output[i]["result"]["properties"]["cost_in_credits"],
                    "Length: " + output[i]["result"]["properties"]["length"],
                    "Crew: " + output[i]["result"]["properties"]["crew"],
                    "Passenger(s): " + output[i]["result"]["properties"]["passengers"],
                    "Maximum Atmosphering Speed: " + output[i]["result"]["properties"]["max_atmosphering_speed"] + '\n',
                    "Hyperdrive Rating: " + output[i]["result"]["properties"]["hyperdrive_rating"],
                    "MGLT: " + output[i]["result"]["properties"]["MGLT"],
                    "Cargo Capacity: " + output[i]["result"]["properties"]["cargo_capacity"],
                    "Consumables: " + output[i]["result"]["properties"]["consumables"],
                    "Pilot(s): " + output[i]["result"]["properties"]["pilots"]]);
            }

            // Sends data to pug view
            res.render('lists', {
                title: 'Starships',
                data: starshipsData,
                extra: extraData
            });
        });
    }
    else {
        // Sends data to pug view
        res.render('lists', {
            title: 'Starships',
            data: starshipsData,
            extra: extraData
        });
    }
};
