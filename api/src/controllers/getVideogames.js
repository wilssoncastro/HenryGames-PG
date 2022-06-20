const { Videogame } = require('../db');

async function getVideogames(req, res, next) {
    try {
        const allVideogames = await Videogame.findAll();
        res.send(allVideogames)
    } catch (error) {
        next(error)
    }
}

module.exports = { getVideogames }