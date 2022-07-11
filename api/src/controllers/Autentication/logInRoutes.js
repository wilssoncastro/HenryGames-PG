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
                return res.send('You must activate your account')
            }

            if(req.user.banned){
                return res.send('Your account is banned. Can not log in')
            }
            
            let { id, name, lastname, type, profile_pic, user} = req.user;
            
     
            return res.json({log_in: true, id:id, name: name, lastname:lastname, type:type, profile_pic: profile_pic, user: user})
        } catch (error) {
            res.status(404).send('Error')
        }
    })

router.get('/login', (req, res)=> {
    
    return res.send('Wrong email or password');
})

router.get('/in', (req, res) => {
    return res.send('You are already register!')
})

module.exports = router