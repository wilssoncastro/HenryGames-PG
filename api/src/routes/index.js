const { Router } = require('express')
const { getVideogames } = require('../controllers/getVideogames')
const userRouters = require('../controllers/userRouters')
//Importar todos los routers

const router = Router()

//Rutas

router.get('/videogames', getVideogames)
router.use('/users', userRouters)

module.exports = router