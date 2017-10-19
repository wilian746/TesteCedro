'use strict';
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;
const User = require('../app/models/user');

var localOptions = {
    usernameField: 'email'
};
 
var localLogin = new LocalStrategy(localOptions, function(email, senha, done){
    User.findOne({
        email: email
    }, function(err, user){
        if (err)
            return done(err);

        if(!user){
            var content = {
                message: 'Email informado está incorreto.'
            };
            return done(null, false, content);
        }

        user.compareSenhaDoLogin(senha, function(err, isMatch){
            if(err){
                return done(err);
            }

            var content = {
                message: 'Senha informada está incorreta.'
            };

            if(!isMatch){
                return done(null, false, content);
            }

            return done(null, user);
        });
    })
});
 
var jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeader(),
    secretOrKey: process.env.TOKEN_SECRET
};
 
var jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    User.findById(payload._id, function(err, user){
        if(err){
            return done(err, false);
        }
 
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
    });
});
 
passport.use(jwtLogin);
passport.use(localLogin);