const { Router } = require('express')
const router = Router()
const passport = require('passport')
require('../../app.js')

//const session = require('express-session')
//const { Player } = require('../../db')
//const { Op } = require('sequelize')

//middleware
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//cositas de express-session
// router.use(session({ secret: 'cats' }))
// router.use(passport.initialize())
// router.use(passport.session())

//ruta donde elegimos la cuenta de google
router.get('/auth/google',
    passport.authenticate('google', 
        { scope: ['email', 'profile'] })) //el scope es lo que queremos saber de cada cuenta

//ruta del callback que nos da google
router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/failure'
    })
)

//en caso de que falle el inicio de sesion, esto es a donde nos llevara el callback
router.get('/auth/failure', (req, res) => {
    res.send('Algo salio mal')
})

//en caso de que salga bien el inicio de sesion, esto es a donde nos llevara el callback
router.get('/protected', isLoggedIn, async (req, res) => {
    res.send(req.user)
})

//cerrar sesion de google
router.get('/logoutGoogle', (req, res) => {
    /* req.logout() */
    req.session.destroy(function (err) {
        res.redirect('/'); 
    });
    res.send('CHAU!')
})

module.exports = router