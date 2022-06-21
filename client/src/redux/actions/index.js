import axios from "axios";


export function getAllVideogames() {
  return async function (dispatch) {
    let json = await axios("http://localhost:3001/videogames");
    return dispatch({
      type: "GET_ALL_VIDEOGAMES",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function () {
    var json = await axios.post(
      "http://localhost:3001/postVideogames",
      payload
    );
    return json;
  };
}

export function getDetailsVideogame(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get("http://localhost:3001/videogames/:id");
      return dispatch({
        type: "GET_DETAILS_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function getVideogamesByName(name) {
  return async function (dispatch) {
    try {
      var json = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_VIDEOGAMES_NAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}
