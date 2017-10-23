const express = require('express')
const passportService = require('../../config/passport')
const passport = require('passport')

const AuthenticationController = require('../controllers/authentication')
const UserController = require('../controllers/user')
const ProdutoController = require('../controllers/produto')

const requireAuth = passport.authenticate('jwt', {session: false})
const requireLogin = passport.authenticate('local', {session: false})

module.exports = function (app) {
    const versionApi = express.Router()
    const apiRoutes = express.Router()
    const authRoutes = express.Router()
    const userRoutes = express.Router()
    const produtoRoutes = express.Router()

    app.use('/api', versionApi)

    versionApi.use('/v1',

        // Home
        authRoutes.get('/', function (req, res) {
            res.writeHead(200, {'Content-Type': 'text/plain'})
            res.end('Hello there, world!\n')
        }),

        // Auth Routes
        apiRoutes.use('/auth',
            authRoutes.post('/registroDeUsuario',AuthenticationController.registroDeUsuario),
            authRoutes.post('/login', requireLogin, AuthenticationController.login)
        ),

        // User Routes
        apiRoutes.use('/user',
            userRoutes.get('/', requireAuth, UserController.getAllUsers),
            userRoutes.get('/:id_user', requireAuth, UserController.getUser)
        ),

        // Project Routes
        apiRoutes.use('/produto',
            produtoRoutes.get('/', ProdutoController.getAllProdutos),
            produtoRoutes.get('/:id_produto' , ProdutoController.getProduto),
            produtoRoutes.post('/registroDeProduto', requireAuth,ProdutoController.registroDeProduto),
            produtoRoutes.put('/:id_produto',requireAuth, ProdutoController.updateDeProduto),
            produtoRoutes.delete('/:id_produto', requireAuth,ProdutoController.deleteDeProduto)
        )        
    )
}
