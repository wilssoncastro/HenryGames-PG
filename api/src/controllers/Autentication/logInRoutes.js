const { Router } = require("express");
var passport = require("passport");

const router = Router()

router.post('/login', 
    passport.authenticate("local", { 
        failureRedirect: "/authentication/login" 
    })
    ,async (req, res) => {
        try {
            if(!req.user.active){
                return res.send('Debes activar la cuenta')
            }
            
            let { id, name, lastname, type, profile_pic} = req.user;
            
            return res.json({log_in: true, id:id, name: name, lastname:lastname, type:type, profile_pic})
        } catch (error) {
            res.status(404).send('ERRRRROOOOOOOOOOOOOR')
        }
    })

router.get('/login', (req, res)=> {
    console.log('que onda aca')
    return res.send('Email o contraseña incorrecta');
})
module.exports = router