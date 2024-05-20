const Sequelize = require('sequelize');
const Reservation = require('../models/reservation');
const Item = require('../models/item');

exports.showReservationForm = async (req, res) => {
    try {
        const items = await Item.findAll();
        res.render('reservation_form', { items });
    } catch (err) {
        console.error('Błąd przy pobieraniu listy przedmiotów:', err);
        return res.status(500).send('Błąd przy pobieraniu listy przedmiotów');
    }
};

exports.submitReservation = async (req, res) => {
    const { item_id, name, start_date, end_date, comment } = req.body;

    if (!item_id || !name || !start_date || !end_date) {
        return res.status(400).send('Wszystkie pola wymagane');
    }

    if (!(new Date(start_date) < new Date(end_date))) {
        return res.status(400).send('Data końcowa musi być po dacie początkowej');
    }

    if (new Date(start_date) < new Date()) {
        return res.status(400).send('Data początkowa musi być w przyszłości');
    }

    const durationMs = new Date(end_date) - new Date(start_date);
    const durationDays = durationMs / (1000 * 60 * 60 * 24);
    if (durationDays > 7) {
        return res.status(400).send('Rezerwacja nie może trwać dłużej niż 7 dni');
    }

    try {
        const reservations = await Reservation.findAll({
            where: {
                id_przedmiotu: item_id,
                data_do: { [Sequelize.Op.gt]: start_date },
                data_od: { [Sequelize.Op.lt]: end_date }
            }
        });

        if (reservations.length > 0) {
            return res.status(400).send('Nowa rezerwacja koliduje z istniejącymi rezerwacjami dla tego przedmiotu.');
        }

        const reservation = await Reservation.create({
            id_przedmiotu: item_id,
            imię_nazwisko: name,
            data_od: start_date,
            data_do: end_date,
            komentarz: comment
        });

        res.redirect('/reservations');
    } catch (err) {
        console.error('Błąd przy dodawaniu rezerwacji:', err);
        return res.status(500).send('Błąd przy dodawaniu rezerwacji');
    }
};

exports.getAllReservations = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        const items = await Item.findAll();

        const itemMap = items.reduce((acc, item) => {
            acc[item.id] = item.nazwa;
            return acc;
        }, {});

        const groupedReservations = reservations.reduce((acc, reservation) => {
            const itemName = itemMap[reservation.id_przedmiotu];
            if (!acc[itemName]) {
                acc[itemName] = [];
            }
            acc[itemName].push(reservation);
            return acc;
        }, {});

        for (const itemName in groupedReservations) {
            groupedReservations[itemName].sort((a, b) => new Date(a.data_od) - new Date(b.data_od));
        }

        res.render('reservations', { groupedReservations });
    } catch (err) {
        console.error('Błąd przy pobieraniu rezerwacji:', err);
        return res.status(500).send('Błąd przy pobieraniu rezerwacji');
    }
};

///////////////////////////////////////////


exports.submitReservationAPI = async (req, res) => {
    const { item_id, name, start_date, end_date, comment } = req.body;

    if (!item_id || !name || !start_date || !end_date) {
        return res.status(400).json('Wszystkie pola wymagane');
    }

    if (!(new Date(start_date) < new Date(end_date))) {
        return res.status(400).json('Data końcowa musi być po dacie początkowej');
    }

    if (new Date(start_date) < new Date()) {
        return res.status(400).json('Data początkowa musi być w przyszłości');
    }

    const durationMs = new Date(end_date) - new Date(start_date);
    const durationDays = durationMs / (1000 * 60 * 60 * 24);
    if (durationDays > 7) {
        return res.status(400).json('Rezerwacja nie może trwać dłużej niż 7 dni');
    }

    try {
        const reservations = await Reservation.findAll({
            where: {
                id_przedmiotu: item_id,
                data_do: { [Sequelize.Op.gt]: start_date },
                data_od: { [Sequelize.Op.lt]: end_date }
            }
        });

        if (reservations.length > 0) {
            return res.status(400).json('Nowa rezerwacja koliduje z istniejącymi rezerwacjami dla tego przedmiotu.');
        }

        const reservation = await Reservation.create({
            id_przedmiotu: item_id,
            imię_nazwisko: name,
            data_od: start_date,
            data_do: end_date,
            komentarz: comment
        });

        res.redirect('/reservations');
    } catch (err) {
        console.error('Błąd przy dodawaniu rezerwacji:', err);
        return res.status(500).json('Błąd przy dodawaniu rezerwacji');
    }
};

exports.getAllReservationsAPI = async (req, res) => {
    try {
        const reservations = await Reservation.findAll();
        const items = await Item.findAll();

        const itemMap = items.reduce((acc, item) => {
            acc[item.id] = item.nazwa;
            return acc;
        }, {});

        const groupedReservations = reservations.reduce((acc, reservation) => {
            const itemName = itemMap[reservation.id_przedmiotu];
            if (!acc[itemName]) {
                acc[itemName] = [];
            }
            acc[itemName].push(reservation);
            return acc;
        }, {});

        for (const itemName in groupedReservations) {
            groupedReservations[itemName].sort((a, b) => new Date(a.data_od) - new Date(b.data_od));
        }

        res.json({groupedReservations});
    } catch (err) {
        console.error('Błąd przy pobieraniu rezerwacji:', err);
        return res.status(500).json('Błąd przy pobieraniu rezerwacji');
    }
};