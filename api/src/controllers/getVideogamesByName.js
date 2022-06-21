const { Videogame } = require("../models/Videogame")
const { Op } = require("sequelize")

async function getVideogamesByName(req, res) {
  const name = req.query.name
  const videogames = Videogame.findAll({
    // include: [{
    //   model,
    //   through: {
    //   }
    // }],
    where: {
      name: { [Op.iLike]: `${name}%` },
    },
  });
  return videogames;
}

module.exports = getVideogamesByName;
