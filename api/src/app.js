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
const randomstring = require("randomstring");

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

//---------AUTHENTICATION-------------//

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

//---------GOOGLE STRATEGY-------------//

const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;


passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: "http://localhost:3001/auth/google/callback",
    passReqToCallback: true
  },
  async function(request, accessToken, refreshToken, profile, done) {
    console.log('entre en la funcion de GoogleStrategy')
    await Player.findOne({where:{email: profile.email}})
      .then(async (user) => {
        if(!user){
          console.log('registro del user google en la BD')
          const createUserGoogle = await Player.create({
            name: profile.given_name, 
            lastname: profile.family_name, 
            email: profile.email, 
            profile_pic: profile.photos[0].value, 
            active: profile.email_verified, 
            user: profile.displayName,
            password: randomstring.generate(12),
            type: 'user',
            online: true
          })
          return done(null, createUserGoogle)
        }
        if(user){
            console.log('Se encontro el user de Google')
            return done(null, user)
          }
        })
      .catch( err => {
        console.log(err)
        return done(err)
      })
}));

passport.serializeUser(function(user, done) {
  console.log('paso dos de la autenticación')
  done(null, user.id);
});

passport.deserializeUser(async function(id, done) {  
  console.log('paso tres de la autenticación')
  
  await Player.findByPk(id, (err, user) => {
    done(null, user);
  })
  .then((user) => {
      console.log('va bien')
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