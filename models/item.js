const db = require('./db');

exports.getAllItems = (callback) => {
    db.all('SELECT * FROM Items', callback);
};

exports.getItemById = (id, callback) => {
    db.get('SELECT * FROM Items WHERE id = ?', [id], callback);
};