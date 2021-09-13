import React, { useEffect, useState } from "react";
import axios from "axios";
import { VIDEOGAMES_URL } from "../../constants";
import { useParams } from "react-router-dom";
import estilos from "./videogameDetails.module.css";

export default function VideogameDetails() {
  const [videogame, setVideogame] = useState({
    id: "",
    name: "",
    rating: "",
    description: "",
    released: "",
    background_image: "",
    plataforms: "",
    genres: "",
  });

  const { id } = useParams();

  function getVideogameById(id) {
    axios.get(VIDEOGAMES_URL + "/" + id).then((videogame) => {
      setVideogame({
        id: videogame.data.id,
        name: videogame.data.name,
        rating: videogame.data.rating,
        description: videogame.data.description,
        released: videogame.data.released,
        background_image: videogame.data.background_image,
        plataforms: videogame.data.plataforms.map((e) => `${e} `),
        genres: videogame.data.genres.map((e) => `${e.name} `),
      });
    });
  }

  useEffect(() => {
    getVideogameById(id);
  }, [id]);

  return (
    <div className={estilos.content} key={videogame.id}>
      <div className={estilos.name}>{videogame.name}</div>
      <div className={estilos.rating}>Rating {videogame.rating}</div>
      <div
        className={estilos.description}
        dangerouslySetInnerHTML={{ __html: videogame.description }}
      ></div>
      <div className={estilos.released}>released: {videogame.released}</div>
      <div className={estilos.plataforms}>
        platforms: {videogame.plataforms}
      </div>
      <div className={estilos.genres}>genres: {videogame.genres}</div>
      <img
        className={estilos.img}
        src={videogame.background_image}
        alt={videogame.name}
      />{" "}
    </div>
  );
}
