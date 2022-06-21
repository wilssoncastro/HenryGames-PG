const { Router } = require('express')
const router = Router()
const userRouters = require('../controllers/userRouters')

//Importar todos los routers

//const {getVideogames} = require('../controllers/getVideogames')
const routesVideogames = require('../controllers/routesVideogames')
const getTags = require ('../controllers/getTags')
const getEsrb = require('../controllers/getEsrb')

//router.get('/videogames', getVideogames)
router.use('/users', userRouters)
router.use('/postVideogames', routesVideogames) 
router.use('/tags', getTags)
router.use('/esrb', getEsrb)

module.exports = router