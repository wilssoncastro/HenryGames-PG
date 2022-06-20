const { Videogames } = require("../models/Videogame");
const { Op } = require("sequelize");

async function getVideogamesById(id) {
  const videosgames = Videogames.findAll({
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

async function getVideogamesByName(name) {
  const videosgames = Videogames.findAll({
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

module.exports = {
  getVideogamesById,
  getVideogamesByName
}