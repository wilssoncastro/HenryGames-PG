const { Router } = require('express')
const router = Router()
const passport = require('passport');
// var express = require('express');
// var GoogleStrategy = require('passport-google-oidc');
// var db = require('../../db.js');

//cositas que hace google solito
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

passport.use(new GoogleStrategy({
    clientID: process.env['GOOGLE_CLIENT_ID'],
    clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
    callbackURL: "http://localhost:3001/google/callback",
    passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
    return done(null, profile);
}
));

passport.serializeUser(function(user, done) {
    console.log(`\n--------> Serialize User:`)
    console.log(user)

    done(null, user)
})

passport.deserializeUser(function(user, done) {
    console.log("\n--------- Deserialized User:")
    console.log(user)
    
    done (null, user)
})






















// passport.use(new GoogleStrategy({
//     clientID: process.env['GOOGLE_CLIENT_ID'],
//     clientSecret: process.env['GOOGLE_CLIENT_SECRET'],
//     callbackURL: 'http://localhost:3000/oauth2/redirect/google',
//     scope: [ 'profile' ]
//   }, function verify(issuer, profile, cb) {
//     db.get('SELECT * FROM federated_credentials WHERE provider = ? AND subject = ?', [
//       issuer,
//       profile.id
//     ], function(err, row) {
//       if (err) { return cb(err); }
//       if (!row) {
//         db.run('INSERT INTO users (name) VALUES (?)', [
//           profile.displayName
//         ], function(err) {
//           if (err) { return cb(err); }
  
//           var id = this.lastID;
//           db.run('INSERT INTO federated_credentials (user_id, provider, subject) VALUES (?, ?, ?)', [
//             id,
//             issuer,
//             profile.id
//           ], function(err) {
//             if (err) { return cb(err); }
//             var user = {
//               id: id,
//               name: profile.displayName
//             };
//             return cb(null, user);
//           });
//         });
//       } else {
//         db.get('SELECT * FROM users WHERE id = ?', [ row.user_id ], function(err, row) {
//           if (err) { return cb(err); }
//           if (!row) { return cb(null, false); }
//           return cb(null, row);
//         });
//       }
//     });
//   }));

// // router.get('/login', (req, res) => {
// //     res.send('Hola')
// // })

// router.get('/login/federated/google', passport.authenticate('google'));

// router.get('/oauth2/redirect/google', passport.authenticate('google', {
//     successRedirect: '/',
//     failureRedirect: '/login'
//   }));

module.exports = router