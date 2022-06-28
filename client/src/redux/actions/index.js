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

export function getFilteredVideogames(name, page, sort, order, limit) {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames?name=${name}&page=${page}&sort=${sort}&order=${order}&limit=${limit}`);
    return dispatch({
      type: "GET_FILTERED_VIDEOGAMES",
      payload: json.data
    });
  };
}

export function getGenres() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/genres");
    return dispatch({
      type: "GET_GENRES",
      payload: json.data,
    });
  };
}

export function getEsrb() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/esrb");
    return dispatch({
      type: "GET_ESRB",
      payload: json.data,
    });
  };
}

export function postVideogame(payload) {
  return async function () {
    var json = await axios.post("http://localhost:3001/videogamesDev",payload);
    return json;
  };
}

export function getDetailsVideogame(id) {
  return async function (dispatch) {
    try {
      var json = await axios.get(`http://localhost:3001/videogames/${id}`);
      return dispatch({
        type: "GET_DETAILS_VIDEOGAME",
        payload: json.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

export function deleteVideogame(id){
    return async function(dispatch){
        var json = await axios.delete(`http://localhost:3001/videogamesDev/${id}`);
        return dispatch({
            type: "DELETE_VIDEOGAME",
            payload: json.data
        });
    }
}

export function putVideogame(id, payload){
    return async function(dispatch){
        var json = await axios.put(`http://localhost:3001/videogames/${id}`, payload);
        return dispatch({
            type: "PUT_VIDEOGAME",
            payload: json.data
        })
    }
}

export function addWishList(payload){
    return {
        type: "ADD_WISH_LIST",
        payload
    }
}

export function deleteFavorite(payload){
    return {
        type: "DELETE_WISH_LIST",
        payload
    }
}

export function getCardStatistics(name){
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type: "GET_CARD_STATISTICS",
      payload: json.data
    });
  };
}

