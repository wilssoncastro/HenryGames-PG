import axios from 'axios'

export function getAllVideogames() {
    return async function(dispatch) {
        let json = await axios("http://localhost:3001/");
        return dispatch({
            type: "GET_ALL_VIDEOGAMES",
            payload: json.data
        });
    }
}
