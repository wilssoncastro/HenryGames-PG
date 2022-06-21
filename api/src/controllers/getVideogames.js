const { Videogame } = require('../db')
const { Op } = require("sequelize");
const { Router } = require('express');
const router = Router();
require('dotenv').config();
const axios = require("axios")
const { API_KEY } = process.env

//---------Query---------//
router.get('/', async (req, res) => {
  const { name, page, limit, order, sort} = req.query
  if (name) {
    const videogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `${name}%` },
      },
    })
    console.log("name")
    res.send(videogames);
  }
  else if (sort && order) {
    const videogames = await Videogame.findAll({
      limit: limit, // cantidad de videogames por página
      offset: page, // índice del primer videogame que se muestra en la página
      order: [[sort, order]] // sort (ordenamiento por) y order (ordenamiento ASC o DESC)
    })
    console.log("sort && order")
    res.send(videogames);
  }
  else {
    const videogames = await Videogame.findAll({
      limit: limit,
      offset: page
    });
    console.log("else")
    res.send(videogames);
  }
})

//---------Params---------//
// router.get('/:id', async (req, res) => {
//   const id = req.params.id
//   const videogames = await Videogame.findByPk(id);
//   res.send(videogames);
//   console.log(videogames)
// })

router.get('/:id', async (req, res) => {
const id = req.params.id
const gameDetail = await axios(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`);
  let e = gameDetail.data;
  const detailsObj = {
    name: e.name,
    image: e.background_image,
    description: e.description,
    released: e.released,
    rating: e.rating,
    genres: e.genres.map(e => e.name),
    platforms: e.platforms.map(e => e.platform.name)
  }
  res.send(detailsObj);
})

module.exports = router;

// {
//   include: [{
//     model: Genre,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   },
//   {
//     model: Esrb,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   },
//   {
//     model: Tag,
//     attributes: ["name"],
//     through: {
//       attributes: []
//     }
//   }],
// }