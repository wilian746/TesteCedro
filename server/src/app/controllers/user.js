const User = require('../models/user');

function sortAndOrderBy(keySort, keyOrderBy) {
    var sort = 'asc';
    if (keySort)
        sort = keySort;

    var orderBy = 'createdAt';
    if (keyOrderBy)
        orderBy = keyOrderBy;

    const sortObj = {};
    sortObj[orderBy] = sort;

    return sortObj;
}

exports.getAllUsers = function (req, res, next) {
//rota para trazer todos os usuarios
};

exports.getUser = function (req, res, next) {
//rota para trazer apenas 1 usuario
};