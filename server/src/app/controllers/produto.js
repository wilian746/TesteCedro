'use strict';
const mongoose = require('mongoose');
const moment = require('moment');
moment.locale('pt-BR');

const Produto = require('../models/produto');

function sortAndOrderBy(sort, orderBy) {
    if (sort) {
        sort = sort.split(' ');
    } else {
        sort = 'asc';
    }

    if (orderBy) {
        orderBy = orderBy.split(' ');
    } else {
        orderBy = 'createdAt';
    }
        
    var sortObj = {};
    for (var i=0; i < orderBy.length; i++) {
        if (sort[i] !== 'asc' || sort[i] == 1) {
            sort = 1; //desc
        } else {
            sort = -1; //asc
        }

        sortObj[orderBy[i]] = sort;
    }

    return sortObj;
}

exports.getAllProdutos = function (req, res, next) {
// GET todos os Produtos
};

exports.getProdutos = function (req, res, next) {
// GET apenas um Produto
};


exports.registroDeProduto = function (req, res, next) {
    if (req.user.autorizacao !== 'admin') {
        res.status(401).send({message: 'Você não está autorizado a cadastrar Produto'});
        return next('Não autorizado');
    }

    Produto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        id_user: req.user._id
    }, function (err, produto) {
        if (err)
            return res.status(500).send({message: 'Erro ao criar Produto', error: err});

        res.status(201).send({
            message: 'Produto criado com sucesso',
            produto: produto
        });
    });
};

exports.update = function (req, res, next) {
    var optionsObj = {
        new: true,
        upsert: true
    };
    
    Produto.findByIdAndUpdate(req.params.id_produto, {$set: req.body}, optionsObj, function (err, updateProduto) {
        if (err)
            return res.status(500).send({message: 'Erro ao atualizar Produto', error: err});

        if (updateProduto.id_user.toString() !== req.user._id.toString() && req.user.autorizacao !== 'admin') {
            res.status(401).send({message: 'Você não está autorizado a modificar este Produto'});
            return next('Não autorizado');
        }

        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            produto: updateProduto
        });
    });
};

exports.delete = function (req, res, next) {
    const id_produto = req.params.id_produto;

    Produto.findById(id_produto, function (err, foundProduto) {
        if (err)
            res.status(422).send({message: 'Produto não encontrado', error: err});

        if (foundProduto.id_user.toString() !== req.user._id.toString() && req.user.autorizacao !== 'admin') {
            res.status(401).send({message: 'Você não está autorizado a excluir este Produto'});
            return next('Não autorizado');
        }

        Produto.remove({_id: id_produto}, function (err, deleted) {
            if (err)
                return res.status(500).send({message: 'Erro ao excluir Produto', error: err});
            else
                return res.status(200).send({message: 'Produto excluído com sucesso'});
        });
    });
};