import axios from "axios";

export const GET_USER_BY_ID = 'GET_USER_BY_ID'
export const ADD_TO_CART = 'ADD_TO_CART'
export const DELETE_FROM_CART = 'DELETE_FROM_CART'
export const DELETE_ALL_FROM_CART = 'DELETE_ALL_FROM_CART'
export const ADD_MANY_TO_CART = 'ADD_MANY_CART'
export const GET_CART_BY_ID = 'GET_CART_BY_ID'
export const GET_COMMENTS_BY_GAME = 'GET_COMMENTS_BY_GAME'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'
export const POST_COMMENT = 'POST_COMMENT'
export const REPORT_COMMENT = 'REPORT_COMMENT'
export const IS_ONLINE = 'IS_ONLINE'
export const INFO_COMMENT = 'INFO_COMMENT'

export function is_authorizated(){
  return async function(dispatch){
    return axios.get(`http://localhost:3001/is_online`)
    .then(data => {
      dispatch({
        type: IS_ONLINE,
        payload: data
      })
    })
  }
}

export function getAllVideogames() {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames`);
    return dispatch({
      type: "GET_ALL_VIDEOGAMES",
      payload: json.data,
    });
  };
}


export function getFilteredVideogames(name, gen, tag, esrb, page, sort, order, limit) {
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames?name=${name}&gen=${gen}&tag=${tag}&esrb=${esrb}&page=${page}&sort=${sort}&order=${order}&limit=${limit}`);
    return dispatch({
      type: "GET_FILTERED_VIDEOGAMES",
      payload: json.data
    });
  };
}

export function filterVideogamesByGenre(payload, name, tag, esrb, page, sort, order, limit) {
  //return async function (dispatch) {
    //let json = await axios(`http://localhost:3001/videogames?name=${name}&tag=${tag}&esrb=${esrb}&page=${page}&sort=${sort}&order=${order}&limit=${limit}`);
    return ({
      type: "FILTER_BY_GENRE",
      payload,
    });
  //}
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

// ACTIONS DEL CART
// 
// 

export function getCartById(id_user){
  return function(dispatch){
    return axios.get(`http://localhost:3001/cart/${id_user}`)
    .then(data => {
      dispatch({
        type: GET_CART_BY_ID,
        payload: data
      })
    })
  }
}

export function addToCart(id, id_game){
  return function(dispatch){
    return axios.post(`http://localhost:3001/cart/add/${id}/${id_game}`)
    .then(data => {
      dispatch({
        type: ADD_TO_CART,
        payload: data
      })
    })
  }
}

export function delFromCart(id, id_game){
  return function(dispatch){
    return axios.delete(`http://localhost:3001/cart/delete/${id}/${id_game}`)
    .then(data => {
      dispatch({
        type: DELETE_FROM_CART,
        payload: data
      })
    })
  }
  }

export function deleteAllFromCart(id_user, games){
  return function(dispatch){
    return axios.post(`http://localhost:3001/cart/deleteToMany/${id_user}`, games)
    .then(data => {
      dispatch({
        type: DELETE_ALL_FROM_CART
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

export function addManyToCart(id_user, games){
  return function(dispatch){
    return axios.post(`http://localhost:3001/cart/addToMany/${id_user}`, games)
    .then(data => {
      dispatch({
        type: ADD_MANY_TO_CART
      })
    })
  }
}


// ----------------------------------------------------------------
// ----------------------------------------------------------------  


export function getCardStatistics(name){
  return async function (dispatch) {
    let json = await axios(`http://localhost:3001/videogames?name=${name}`);
    return dispatch({
      type: "GET_CARD_STATISTICS",
      payload: json.data
    });
  };
}

export function postMercadoPago(carrito){
  return async function(dispatch){
    var json = await axios.post("http://localhost:3001/mercadopago",carrito);
    return json;
  }
}

export function getUserById(id){
  if(id){
    return async function(dispatch){
    var json = await axios.get(`http://localhost:3001/users?id=${id}`)
    return dispatch({
        type: "GET_USER_BY_ID",
        payload: json.data
      })
    
  }}else{
    return function(dispatch){
      var json = []
      return dispatch({
          type: "GET_USER_BY_ID",
          payload: json
        })
  }
   
}
}

export function getAllUsers(){
  return async function(dispatch){
   let json = await axios.get("http://localhost:3001/users")
      dispatch({
        type: "GET_ALL_USERS",
        payload: json.data
      })
  }
}
export function editProfile(id,payload){
  return async function(dispatch){
   let json = await axios.put(`http://localhost:3001/users/update?id=${id}`, payload)
      dispatch({
        type: "PUT_PROFILE",
        payload: json.data
      })
    }
  }
//COMENTARIOS 
//FUNCIONES
//

export function getCommentsByGame(id_game){
  return function(dispatch){
    return axios.get(`http://localhost:3001/comments?id_game=${id_game}`)
    .then(data => {
      dispatch({
        type: GET_COMMENTS_BY_GAME,
        payload: data
      })
    })
  }
}

export function edit_comment(id_comment, comentario){
  return function(dispatch){
    return axios.put(`http://localhost:3001/comments/editComment/${id_comment}`, comentario)
    .then(data => {
      dispatch({
        type: EDIT_COMMENT,
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
export function delete_comment(id_comment){
  return function(dispatch){
    return axios.delete(`http://localhost:3001/comments/deleteComment/${id_comment}`)
    .then(data => {
      dispatch({
        type: DELETE_COMMENT,
        payload: data
      })
    })
  }
}

export function post_comment(id_user, id_game, commentary){
  return function(dispatch){
    return axios.post(`http://localhost:3001/comments/madeComment/${id_user}/${id_game}`, commentary)
    .then(data => {
      dispatch({
        type: POST_COMMENT,
        payload: data
      })
    })
  }
}

export function report_comment(id_comment){
  return function(dispatch){
    return axios.put(`http://localhost:3001/comments/report_comment/${id_comment}`)
    .then(data => {
      console.log('Reportado?')
      dispatch({
        type: REPORT_COMMENT
      })
    })
  }
}

export function comment_info(id_game){
  return function(dispatch){
    return axios.get(`http://localhost:3001/comments/${id_game}`)
    .then(data => {
      dispatch({
        type: INFO_COMMENT,
        payload: data
      })
    })
  }
}

export function getSales(){
  return async function(dispatch){
    let json = await axios.get(`http://localhost:3001/sales`)
    return dispatch({
      type: "GET_SALES",
      payload: json.data,
    })
  }
}


export function getFriends(id) {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/friends/${id}`);
    return dispatch({
      type: "GET_FRIENDS",
      payload: json.data,
      
    });
  };
}

export function addFriend(id, idfriend) {
  return async function (dispatch) {
    var json = await axios.post(`http://localhost:3001/friends/addFriend/${id}/${idfriend}`);
    return dispatch({
          type: "ADD_FRIEND",
          payload: json.data
      });
  };
}

export function deleteFriend(id,idfriend){
  return async function(dispatch){
      var json = await axios.delete(`http://localhost:3001/friends/delete/${id}/${idfriend}`);
      return dispatch({
          type: "DELETE_FRIEND",
          payload: json.data
      });
  }
}



//FIN ACTIONS 
// COMENTARIOS
//
