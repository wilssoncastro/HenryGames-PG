const { Router } = require("express");
const router = Router()

function isAuthenticated(req, res, next) {

    // console.log(req.body, 'que trae el body?')
    // console.log(req.session, 'si--- esto es req.session register isAuthenticated');
    // console.log(req.user, 'si--- esto es req.user register isAuthenticated');
    // console.log(req.cookies,'no--- esto es req.cookies register isAuthenticated');
    // console.log(req.signedCookies,'si--- esto es req.signedCookies register isAuthenticated');
    // El browser no me trajo nada, solo un resto de cookie
    
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/authentication/logout');
    }
  }

router.get('/logout', function(req, res){
    res.send('Necesita iniciar sesión para poder hacer un post a logout')
})
  
router.post('/logout', isAuthenticated,
    function(req, res){
      req.logout();
      // res.clearCookie('sid'); // clear session id - ver si es necesario
      res.redirect('/');
      console.log('entre')
      res.send('hola')
    }
);

module.exports = router