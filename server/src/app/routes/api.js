'use strict';
const express = require('express'),
    passportService = require('../../config/passport'),
    passport = require('passport');

const AuthenticationController = require('../controllers/authentication');
const UserController = require('../controllers/user');
const ProdutoController = require('../controllers/produto');

const requireAuth = passport.authenticate('jwt', {session: false});
const requireLogin = passport.authenticate('local', {session: false});


module.exports = function (app) {

    const versionApi = express.Router(),
        apiRoutes = express.Router(),
        authRoutes = express.Router(),
        userRoutes = express.Router(),
        produtoRoutes = express.Router();

    // Set up routes
    app.use('/api', versionApi);

    // Api V1
    versionApi.use('/v1',
        // Home
        authRoutes.get('/', function (req, res) {
            //res.send({content: 'Success'});
            res.writeHead(200, {'Content-Type': 'text/plain'});
            res.end('Hello there, world!\n');
        }),

        // Auth Routes
        apiRoutes.use('/auth',
            authRoutes.post('/registroDeUsuario', AuthenticationController.registroDeUsuario),
            authRoutes.post('/login', requireLogin, AuthenticationController.login)
            
        ),

        // User Routes
        /*apiRoutes.use('/user',
        userRoutes.get('/', requireAuth, UserController.getAllUsers),
        userRoutes.get('/:id_user', requireAuth, UserController.getUser)
        ),
*/
        // Project Routes
        apiRoutes.use('/produto',
        produtoRoutes.get('/', requireAuth, ProdutoController.getAllProdutos),
        produtoRoutes.get('/:id_produto', requireAuth, ProdutoController.getProduto),
        produtoRoutes.post('/registroDeProduto', requireAuth, ProdutoController.registroDeProduto),
        produtoRoutes.put('/:id_produto', requireAuth, ProdutoController.updateDeProduto),
        produtoRoutes.delete('/:id_produto', requireAuth, ProdutoController.deleteDeProduto)
        )

        
    );
};
