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
    }
}, {timestamps: true});

UserSchema.pre('save', function (next) {
    var user = this;
    var SALT_FACTOR = 5;

    // Verifica se o hash da senha foi modificado (ou é novo)
    if (!user.isModified('senha')) return next();

    // Gera o Salt para fazer a criptografia da senha
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

//verifica se a senha é igual
UserSchema.methods.compareSenha = function (senhaAttempt, cb) {
    bcrypt.compare(senhaAttempt, this.senha, function (err, isMatch) {
        if (err) {
            return cb(err);
        } else {
            cb(null, isMatch);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);