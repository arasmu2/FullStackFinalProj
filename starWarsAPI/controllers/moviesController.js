const { body,validationResult } = require('express-validator');

var async = require('async');

exports.index = function(req, res) {
    res.render('index');
};

exports.movies = function(req, res, next) {
    res.render('lists', {
        title: 'Movies'
    });
};
