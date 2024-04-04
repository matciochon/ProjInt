const db = require('../models/db');

exports.getAllItems = (req, res) => {
    db.all('SELECT * FROM Items', (err, rows) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        res.render('items', { items: rows });
    });
};

exports.getItemById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM Items WHERE id = ?', [id], (err, row) => {
        if (err) {
            return res.status(500).send('Internal Server Error');
        }
        if (!row) {
            return res.status(404).send('Nie znaleniono przedmiotu');
        }
        res.render('item', { item: row });
    });
};
