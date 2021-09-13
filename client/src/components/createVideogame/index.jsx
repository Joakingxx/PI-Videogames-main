import React, { useEffect, useState } from "react";
import axios from "axios";
import { GENRES_URL, VIDEOGAMES_URL } from "../../constants";

export default function CreateVideogame() {
  const [videogame, setVideogame] = useState({
    name: "",
    description: "",
    background_image: "",
    plataforms: [],
    released: "",
    rating: 0,
    genres: [],
  });
  const [genres, setGenres] = useState([]);

  function getGenres() {
    axios.get(GENRES_URL).then((response) => {
      setGenres(response.data);
    });
  }

  const [plataforms] = useState([
    "PlayStation 3",
    "Xbox 360",
    "Xbox Series S/X",
    "Nintendo Switch",
    "PlayStation 5",
    "Xbox One",
    "PC",
    "PlayStation 4",
  ]);

  useEffect(() => {
    getGenres();
  }, []);

  function onInputChange(e) {
    setVideogame((prevState) => {
      return {
        ...prevState,

        [e.target.name]: e.target.value,
      };
    });
  }

  function addGenres(e, id) {
    e.preventDefault();
    let check = videogame.genres.includes(id);
    if (check) {
      let filter = videogame.genres.filter((genre) => genre !== id);
      setVideogame(() => {
        return {
          ...videogame,
          genres: filter,
        };
      });
    } else {
      setVideogame(() => {
        return {
          ...videogame,
          genres: [...videogame.genres, id],
        };
      });
    }
  }

  function addPlatforms(e) {
    e.preventDefault();
    let check = videogame.plataforms.includes(e.target.name);
    if (check) {
      let filter = videogame.plataforms.filter(
        (plata) => plata !== e.target.name
      );
      setVideogame(() => {
        return {
          ...videogame,
          plataforms: filter,
        };
      });
    } else {
      setVideogame(() => {
        return {
          ...videogame,
          plataforms: [...videogame.plataforms, e.target.name],
        };
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (videogame.genres.length === 0) {
      return alert("Missing genres");
    }
    if (videogame.plataforms.length === 0) {
      return alert("Missing platforms");
    }
    await axios.post(VIDEOGAMES_URL, videogame);
    alert("Se Agrego");
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input name="name" type="text" onChange={onInputChange} required />
        </div>
        <div>
          <label>Description:</label>
          <input
            name="description"
            type="text"
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          <label>Image:</label>
          <input
            name="background_image"
            type="text"
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          {plataforms.map((plat) => {
            return (
              <div key={plat}>
                <button name={plat} onClick={(e) => addPlatforms(e)}>
                  {plat}
                </button>
              </div>
            );
          })}
        </div>
        <div>
          <label>rating:</label>
          <input
            name="rating"
            type="number"
            min="0"
            max="5"
            onChange={onInputChange}
            required
            step=".1"
          />
        </div>
        <div>
          <label>Released:</label>
          <input
            name="released"
            type="date"
            onChange={onInputChange}
            required
          />
        </div>
        <div>
          {genres.map((genre) => {
            return (
              <div key={genre.id}>
                <button
                  value={genre.id}
                  name={genre.name}
                  onClick={(e) => addGenres(e, genre.id)}
                >
                  {genre.name}
                </button>
              </div>
            );
          })}
        </div>
        <input type="submit" value="Create Game" />
      </form>
    </div>
  );
}
