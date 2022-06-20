const { Router } = require('express')
const router = Router()

//Importar todos los routers
const { getVideogames } = require('../controllers/getVideogames')
const { postVideogames } = require('../controllers/postVideogames.js')


//Rutas

router.get('/videogames', getVideogames)
router.use('/postVideogame', postVideogames)

module.exports = router