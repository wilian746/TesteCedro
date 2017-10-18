var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do produto']
    },
    descricao: {
        type: String,
        required: [true, 'Informe a Descrição do produto']
    },
    preco: {
        type: Number,
        lowercase: true,
        required: [true, 'Informe o preço do produto']
    },
}, {timestamps: true});


module.exports = mongoose.model('Produto', ProdutoSchema);