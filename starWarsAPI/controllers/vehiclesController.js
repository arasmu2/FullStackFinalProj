const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.vehicles = function(req, res, next) {
    fetch('https://www.swapi.tech/api/vehicles')
    .then(result => result.json())
    .then((output) => {
        var vehicleData = [];
        var extraData = [];
        for (let i = 0; i < output["results"].length; i++)
        {
            vehicleData.push(output["results"][i]["name"])

            fetch(output["results"][i]["url"].toLocaleString("en-US"))
            .then(result => result.json())
            .then((output2) => {
                extraData.push(["Model: " + output2["result"]["properties"]["model"] + '\n',
                    "Vehicle Class: " + output2["result"]["properties"]["vehicle_class"] + '\n',
                    "Manufacturer: " + output2["result"]["properties"]["manufacturer"] + '\n',
                    "Cost in Credits: " + output2["result"]["properties"]["cost_in_credits"] + '\n',
                    "Length: " + output2["result"]["properties"]["length"] + '\n',
                    "Crew: " + output2["result"]["properties"]["crew"] + '\n',
                    "Passenger(s): " + output2["result"]["properties"]["passengers"] + '\n',
                    "Maximum Atmosphering Speed: " + output2["result"]["properties"]["max_atmosphering_speed"] + '\n',
                    "Cargo Capacity: " + output2["result"]["properties"]["cargo_capacity"] + '\n',
                    "Consumables: " + output2["result"]["properties"]["consumables"] + '\n',
                    "Film(s): " + output2["result"]["properties"]["films"] + '\n',
                    "Pilot(s): " + output2["result"]["properties"]["pilots"] + '\n']);
            });
        }
        console.log(vehicleData);
        res.render('lists', {
            title: 'Vehicles',
            data: vehicleData,
            extra: extraData
        });
    })
    .catch(err => console.error(err));
};
