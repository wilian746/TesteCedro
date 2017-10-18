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

exports.registroDeProduto = function (req, res, next) {
    if (req.user.role !== 'admin') {
        res.status(401).send({message: 'Você não está autorizado a cadastrar produto'});
        return next('Não autorizado');
    }

    Produto.create({
        nome: req.body.nome,
        descricao: req.body.descricao,
        preco: req.body.preco,
        id_user: req.user._id
    }, function (err, produto) {
        if (err)
            return res.status(500).send({message: 'Erro ao criar produto', error: err});

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
            return res.status(500).send({message: 'Erro ao atualizar projeto', error: err});

        if (updateProject.id_user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401).send({message: 'Você não está autorizado a modificar este projeto'});
            return next('Não autorizado');
        }

        res.status(200).send({
            message: 'Projeto atualizado com sucesso',
            project: updateProject
        });
    });
};

exports.delete = function (req, res, next) {
    const id_project = req.params.id_project;

    Project.findById(id_project, function (err, foundProject) {
        if (err)
            res.status(422).send({message: 'Projeto não encontrado', error: err});

        if (foundProject.id_user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
            res.status(401).send({message: 'Você não está autorizado a excluir este projeto'});
            return next('Não autorizado');
        }

        Project.remove({_id: id_project}, function (err, deleted) {
            if (err)
                return res.status(500).send({message: 'Erro ao excluir projeto', error: err});

            Story.remove({id_project: id_project}, function (err, deleted) {
                if (err)
                    return res.status(500).send({message: 'Projeto excluído mas com erro ao excluir estória', error: err});

                StoryVoted.remove({id_project: id_project}, function (err, deleted) {
                    if (err)
                        return res.status(500).send({message: 'Projeto e Estórias foram excluídos mas teve erro ao excluir as cartas votadas no projeto.', error: err});

                    return res.status(200).send({message: 'Projeto excluído com sucesso'});
                });
            });
        });
    });
};