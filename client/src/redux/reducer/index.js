import {  } from '../actions/index'

const initialState = {
    allVideogames: [],
    videogames: [],
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload
            }
    
        default:
            return state;
    }
}

export default rootReducer;