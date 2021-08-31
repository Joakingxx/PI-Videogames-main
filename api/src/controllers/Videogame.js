const { Videogame } = require("../db.js");

const Modelo = require("./index");

const videogameControllers = new Modelo(Videogame);

module.exports = videogameControllers;
