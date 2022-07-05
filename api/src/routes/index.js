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
const mercadopago = require('../controllers/mercadopago')
const cartRoutes = require('../controllers/cartRoutes')
const routesBlog = require('../controllers/blog')

//google
const logInGoogle = require('../controllers/google/logInGoogle.js')

router.get('/', (req, res) => {
    
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
router.use('/mercadopago', mercadopago)
router.use('/cart', cartRoutes)
router.use('/comments', routesComments)
router.use('/sales', routesSales)
router.use('/blog', routesBlog)
router.use('/', logInGoogle)

router.use('/authentication', registerRoutes)

router.get('/is_online', (req, res) => 
    res.send(req.isAuthenticated())
)

module.exports = router