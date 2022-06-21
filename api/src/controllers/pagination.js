const { Videogame } = require('../models/Videogame')

async function pagination() {
  const { page, sort, order } = req.query;
  if (sort && order) {
    const videogames = await Videogame.findAll({
      limit: 10, // cantidad de videogames por página
      offset: page, // índice del primer videogame que se muestra en la página
      order: [[sort, order]], // sort (ordenamiento por) y order (ordenamiento ASC o DESC)
    })
    return videogames
  } else {
    const videogames = await Videogame.findAll({
      limit: 10,
      offset: page,
    })
    return videogames
  }
}

module.exports = pagination;