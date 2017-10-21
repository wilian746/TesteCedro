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
    const sortObj = sortAndOrderBy(req.query.sort, req.query.orderBy);
    const limit = req.query.limit;
    const skip = req.query.skip;
    const select = req.query.select;

    const search = {};
    search[req.query.key] = req.query.text;

    var query = Produto.find(search)
        .sort(sortObj)
        .limit(Number(limit))
        .skip(Number(skip))
        .select(select);

    query.exec(function (err, produtos) {
        if (err)
            return res.status(500).send({message: 'Erro ao buscar Produtos', error: err});

        if (!produtos || !produtos.length)
            return res.status(422).send({message: 'Nenhum produto foi encontrado'});

        res.status(200).json(produtos);
    });
};

exports.getProduto = function (req, res, next) {
    const select = req.query.select;
    
        var query = Produto.find({$and: [{id_produto: req.params.id_produto}, {_id: req.params.id_produto}]}).select(select);
        query.exec(function (err, produtos) {
            if (err)
                return res.status(500).send({message: 'Erro ao buscar produto', error: err});
    
            if (!produtos || !produtos.length)
                return res.status(422).send({message: 'Nenhum produto foi encontrado'});
    
            return res.status(200).json(produtos);
        });
};



exports.registroDeProduto = function (req, res, next) {
    if (req.user.autorizacao === 'user') {
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

exports.updateDeProduto = function (req, res, next) {
    if (req.user.autorizacao === 'user') {
        res.status(401).send({message: 'Você não está autorizado a fazer Update de Produto'});
        return next('Não autorizado');
    }
    var optionsObj = {
        new: true,
        upsert: true
    };
    
    Produto.findByIdAndUpdate(req.params.id_produto, {$set: req.body}, optionsObj, function (err, updateProduto) {
        if (err)
            return res.status(500).send({message: 'Erro ao atualizar Produto', error: err});

        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            produto: updateProduto
        });
    });
};

exports.deleteDeProduto = function (req, res, next) {
    if (req.user.autorizacao === 'user') {
        res.status(401).send({message: 'Você não está autorizado a Deletar Produto'});
        return next('Não autorizado');
    }
    const id_produto = req.params.id_produto;

    Produto.findById(id_produto, function (err, foundProduto) {
        if (err)
            res.status(422).send({message: 'Produto não encontrado', error: err});

        Produto.remove({_id: id_produto}, function (err, deleted) {
            if (err)
                return res.status(500).send({message: 'Erro ao excluir Produto', error: err});
            else
                return res.status(200).send({message: 'Produto excluído com sucesso'});
        });
    });
};