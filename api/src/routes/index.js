const { Router } = require('express')
const { getVideogames } = require('../controllers/getVideogames')
const userRouters = require('../controllers/userRouters')
//Importar todos los routers

const postVideogames = require('../controllers/postVideogames')
const getTags = require ('../controllers/getTags')


//Rutas
const router = Router()

router.get('/videogames', getVideogames)
router.use('/users', userRouters)
router.use('/postVideogames', postVideogames) 
router.use('/tags', getTags)

module.exports = router