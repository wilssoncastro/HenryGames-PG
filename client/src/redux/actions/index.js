import axios from "axios";

export const GET_USER_BY_ID = 'GET_USER_BY_ID'


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
        var json = await axios.put(`http://localhost:3001/videogamesDev/${id}`, payload);
        return dispatch({
            type: "PUT_VIDEOGAME",
            payload: json.data
        })
    }
}

export function getWishList(id){
  return async function(dispatch){
    try {
      var json = await axios.get(`http://localhost:3001/wishlist/${id}`);
      return dispatch({
        type: "GET_WISH_LIST",
        payload: json.data    
      })
  } catch (error) {
      console.log("La concha de la lora")
    }
  }
}

export function addWishList(id, idGame){
    return async function(dispatch){
      var json = await axios.post(`http://localhost:3001/wishlist/add/${id}/${idGame}`);
      return dispatch({
        type: "ADD_WISH_LIST",
        payload: json.data
      }) 
    }
}

export function deleteWishList(id, idGame){
  return async function(dispatch){
    var json = await axios.delete(`http://localhost:3001/wishlist/delete/${id}/${idGame}`)
    return dispatch({
      type: "DELETE_WISH_LIST",
      payload: json.data
    })
  }
}

export function addToCart(payload){
  return {
    type: "ADD_TO_CART",
    payload
  }
}

export function delFromCart(id){
  return {
      type: "REMOVE_FROM_CART", 
      payload: id
    }
  }

export function clearCart(){
  return {
    type: "CLEAR_CART"
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

export function getUserById(id){
  return function(dispatch){
    return axios.post(`http://localhost:3001/users?id=${id}`)
    .then(data => {
      dispatch({
        type: GET_USER_BY_ID,
        payload: data
      })
    })
  }
}

export function getArticles() {
  return async function (dispatch) {
    var json = await axios.get("http://localhost:3001/blog");
    console.log("act", json)
    return dispatch({
      type: "GET_ARTICLES",
      payload: json,
      
    });
  };
}