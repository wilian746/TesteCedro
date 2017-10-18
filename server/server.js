const express = require('express'); // framework para inicializar um servidor de roteamento para desenvolver aplicações web
const compression = require('compression'); // compactar Gzip diminuindo o corpo de resposta e aumentar a velocidade da aplicação.
const bodyParser = require('body-parser'); // Retorna ao middleware que so analisa o json
const logger = require('morgan'); // logger para registrar as requisições no servidor
const errorHandler = require('errorhandler'); // manipulador de erros para aplicações Express
const dotenv = require('dotenv'); // modulo de dependencia que carrega variaveis de ambiente de um arquivo
const mongoose = require('mongoose'); // mongoose é uma biblioteca que contem mapeamento de objetos do MongoDB similar ao ORM
const cors = require('cors');  // biblioteca que faz a conexão com o express

/**
 * Carrega variaveis do arquivo .env, onde contem chaves, senhas da API.
 */
dotenv.load({path: '.env'});

/**
 * Cria Server Express
 */
const app = express();
const server = require("http").Server(app);

/**
 * Express, cors, logger, compression configurações.
 */
app.set('port', process.env.PORT || 3000);
app.use(compression());
app.use(logger('dev'));
app.use(cors({
    origin: '*',
    withCredentials: false,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept', 'Origin']
}));
app.use(errorHandler());

/**
 * Iniciar body e cookie dentro do req
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Conexão com o MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function () {
    console.error('Falha ao conectar com o Banco de Dados');
    process.exit(1);
});

/**
 * Carregar modules e rotas do app
 * Load app modules and routes
 */
const router = require('./src/app/routes/api')(app);

/**
 * Iniciar Express server.
 */
server.listen(app.get('port'), function () {
    console.log('Servidor rodando na porta ' + app.get('port') + ' em modo ' + app.get('env'));
});



module.exports = app;