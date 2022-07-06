const { Router } = require('express')
const router = Router()
require('./logInGoogle.js')
const passport = require('passport')
const session = require('express-session')

const { Player } = require('../../db')
const { Op } = require('sequelize')

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
router.get('/protected', isLoggedIn, async (req, res) => {
    const { given_name, family_name, displayName, picture, email, email_verified, id } = req.user;
    const userName = email;

    //res.send(req.user)
    //res.json({name: given_name, lastName: family_name, email: email, profile_pic: picture, id: id, active: email_verified, user: displayName })

    if(!given_name || !family_name || !displayName || !picture || !email || !email_verified || !id){
        res.send('Faltan datos obligatorios')
    }

    try {
        const findUser = Player.findOne({where: {[Op.or]: [{ user: displayName }, { email: email }]}})

        let create = { 
            name: given_name, 
            lastname: family_name, 
            email: email, 
            profile_pic: picture, 
            active: email_verified, 
            user: displayName,
            password: 'googlepassword'
        }

        let new_user = await Player.create(create)
        
        res.send(new_user)
    } catch (error) {
        console.log(error)
    }
})

//cerrar sesion de google
router.get('/logoutGoogle', (req, res) => {
    /* req.logout() */
    req.session.destroy(function (err) {
        res.redirect('/'); 
    });
    res.send('chau!')
})

module.exports = router