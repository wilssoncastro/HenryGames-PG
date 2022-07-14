import { stat } from 'fs'
import { GET_USER_BY_ID, GET_CART_BY_ID, DELETE_FROM_CART, ADD_TO_CART, 
        GET_COMMENTS_BY_GAME,DELETE_COMMENT, POST_COMMENT, EDIT_COMMENT,
        DELETE_ALL_FROM_CART,
        IS_ONLINE,
        INFO_COMMENT,
        GET_LIBRARY_BY_ID,
        GET_ALL_COMMENTS,
        UNREPORT_COMMENT
} from '../actions/index'

const initialState = {
    allVideogames: [],
    videogames: [],
    noLimitVideogames: [],
    details: [],
    wishList: [],
    genres: [],
    esrb: [],
    my_user: {},
    articles: [],
    article:[],
    users: [],
    cart: [],
    all_comments: [],
    comments: [],
    //new_comments: [],
    sales: [],
    is_online: false,
    friends: [],
    my_games: [],
    my_chat:[],
    chat_friend:[]
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "GET_ALL_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                allVideogames: action.payload,
                details: [],
            }

        case "GET_FILTERED_VIDEOGAMES":
            return {
                ...state,
                videogames: action.payload,
                details: [],
            }

        case "GET_NOLIMIT_FILTERED_VIDEOGAMES":
            return {
                ...state,
                noLimitVideogames: action.payload,
            }

        case 'FILTER_BY_GENRE':
            const allVideogames = state.videogames
            if (action.payload === 'all') {
                return {
                    ...state,
                    videogames: allVideogames
                }
            } else {
                let filterByGenre = allVideogames.filter((el) => {
                    for (let i = 0; i < el.genres.length; i++) {
                        if (el.genres[i].name === action.payload) {
                            return true;
                        }
                    }
                    return false;
                });
                return {
                    ...state,
                    videogames: [...filterByGenre]
                }
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

        case "GET_USER_BY_ID":
            return {
                ...state,
                my_user: action.payload
            }
        case "GET_ALL_USERS":
            return {
                ...state,
                users: action.payload
            }
        case GET_CART_BY_ID:

            return {
                ...state,
                cart: action.payload.data.cart
            }
        case ADD_TO_CART:
            return {
                ...state,
                cart: state.cart.concat(action.payload.data)
            }
        case DELETE_FROM_CART:
            console.log(action.payload)
            return {
                ...state,
                cart: state.cart.filter(v => v.id !== action.payload.data.id)
            }
        case DELETE_ALL_FROM_CART:
            return {
                ...state,
                cart: []
            }
        case GET_ALL_COMMENTS:
            
            return {
                ...state,
                all_comments: action.payload.data
                
            }
        case GET_COMMENTS_BY_GAME:

            return {
                ...state,
                comments: action.payload.data
            }
        case DELETE_COMMENT:
            console.log(action.payload.data)
            return {
                ...state,
                comments: state.comments.filter(v => v.id !== action.payload.data.id),
                all_comments: state.all_comments.filter(v => v.id !== action.payload.data.id)
            }
        case UNREPORT_COMMENT:
            return{
                ...state,
                comments: state.comments.filter(v => v.id !== action.payload.data.id),
                all_comments: state.all_comments.filter(v => v.id !== action.payload.data.id)
            }
        case POST_COMMENT:
            return {
                ...state,
                comments: state.comments.concat(action.payload.data)
                //new_comments: state.new_comments.concat({ Comment: action.payload.data })
            }
        case EDIT_COMMENT:
            console.log(state.comments)
            let elemento = action.payload.data
            for (let i = 0; i < state.comments.length; i++) {
                if (state.comments[i].id === elemento.id) {
                    state.comments.splice(i, 1, elemento)
                }
            }
            console.log(state.comments)
            return {
                ...state,
                comments: state.comments
            }
         case "GET_ARTICLES":
                return {
                    ...state,
                    articles: action.payload.data
                }
        case "FIND_ARTICLE":
                return{
                    ...state,
                    article: action.payload
                }
        case "UPDATE_ARTICLE":
                return {
                    ...state,
                };
        case "SET_ARTICLE":
                return {
                    ...state,
                    article: action.payload
                };
        case "GET_SALES":
            return {
                ...state,
                sales: action.payload
            }

        case IS_ONLINE:
            
            return{
                ...state,
                is_online: action.payload.data
            }
            
        case "GET_FRIENDS":
            return {
                ...state,
                friends: action.payload
            }
            
        case "ADD_FRIEND":
            return {
                ...state,
                friends: state.friends.concat(action.payload)
            }
        case "DELETE_FRIEND":
            console.log(action.payload)
            return {
                ...state,
                friends: state.friends.filter(v => v.id !== action.payload.id)
            }
        case GET_LIBRARY_BY_ID:
            return {
                ...state,
                my_games: action.payload.data.library
            }
        case "GET_CHAT":
        return{
            ...state,
            my_chat: action.payload
        }
        case "GET_CHAT_FRIEND":
        return{
            ...state,
            chat_friend: action.payload
        }
        case "SEND_MESSAGE":
        return{
            ...state,
            my_chat: state.my_chat.concat(action.payload)

        }
        

        default:
            return state;
            

    }
}

export default rootReducer;