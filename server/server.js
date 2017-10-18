/**
 * Module dependencies.
 */
const express = require('express');
const compression = require('compression');
const bodyParser = require('body-parser');
const logger = require('morgan');
const errorHandler = require('errorhandler');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env'});

/**
 * Create Express server.
 */
const app = express();
const server = require("http").Server(app);

/**
 * Express, cors, logger, compression configuration.
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
 * Init body and cookie inside req
 * */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/**
 * Connect to MongoDB.
 */
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on('error', function () {
    console.error('Falha ao conectar com o Banco de Dados');
    process.exit(1);
});

/**
 * Load app modules and routes
 */
const router = require('./src/app/routes/api')(app);

/**
 * Start Express server.
 */
server.listen(app.get('port'), function () {
    console.log('Servidor rodando na porta ' + app.get('port') + ' em modo ' + app.get('env'));
});



module.exports = app;