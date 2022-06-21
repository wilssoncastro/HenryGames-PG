const { Videogame } = require('../db')
const { Op } = require("sequelize");
const { Router } = require('express');
const router = Router();

//---------Query---------//
router.get('/', async (req, res) => {
  const { name, page, limit, order, sort} = req.query
  if (name) {
    const videogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `${name}%` },
      },
    })
    res.send(videogames);
  }
  else if (sort && order) {
    const videogames = await Videogame.findAll({
      limit: limit, // cantidad de videogames por página
      offset: page, // índice del primer videogame que se muestra en la página
      order: [[sort, order]] // sort (ordenamiento por) y order (ordenamiento ASC o DESC)
    })
    res.send(videogames);
  }
  else {
    const videogames = await Videogame.findAll({
      limit: limit,
      offset: page
    });
    res.send(videogames);
  }
})

//---------Params---------//
router.get('/:id', async (req, res) => {
  const id = req.params.id
  const videogames = await Videogame.findByPk(id);
  res.send(videogames);
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