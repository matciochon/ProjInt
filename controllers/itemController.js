const Item = require('../models/item');

exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.render('items', { items });
    } catch (error) {
        console.error('Błąd przy pobieraniu listy przedmiotów:', error);
        res.status(500).send('Błąd przy pobieraniu listy przedmiotów');
    }
};

exports.getAllItemsAPI = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.json(items);
    } catch (error) {
        console.error('Błąd przy pobieraniu listy przedmiotów:', error);
        res.status(500).json({ error: 'Błąd przy pobieraniu listy przedmiotów' });
    }
};

exports.getItemById = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).send('Nie znaleziono przedmiotu');
        }
        res.render('item', { item });
    } catch (error) {
        console.error('Błąd przy pobieraniu listy przedmiotów:', error);
        res.status(500).send('Błąd przy pobieraniu listy przedmiotów');
    }
};

exports.getItemByIdAPI = async (req, res) => {
    const id = req.params.id;
    try {
        const item = await Item.findByPk(id);
        if (!item) {
            return res.status(404).send('Nie znaleziono przedmiotu');
        }
        res.json({ item });
    } catch (error) {
        console.error('Błąd przy pobieraniu listy przedmiotów:', error);
        res.status(500).json({ error: 'Błąd przy pobieraniu listy przedmiotów' });
    }
};

