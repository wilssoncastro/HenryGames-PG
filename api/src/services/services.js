require ('dotenv').config();
const { API_KEY } = process.env; 
const axios = require('axios');

async function getAllApiGames() {
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

        //Trae 120 juegos
        pageThree = await axios.get(nextPage);
        nextPage = pageThree.data.next;
        pageThree = [ ...pageThree.data.results ];

        //Trae 160 juegos
        pageFour = await axios.get(nextPage);
        nextPage = pageFour.data.next;
        pageFour = [ ...pageFour.data.results ];

        //Trae 200 juegos
        pageFive = await axios.get(nextPage);
        nextPage = pageFive.data.next;
        pageFive = [ ...pageFive.data.results ];

        return [ ...pageOne, ...pageTwo, ...pageThree, ...pageFour, ...pageFive ];
    } catch (error) {
       console.log('Games not found and not save')
    }
}

module.exports = getAllApiGames;