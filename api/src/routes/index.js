const { Router } = require('express')
const router = Router()

//Importar todos los routers
const { getVideogames } = require('../controllers/getVideogames')
const postVideogames = require('../controllers/postVideogames')


//Rutas

router.get('/videogames', getVideogames)
router.use('/postVideogames', postVideogames) 

module.exports = router