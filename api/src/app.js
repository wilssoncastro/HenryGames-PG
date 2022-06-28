const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const session = require("express-session");
const passport = require("passport");
const Strategy = require("passport-local").Strategy;
const { Player } = require('./db');
const { SECRET } = process.env
const bcrypt = require("bcrypt")

const server = express()

server.name = 'API';

// -------------------  MIDDLEWARES-------------

// ---------- CORS, COOKIES, JSON Y URLENCODER -----------

server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(express.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser(SECRET));
server.use(morgan('dev'));
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//---------AUTENTHICATION-------------//

passport.use(
  new Strategy(function (username, password, done) {
    Player.findOne({where:{user: username}})
      .then((user) => {
        if(!user){
          console.log('No se encontro el user')
          return done(null,false)
        }
        if(user){
          bcrypt.compare(password, user.password)
          .then((res) => {
            if(!res){
              console.log('Se encontro el user, pero fallo la password')
              return done(null, false)
            }
            if(res){
              console.log('Se encontro el user y la password')
              return done(null, user)
            }
          })
        }
      })
      .catch( err => {
        console.log(err)
        return done(err)
      })


  })
)

passport.serializeUser(function(user, done) {
  console.log('paso dos de la autenticación')
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {  
  console.log('paso tres de la autenticación')
  
  Player.findByPk(id)
  .then((user) => {
      done(null, user);
    })    
  .catch(err => {
      return done(err);
    })
});

//For Passport
server.use(
  session({
    secret: SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
  })
); 
server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
// server.use((req, res, next) => {
//   console.log(req.session, ' esto es req.session 120');
//   console.log(req.user, ' esto es req.user 121');
//   next();
// });

server.use('/', routes);

// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;