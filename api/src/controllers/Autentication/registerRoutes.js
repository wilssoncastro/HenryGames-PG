const { Router } = require('express')
const { Player } = require('../../db')
const { Op } = require('sequelize')
const randomstring = require("randomstring");
const bcrypt = require('bcrypt');

const router = Router();

function isAuthenticated(req, res, next) {
    // console.log(req, ' esto es req.session register isAuthenticated');
    // console.log(req.user, ' esto es req.user register isAuthenticated');
    // console.log(req.cookies,' esto es req.cookies register isAuthenticated' )
    // console.log(req.signedCookies,' esto es req.signedCookies register isAuthenticated' )
    
    // if (req.isAuthenticated()) {
    //   res.redirect('/api/service/register');
    // } else {
    //   next();
    // }
    next()
}

router.post('/register', isAuthenticated, async (req, res) => {

  const { name, lastname, user, password, email, type } = req.body;
  
    
  if(!name || !lastname || !user || !password || !email || !type){
    res.send('Faltan datos obligatorios')
  }

  let profile_pic = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"

  try {
    
    let security_jumps = 8 //Saltos de seguridad
    let new_user;
    let user_id;

    const findUser = Player.findOne({where: {[Op.or]: [{ user: user }, { email: email }]}})
    const secretToken = randomstring.generate(7); // Genero un token de seguridad
    const hashPassword = bcrypt.hash(password, security_jumps)

    const promise_pending_array =await Promise.all([findUser, secretToken, hashPassword])
    
    if(!promise_pending_array[0]){
      let create = { name, 
        lastname, 
        user, 
        email, 
        type 
      }
      create.password = promise_pending_array[2]
      create.active = false
      create.profile_pic = profile_pic
      create.secret_token=promise_pending_array[1]
      new_user = await Player.create(create)

      console.log(new_user)
    }else{
      res.status(404).send('Datos incompletos, el registro no fue creado ');
    }
    


    
  } catch (error) {
    console.log(error)
    res.status(404).send({error:error})
  }
})

module.exports = router;