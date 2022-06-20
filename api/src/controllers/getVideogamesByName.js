const { Videogame } = require("../models/Videogame")
const { Op } = require("sequelize")

async function getVideogamesByName(req, res) {
  const name = req.query.name
  const videosgames = Videogame.findAll({
    // include: [{
    //   model,
    //   through: {
    //   }
    // }],
    where: {
      name: { [Op.iLike]: `${name}%` },
    },
  });
  return videosgames;
}

module.exports = getVideogamesByName;
