require ('dotenv').config();
const { API_KEY } = process.env; 
const axios = require('axios');

const getAllApiGames = async () => {
    let pageOne = [];
    let pageTwo = [];
    let pageThree = [];
    let pageFour = [];
    let pageFive = [];

    try {
        //Trae 40 juegos
        pageOne = await axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page_size=40`);
        let nextPage = pageOne.data.next;
        pageOne = [ ...pageOne.data.results ];

        //Trae 80 juegos
        pageTwo = await axios.get(nextPage);
        nextPage = pageTwo.data.next;
        pageTwo = [ ...pageTwo.data.results ];

        //
    } catch (error) {
        
    }
}