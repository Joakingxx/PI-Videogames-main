const { Genre, Videogame } = require("../db.js");
const Modelo = require("./index");
const axios = require("axios");
const { GENRES_URL } = require("../constants");

class GenreModel extends Modelo {
  constructor(model) {
    super(model);
  }

  getAll = (req, res, next) => {
    const myGenre = this.model.findAll({
      include: { model: Videogame },
    });
    myGenre
      .then((results) => {
        res.send(results);
      })
      .catch((error) => next(error));
  };
}

const genreControllers = new GenreModel(Genre);

module.exports = genreControllers;
