const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');
var vehiclesData = [];
var extraData = [];


exports.vehicles = function(req, res, next) {
    var promises = [];
    var uids = [4, 7, 6, 8, 14, 18, 16, 19, 20, 24, 25, 30, 26, 33, 34, 35,
        36, 37, 38, 42, 44, 45, 46, 50, 51, 53, 54, 55, 56, 57, 60, 62, 69,
        70, 67, 71, 72, 73, 76];

    if (vehiclesData.length === 0) {
        for (let j = 0; j < 39; j++)
        {
            url = 'https://www.swapi.tech/api/vehicles/' + uids[j];
            promises.push(fetch(url).then(result => result.json()));
        }

        Promise.all(promises).then((output) => {
            for (let i = 0; i < 39; i++)
            {
                vehiclesData.push(output[i]["result"]["properties"]["name"]);
                
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
                title: 'Vehicles',
                data: vehiclesData,
                extra: extraData
            });

        });
    }
    else {
        res.render('lists', {
            title: 'Vehicles',
            data: vehiclesData,
            extra: extraData
        });
    }
};
