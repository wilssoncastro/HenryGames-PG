const { Videogame } = require('../models/Videogame')
const { Op } = require("sequelize")

async function getVideogames() {
  const videogames = Videogame.findAll({
    include: [{
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: []
      }
    },
    {
      model: Esrb,
      attributes: ["name"],
      through: {
        attributes: []
      }
    },
    {
      model: Tag,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }],
  });
  return videogames;
}

async function getVideogamesByName(req, res) {
  const name = req.query.name
  const videogames = Videogame.findAll({
    include: [{
      model: Genre,
      attributes: ["name"],
      through: {
        attributes: []
      }
    },
    {
      model: Esrb,
      attributes: ["name"],
      through: {
        attributes: []
      }
    },
    {
      model: Tag,
      attributes: ["name"],
      through: {
        attributes: []
      }
    }],
    where: {
      name: { [Op.iLike]: `${name}%` },
    },
  });
  return videogames;
}

async function getVideogamesById(req, res) {
  const id = req.params.id
  const videogames = Videogame.findByPk(id);
  return videogames;
}

module.exports = {
  getVideogames,
  getVideogamesByName,
  getVideogamesById
}