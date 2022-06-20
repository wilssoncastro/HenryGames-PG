const { Router } = require('express')
const router = Router()
const userRouters = require('../controllers/userRouters')

//Importar todos los routers
const { getVideogames } = require('../controllers/getVideogames')
const postVideogames = require('../controllers/postVideogames')
const getTags = require ('../controllers/getTags')
const getEsrb = require('../controllers/getEsrb')

//Rutas

router.get('/videogames', getVideogames)
router.use('/users', userRouters)
router.use('/postVideogames', postVideogames) 
router.use('/tags', getTags)
router.use('/Esrb', getEsrb)

module.exports = router