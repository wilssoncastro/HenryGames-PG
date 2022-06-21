const { Videogame } = require('../models/Videogame')

async function getVideogames() {
  const videogames = Videogame.findAll({
    // include: [{
    //   model,
    //   through: {
    //   }
    // }],
  });
  return videogames;
}

module.exports = getVideogames;