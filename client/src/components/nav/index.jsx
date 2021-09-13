import React from "react";
import { Link } from "react-router-dom";
import estilo from "./nav.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
export default function Nav() {
  return (
    <div className={estilo.navContent}>
      <Link to="/home/videogame">
        <FontAwesomeIcon className={estilo.icon} icon={faGamepad} />
      </Link>
      <h1 className={estilo.neon}>Videogames</h1>

      <Link to="/home/createvideogame">
        <label className={estilo.btnCreate}>Create Game</label>
      </Link>
    </div>
  );
}
