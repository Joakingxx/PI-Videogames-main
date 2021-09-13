import axios from "axios";
import { VIDEOGAMES_URL } from "../constants";
import {
  GET_VIDEOGAMES,
  SORT_VIDEOGAMES,
  SEARCH_VIDEOGAMES,
} from "./constants";

export function getVideogames() {
  return function (dispatch) {
    return axios
      .get(VIDEOGAMES_URL)
      .then((videogames) => {
        dispatch({
          type: GET_VIDEOGAMES,
          payload: videogames.data,
        });
      })
      .catch((error) => {
        return { msg: error };
      });
  };
}
export function sortVideogames(name) {
  return function (dispatch) {
    return dispatch({
      type: SORT_VIDEOGAMES,
      payload: name,
    });
  };
}
export function searchVideogames(search) {
  return function (dispatch) {
    return axios
      .get(VIDEOGAMES_URL + `?name=${search}`)
      .then((videogames) => {
        dispatch({
          type: SEARCH_VIDEOGAMES,
          payload: videogames.data,
        });
      })
      .catch((error) => {
        return { msg: error };
      });
  };
}
