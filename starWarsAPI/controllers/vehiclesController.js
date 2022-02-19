const { body,validationResult } = require('express-validator');

var async = require('async');

exports.index = function(req, res) {
    res.render('index');
};

exports.vehicles = function(req, res, next) {
    res.render('vehicles');
};
