const { Videogame } = require('../db')
const { Op } = require("sequelize");
const { Router } = require('express');
const router = Router();


router.get('/', async (req, res) => {
  const name = req.query.name
  if (name) {
    const videogames = await Videogame.findAll({
      where: {
        name: { [Op.iLike]: `${name}%` },
      },
    })
    res.send(videogames);
  } else {
    const allVideogames = await Videogame.findAll();
    res.send(allVideogames);
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id
  const videogames = await Videogame.findByPk(id);
  res.send(videogames);
  console.log(videogames)
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