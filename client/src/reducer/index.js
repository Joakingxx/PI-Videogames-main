import {
  GET_VIDEOGAMES,
  SEARCH_VIDEOGAMES,
  SORT_VIDEOGAMES,
} from "../actions/constants";

var initialState = {
  videogames: [],
  aux: [],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_VIDEOGAMES:
      return {
        ...state,
        videogames: action.payload,
        aux: action.payload,
      };
    case SEARCH_VIDEOGAMES:
      if (action.payload === "") {
        return { ...state, videogames: state.aux };
      } else {
        return {
          ...state,
          videogames: action.payload,
        };
      }
    case SORT_VIDEOGAMES:
      let videogames = state.aux;

      if (action.payload === "All") {
        return {
          ...state,
          videogames: videogames,
        };
      }
      if (action.payload === "Created") {
        let aux = videogames.filter((e) => {
          return typeof e.id === "string";
        });
        return {
          ...state,
          videogames: aux,
        };
      }
      if (action.payload === "Existing") {
        let aux = videogames.filter((e) => {
          return typeof e.id === "number";
        });

        return {
          ...state,
          videogames: aux,
        };
      }

      let aux = videogames.filter((videogame) => {
        let checkGenre = videogame.genres.map((e) => e.name);
        return checkGenre.includes(action.payload);
      });

      return {
        ...state,
        videogames: aux,
      };
    default:
      return state;
  }
}

export default reducer;
