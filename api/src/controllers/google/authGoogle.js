const { Router } = require('express')
const router = Router()
const passport = require('passport')
require('../../app.js')

const CLIENT_URL = 'http://localhost:3000/'

//middleware
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

//ruta donde elegimos la cuenta de google
router.get('/auth/google',
    passport.authenticate('google', 
        { scope: ['email', 'profile'] })) //el scope es lo que queremos saber de cada cuenta

//ruta del callback que nos da google
router.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: CLIENT_URL + 'home',
        failureRedirect: '/auth/google/failure'
    })
)

//en caso de que falle el inicio de sesion, esto es a donde nos llevara el callback
router.get('/auth/google/failure', (req, res) => {
    res.status(401).json({
        success: false,
        message: "account not found",
    })
})

//en caso de que salga bien el inicio de sesion, esto es a donde nos llevara el callback
router.get('/auth/google/protected', isLoggedIn, async (req, res) => {

    if(req.user){
        if(!req.user.banned){
            res.status(200).json({
                success: true,
                message: "successfull",
                user: req.user,
                banned: false,
                //cookies: req.cookies
            })
        }
        else{
            return res.status(401).json({
                success: false,
                banned: true,
                message: 'Your account is banned. Can not log in'
            })
        }
    }
})

module.exports = router