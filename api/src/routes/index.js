const { Router } = require('express')
const { getVideogames } = require('../controllers/getVideogames')
const { getVideogamesById } = require("../controllers/getVideogamesById")
const { getVideogamesByName } = require("../controllers/getVideogamesByName")
//Importar todos los routers

const router = Router()

//Rutas

router.get('/videogames/:id', getVideogamesById)
router.get('/videogames', getVideogamesByName)
router.get('/videogames', getVideogames)


module.exports = router