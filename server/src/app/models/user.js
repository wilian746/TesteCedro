var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: [true, 'Informe seu nome e sobrenome']
    },
    email: {
        type: String,
        lowercase: true,
        index: {unique: true},
        required: [true, 'Um e-mail deve ser informado'],
        validate: function (email) {
            return /^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)
        }
    },
    senha: {
        type: String,
        required: [true, 'Uma senha deve ser informada']
    },
    autorizacao:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {timestamps: true});

UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;

    // Verifica se o hash da senha foi modificado (ou é novo)
    if (!user.isModified('senha')) return next();

    // Gera o Salt
    bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        if (err) return next(err);

        // Gera o Hash da senha junto com o Salt
        bcrypt.hash(user.senha, salt, null, function (err, hash) {
            if (err) return next(err);

            // substitui a senha da variavel pelo hash
            user.senha = hash;
            next();
        });
    });
});

UserSchema.methods.compareSenhaDoLogin = function (senhaAttempt, tipoResposta) {
    bcrypt.compare(senhaAttempt, this.senha, function (err, isMatch) {
        if (err) {
            return tipoResposta(err);
        } else {
            tipoResposta(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);