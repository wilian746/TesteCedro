'use strict';
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const moment = require('moment');
moment.locale('pt-BR');

const expires = moment().add(7, 'days').valueOf();

function generateToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: expires
    });
}

function setUserInfo(request) {
    return {
        _id: request._id,
        name: request.nome,
        senha: request.senha,
        autorizacao: request.autorizacao
    };
}


exports.login = function (req, res, next) {
    var userInfo = setUserInfo(req.user);
    res.status(200).json({
        token: 'JWT ' + generateToken(userInfo),
        expiresIn: expires,
        user: userInfo
    });
};


exports.registroDeUsuario = function (req, res, next) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;
    var autorizacao = req.body.autorizacao;
    
    if (!nome) {
        return res.status(422).send({error: 'Você deve informar seu nome e sobrenome'});
    }
    if (!email) {
        return res.status(422).send({error: 'Você deve digitar um e-mail'});
    }
    if (!senha) {
        return res.status(422).send({error: 'Você deve digitar uma senha'});
    }


    User.findOne({email: email}, function (err, existingUser) {
        if (err) {
            return next(err);
        }
        if (existingUser) {
            return res.status(422).send({error: 'Esse e-mail já esta em uso'});
        }
        if(autorizacao !== 'admin' && autorizacao !== 'user'){
            return res.status(422).send({error: 'A autorização so pode ser admin ou user'});
        }
        var user = new User({
            nome: nome,
            email: email,
            senha: senha,
            autorizacao: autorizacao,
        });

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }
            var userInfo = setUserInfo(user);
            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })
        });
    });
};
