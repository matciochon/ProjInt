const db = require('./db');

exports.addReservation = (reservation, callback) => {
    const { id_przedmiotu, imię_nazwisko, data_od, data_do, komentarz } = reservation;
    db.run('INSERT INTO Reservations (id_przedmiotu, imię_nazwisko, data_od, data_do, komentarz) VALUES (?, ?, ?, ?, ?)',
        [id_przedmiotu, imię_nazwisko, data_od, data_do, komentarz],
        function (err) {
            callback(err, this.lastID);
        }
    );
};

exports.getAllReservations = (callback) => {
    db.all('SELECT * FROM Reservations', callback);
};

exports.getReservationsByItemId = (itemId, callback) => {
    db.all('SELECT * FROM Reservations WHERE id_przedmiotu = ?', [itemId], callback);
};