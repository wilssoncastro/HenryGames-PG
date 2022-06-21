const { Videogame } = require("../models/Videogame")

async function getVideogamesById(req, res) {
  const id = req.params.id
  const videogames = Videogame.findAll({
    // include: [{
    //   model,
    //   through: {
    //   }
    // }],
    where: {
      id: id,
    },
  });
  return videogames;
}

module.exports = getVideogamesById;