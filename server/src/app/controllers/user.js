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
    const sortObj = sortAndOrderBy(req.query.sort, req.query.orderBy);
    const limit = req.query.limit;
    const skip = req.query.skip;
    const select = req.query.select;

    const search = {};
    search[req.query.key] = req.query.text;

    var query = User.find(search)
        .sort(sortObj)
        .limit(Number(limit))
        .skip(Number(skip))
        .select(select);

    query.exec(function (err, users) {
        if (err)
            return res.status(500).send({error: err});

        return res.status(200).json(users);
    });
};

exports.getUser = function (req, res, next) {
    const select = req.query.select;

    var query = User.findById(req.params.id_user).select(select);
    query.exec(function (err, users) {
        if (err)
            return res.status(500).send({message: 'Nenhum usuário foi encontrado', error: err});

        return res.status(200).json(users);
    });
};