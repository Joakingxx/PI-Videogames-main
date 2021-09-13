import React from "react";
import estilos from "./videogame.module.css";

export default function Videogame({ name, background_image, genres }) {
  return (
    <div className={estilos.content}>
      <div className={estilos.card}>
        <div>
          <label>{name}</label>
        </div>
        <div>
          <img className={estilos.img} src={background_image} alt={name} />
        </div>
        <div>
          <label className={estilos.genres}>
            {genres.map((e) => {
              return `${e.name} `;
            })}
          </label>
        </div>
      </div>
    </div>
  );
}
