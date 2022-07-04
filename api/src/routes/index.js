const { Router } = require('express')
const router = Router()
const userRouters = require('../controllers/userRouters')
const friendRouters = require('../controllers/friendRoutes')
const wishRoutes = require('../controllers/wishRoutes')
const registerRoutes = require('../controllers/Autentication/index')

//Importar todos los routers

const routesSales = require('../controllers/salesRoutes')
const getVideogames = require('../controllers/getVideogames')
const routesVideogames = require('../controllers/routesVideogames')
const routesComments = require('../controllers/commentsRoutes')


const getEsrb = require('../controllers/getEsrb')
const getGenres = require('../controllers/getGenres')
const cartRoutes = require('../controllers/cartRoutes')
const routesBlog = require('../controllers/blog')

router.get('/', (req, res) => {
    console.log(req.isAuthenticated())
    res.json({msg:'HENRYGAMES'})
})

router.use('/videogames', getVideogames)
router.use('/videogames/:id', getVideogames)
router.use('/users', userRouters)
router.use('/videogamesDev', routesVideogames)
router.use('/esrb', getEsrb)
router.use('/genres', getGenres)
router.use('/friends', friendRouters)
router.use('/wishlist', wishRoutes)
router.use('/authentication', registerRoutes)
router.use('/cart', cartRoutes)
router.use('/comments', routesComments)
router.use('/sales', routesSales)
router.use('/blog', routesBlog)


module.exports = router