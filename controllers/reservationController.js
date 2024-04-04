const reservationModel = require('../models/reservation');
const itemModel = require('../models/item');

exports.showReservationForm = (req, res) => {
   
    itemModel.getAllItems((err, items) => {
        if (err) {
            return res.status(500).send('Błąd przy pobieraniu listy przedmiotów');
        }

        res.render('reservation_form', { items });
    });
};

exports.submitReservation = (req, res) => {
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

    reservationModel.getReservationsByItemId(item_id, (err, reservations) => {
        if (err) {
            return res.status(500).send('Błąd przy pobieraniu listy rezerwacji');
        }

        const collision = reservations.some(reservation => {
            return !(new Date(start_date) >= new Date(reservation.data_do) || new Date(end_date) <= new Date(reservation.data_od));
        });

        if (collision) {
            return res.status(400).send('Nowa rezerwacja koliduje z istniejącymi rezerwacjami dla tego przedmiotu.');
        }

        const reservation = {
            id_przedmiotu: item_id,
            imię_nazwisko: name,
            data_od: start_date,
            data_do: end_date,
            komentarz: comment
        };

        reservationModel.addReservation(reservation, (err, reservationId) => {
            if (err) {
                return res.status(500).send('Błąd przy dodawaniu rezerwacji');
            }
            res.redirect('/reservations');
        });
    });
};

exports.getAllReservations = (req, res) => {
    reservationModel.getAllReservations((err, reservations) => {
        if (err) {
            return res.status(500).send('Błąd przy pobieraniu listy rezerwacji');
        }

        itemModel.getAllItems((err, items) => {
            if (err) {
                return res.status(500).send('Błąd przy pobieraniu listy przedmiotów');
            }

            const itemMap = {};
            items.forEach(item => {
                itemMap[item.id] = item.nazwa;
            });

            reservations.forEach(reservation => {
                reservation.item_name = itemMap[reservation.id_przedmiotu];
            });

            const groupedReservations = reservations.reduce((acc, reservation) => {
                const itemName = reservation.item_name;
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
        });
    });
};