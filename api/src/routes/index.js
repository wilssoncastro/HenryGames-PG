const { Router } = require('express')
const { getVideogames } = require('../controllers/getVideogames')
const { getVideogamesById } = require("../controllers/getVideogamesById")
const { getVideogamesByName } = require("../controllers/getVideogamesByName")
//Importar todos los routers

const router = Router()

//Rutas


module.exports = router