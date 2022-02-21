const { body,validationResult } = require('express-validator');

var async = require('async');

exports.index = function(req, res) {
    res.render('index');
};

exports.planets = function(req, res, next) {
    res.render('planets');
};
