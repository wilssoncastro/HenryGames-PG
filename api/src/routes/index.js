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

//------------------------GOOGLE LOGIN-------------------------------
require('../controllers/google/logInGoogle.js')
const passport = require('passport')
const session = require('express-session')

//middleware
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//cositas de express-session
router.use(session({ secret: 'cats' }))
router.use(passport.initialize())
router.use(passport.session())

//ruta donde esta el boton para iniciar sesion con google
router.get('/loginGoogle', (req, res) => {
    res.send('<a href="/auth/google">Autheticate with google</a>')
})

//ruta donde elegimos la cuenta de google
router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] })) //el scope es lo que queremos saber de cada cuenta

//ruta del callback que nos da google
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

//en caso de que falle el inicio de sesion, esto es a donde nos llevara el callback
router.get('/auth/failure', (req, res) => {
    res.send('Salio mal')
})

//en caso de que salga bien el inicio de sesion, esto es a donde nos llevara el callback
router.get('/protected', isLoggedIn, (req, res) => {
    res.send(req.user)
})

//cerrar sesion de google (todavia no funciona)
router.get('/logoutGoogle', (req, res) => {
    req.logout()
    req.session.destroy()
    res.send('chau!')
})
//----------------------------------------------------------

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

router.use('/authentication', registerRoutes)

router.get('/is_online', (req, res) => 
    res.send(req.isAuthenticated())
)

module.exports = router