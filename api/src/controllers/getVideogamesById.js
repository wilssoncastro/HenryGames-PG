const { Videogame } = require("../models/Videogame")

async function getVideogamesById(req, res) {
  const id = req.params.id
  const videosgames = Videogame.findAll({
    // include: [{
    //   model,
    //   through: {
    //   }
    // }],
    where: {
      id,
    },
  });
  return videosgames;
}

module.exports = getVideogamesById;