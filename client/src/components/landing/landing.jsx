import React from "react";
import estilo from "./landing.module.css";
import { Link } from "react-router-dom";

export default function Landing({ name, background_image, genres }) {
  return (
    <div className={estilo.content}>
      <Link to="/home/videogame">
        <label className={estilo.btnneon}>START</label>
      </Link>
    </div>
  );
}
