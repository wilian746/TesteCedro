var mongoose = require('mongoose');

var ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe o nome do produto']
    },
    descricao: {
        type: String,
        required: [true, 'Uma descrição para o produto deve ser informado'],
    },
    preco: {
        type: String,
        required: [true, 'Um preco deve ser informado']
    },
    id_user: {
        type: mongoose.Schema.ObjectId,
        required: true
    }
}, {timestamps: true});


module.exports = mongoose.model('Produto', ProdutoSchema);