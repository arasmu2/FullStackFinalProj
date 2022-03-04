const { body,validationResult } = require('express-validator');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

var async = require('async');

exports.starships = function(req, res, next) {
    var starshipsData = [];
    var extraData = [];

    Promise.all([
        fetch('https://www.swapi.tech/api/starships/1').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/2').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/3').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/4').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/5').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/6').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/7').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/8').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/9').then(result => result.json()),
        fetch('https://www.swapi.tech/api/starships/10').then(result => result.json())
        ]).then((output) => {
            for (let i = 0; i < 10; i++)
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
                title: 'Species',
                data: starshipsData,
                extra: extraData
            });

    });
};
