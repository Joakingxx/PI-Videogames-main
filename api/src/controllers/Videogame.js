const { Videogame, Genre } = require("../db.js");
const Modelo = require("./index");
const axios = require("axios");
const { VIDEOGAMES_URL } = require("../constants");
const { v4: uuidv4 } = require("uuid");
const { response } = require("express");

const APIKEY = "key=845cd0566a3847529025a6368a1e98a1";

class VideogameModel extends Modelo {
  constructor(model) {
    super(model);
  }
  getAll = (req, res, next) => {
    const { name } = req.query;
    if (name) {
      const videogames = axios.get("http://localhost:3001/api/videogames/");
      videogames
        .then((response) => {
          const games = response.data;
          const gamesFilt = games.filter((game) =>
            game.name.toLowerCase().includes(name.toLowerCase())
          );

          res.send(gamesFilt.slice(0, 15));
        })
        .catch((error) => next(error));
    } else {
      const myVideogames = this.model.findAll({
        include: { model: Genre },
      });

      const api1 = axios.get(VIDEOGAMES_URL + "&page_size=40&page=1");
      const api2 = axios.get(VIDEOGAMES_URL + "&page_size=40&page=2");
      const api3 = axios.get(VIDEOGAMES_URL + "&page_size=40&page=3");

      Promise.all([myVideogames, api1, api2, api3])
        .then((results) => {
          const [
            myVideogamesResults,
            apiVideogamesResults,
            apiVideogames2Results,
            apiVideogames3Results,
          ] = results;
          const response = myVideogamesResults.concat(
            apiVideogamesResults.data.results.concat(
              apiVideogames2Results.data.results.concat(
                apiVideogames3Results.data.results
              )
            )
          );
          response.sort((a, b) => {
            if (a.name.toLowerCase() > b.name.toLowerCase()) {
              return 1;
            } else {
              return -1;
            }
          });
          res.send(response);
        })
        .catch((error) => next(error));
    }
  };

  getByID = (req, res, next) => {
    const { id } = req.params;
    if (id.length < 17) {
      const videogame = axios.get(
        `https://api.rawg.io/api/games/${id}?${APIKEY}`
      );
      videogame
        .then((game1) => {
          const game = game1.data;
          const gameFinal = {
            id: game.id,
            name: game.name,
            rating: game.rating,
            description: game.description,
            background_image: game.background_image,
            plataforms: game.platforms.map((e) => {
              return e.platform.name;
            }),
            released: game.released,
            genres: game.genres.map((e) => {
              return { name: e.name };
            }),
          };

          res.send(gameFinal);
        })
        .catch((error) => next(error));
    } else {
      this.model
        .findByPk(id, { include: { model: Genre } })
        .then((result) => res.send(result))
        .catch((error) => next(error));
    }
  };

  create = (req, res, next) => {
    const {
      name,
      released,
      rating,
      plataforms,
      background_image,
      description,
      genres,
    } = req.body;
    this.model
      .create({
        id: uuidv4(),
        name,
        released,
        rating,
        plataforms,
        background_image,
        description,
      })
      .then((createdVideogame) => {
        createdVideogame.setGenres(genres);
      })
      .then((videogameWithGenres) => {
        res.send(videogameWithGenres);
      })
      .catch((error) => next(error));
  };
}

const videogameControllers = new VideogameModel(Videogame);

module.exports = videogameControllers;
