// Controls the vehicles data

const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

// Stores the vehicles API data
var vehiclesData = [];
var extraData = [];
var vehiclesNum = 15; //39;


exports.vehicles = function(req, res, next) {
    var promises = [];
    var uids = [4, 7, 6, 8, 14, 18, 16, 19, 20, 24, 25, 30, 26, 33, 34, 35,
        36, 37, 38, 42, 44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 60, 62, 69,
        70, 67, 71, 72, 73, 76];

    // Checks if data has  been collected already
    if (vehiclesData.length === 0) {
        console.log("IF");

        // Gets individual vehicle urls
        for (let j = 0; j < vehiclesNum; j++)
        {
            url = 'https://www.swapi.tech/api/vehicles/' + uids[j];
            promises.push(fetch(url).then(result => result.json()));
        }

        // Fetches API data
        Promise.all(promises).then((output) => {
            for (let i = 0; i < vehiclesNum; i++)
            {
                vehiclesData.push(output[i]["result"]["properties"]["name"]);
                
                extraData.push(["Model: " + output[i]["result"]["properties"]["model"],
                    "Starship Class: " + output[i]["result"]["properties"]["starship_class"],
                    "Manufacturer: " + output[i]["result"]["properties"]["manufacturer"],
                    "Cost in Credits: " + output[i]["result"]["properties"]["cost_in_credits"],
                    "Length: " + output[i]["result"]["properties"]["length"],
                    "Crew: " + output[i]["result"]["properties"]["crew"],
                    "Passenger(s): " + output[i]["result"]["properties"]["passengers"],
                    "Maximum Atmosphering Speed: " + output[i]["result"]["properties"]["max_atmosphering_speed"],
                    "Hyperdrive Rating: " + output[i]["result"]["properties"]["hyperdrive_rating"],
                    "MGLT: " + output[i]["result"]["properties"]["MGLT"],
                    "Cargo Capacity: " + output[i]["result"]["properties"]["cargo_capacity"],
                    "Consumables: " + output[i]["result"]["properties"]["consumables"],
                    "Pilot(s): " + output[i]["result"]["properties"]["pilots"]]);
            }

            // Sends data to pug view
            res.render('lists', {
                title: 'Vehicles',
                data: vehiclesData,
                extra: extraData
            });

        });
    }
    else {
        console.log("ELSE");
        // Sends data to pug view
        res.render('lists', {
            title: 'Vehicles',
            data: vehiclesData,
            extra: extraData
        });
    }
};
