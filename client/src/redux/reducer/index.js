import {  } from '../actions/index'

const initialState = {
    allVideogames: [],
    videogames: [],
    details: [],
    wishList: [],
    genres: [],
    tags: [],
    cart: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "GET_TAGS":
            return {
                ...state,
                tags: action.payload
            }

        case "GET_DETAILS_VIDEOGAME":
            return {
                ...state,
                details: action.payload
            }

        case "GET_VIDEOGAMES_NAME":
            return {
                ...state,
                videogames: action.payload
            }

        case "DELETE_VIDEOGAME":
            return {
                ...state
            }

        case "PUT_VIDEOGAME":
            return {
                ...state
            }

        case "POST_VIDEOGAME":
            return {
                ...state
            }

        case "ADD_WISHLIST":
            return {
                ...state,
                wishList: state.wishList.concat(action.payload)
            }
       /*  case "DELETE_FAVORITE":
            return {
                ...state,
                wishList: state.wishList.
            } */
    
        default:
            return state;
    }
}

export default rootReducer;