import { GET_USER_BY_ID, GET_CART_BY_ID, DELETE_FROM_CART, ADD_TO_CART } from '../actions/index'

const initialState = {
    allVideogames: [],
    videogames: [],
    details: [],
    wishList: [],
    genres: [],
    esrb: [],
    users: [],
    my_user: {},
    cart: []
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
            }

        case "GET_FILTERED_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
            }

        case "GET_CARD_STATISTICS": 
            return {
                ...state,
                videogames: action.payload
            }
            
        case "GET_GENRES":
            return {
                ...state,
                genres: action.payload
            }

        case "GET_ESRB":
            return {
                ...state,
                esrb: action.payload
            }

        case "GET_DETAILS_VIDEOGAME":
            return {
                ...state,
                details: action.payload
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

        case "GET_WISH_LIST":
            return {
                ...state,
                wishList: action.payload.wishs
            }

        case "ADD_WISH_LIST":
            console.log(action.payload)
            return {
                ...state,
                wishList: state.wishList.concat(action.payload)
            }
            
        case "DELETE_WISH_LIST":
            return {
                ...state,
                wishList: state.wishList.filter(v => v.id.toString() !== action.payload.id.toString())
            }
            
        case "POST_CART":
            return {
                ...state
            }
        
        case GET_USER_BY_ID:
            return {
                ...state,
                my_user: action.payload.data
            }
        case GET_CART_BY_ID:
            console.log(action.payload)
            return {
                ...state,
                cart: action.payload.data.cart
            }
        case ADD_TO_CART:
            return{
                ...state,
                cart: state.cart.concat(action.payload.data)
            }
        case DELETE_FROM_CART:
            console.log(action.payload)
            return {
                ...state,
                cart: state.cart.filter(v => v.id !== action.payload.data.id)
            }
        default:
            return state;
    }
}

export default rootReducer;