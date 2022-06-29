const { Router } = require("express");
var passport = require("passport");

const router = Router()

router.post('/login', 
    passport.authenticate("local", { 
        failureRedirect: "/authentication/login" 
    })
    ,async (req, res) => {
        try {
            console.log(req.isAuthenticated())
            if(!req.user.active){
                return res.send('Debes activar la cuenta')
            }
            
            let { id, name, lastname, type, profile_pic} = req.user;
            
            return res.json({log_in: true, id:id, name: name, lastname:lastname, type:type, profile_pic: profile_pic})
        } catch (error) {
            res.status(404).send('ERRRRROOOOOOOOOOOOOR')
        }
    })

router.get('/login', (req, res)=> {
    
    return res.send('Email o contraseña incorrecta');
})

router.get('/in', (req, res) => {
    return res.send('Ya estas logueado!')
})

module.exports = router