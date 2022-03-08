var express = require("express");
var router = express.Router();

// The page controllers needed
var index_controller = require("../controllers/indexController");
var movies_controller = require("../controllers/moviesController");
var people_controller = require("../controllers/peopleController");
var species_controller = require("../controllers/speciesController");
var starships_controller = require("../controllers/starshipsController");
var vehicles_controller = require("../controllers/vehiclesController");
var planets_controller = require("../controllers/planetsController");
var meme_controller = require("../controllers/memeController");
var meme_create_controller = require("../controllers/memeCreateController");

// The routes for each page controller
router.get("/", index_controller.index);
router.get("/movies", movies_controller.movies);
router.get("/people", people_controller.people);
router.get("/species", species_controller.species);
router.get("/starships", starships_controller.starships);
router.get("/vehicles", vehicles_controller.vehicles);
router.get("/planets", planets_controller.planets);
router.get("/meme", meme_controller.meme);
router.get("/memecreated", meme_create_controller.createMeme)

module.exports = router;
