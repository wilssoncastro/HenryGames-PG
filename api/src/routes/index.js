const { Router } = require('express')
const { getVideogames } = require('../controllers/getVideogames')
//Importar todos los routers

const router = Router()

//Rutas

router.get('/videogames', getVideogames)

module.exports = router