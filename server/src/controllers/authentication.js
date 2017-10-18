'use strict';
const jwt = require('jsonwebtoken');//token para criptografia de senha
const User = require('../models/user'); 
const Produto = require('../models/produto'); 
const moment = require('moment'); //usado para gerar o token baseado no dia
moment.locale('pt-BR');

const expires = moment().add(7, 'days').valueOf();

function generateToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, {
        expiresIn: expires
    });
}

function pegarInformacoesDaRequisicao(request) {
    return {
        _id: request._id,
        nome: request.nome,
        email: request.email
    };
}

exports.login = function (req, res, next) {
    var InformacoesDoUsuario = pegarInformacoesDaRequisicao(req.user);

    res.status(200).json({
        token: 'JWT ' + generateToken(InformacoesDoUsuario),
        expiresIn: expires,
        user: InformacoesDoUsuario
    });
};


exports.registroDeUsuario = function (req, res, next) {
    var nome = req.body.nome;
    var email = req.body.email;
    var senha = req.body.senha;

    if (!nome) {
        return res.status(422).send({error: 'Você deve informar seu nome e sobrenome'});
    }

    if (!email) {
        return res.status(422).send({error: 'Você deve digitar um e-mail'});
    }

    if (!senha) {
        return res.status(422).send({error: 'Você deve digitar uma senha'});
    }

    User.findOne({email: email}, function (err, jaExisteAlgumUser) {
        if (err) {
            return next(err);
        }

        if (jaExisteAlgumUser) {
            return res.status(422).send({error: 'Esse e-mail já esta em uso'});
        }

        var user = new User({
            nome: nome,
            email: email,
            senha: senha
        });

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            var userInfo = pegarInformacoesDaRequisicao(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });
    });
};

exports.registroDeProduto = function (req, res, next) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if (!name) {
        return res.status(422).send({error: 'Você deve informar seu nome e sobrenome'});
    }

    if (!email) {
        return res.status(422).send({error: 'Você deve digitar um e-mail'});
    }

    if (!password) {
        return res.status(422).send({error: 'Você deve digitar uma senha'});
    }

    User.findOne({email: email}, function (err, jaExisteAlgumUser) {
        if (err) {
            return next(err);
        }

        if (jaExisteAlgumUser) {
            return res.status(422).send({error: 'Esse e-mail já esta em uso'});
        }

        var user = new User({
            name: name,
            email: email,
            password: password
        });

        user.save(function (err, user) {
            if (err) {
                return next(err);
            }

            var userInfo = pegarInformacoesDaRequisicao(user);

            res.status(201).json({
                token: 'JWT ' + generateToken(userInfo),
                user: userInfo
            })

        });
    });
};
