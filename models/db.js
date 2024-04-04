const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

db.serialize(() => {

    db.run('CREATE TABLE IF NOT EXISTS Items (id INTEGER PRIMARY KEY, nazwa TEXT, opis TEXT, kategoria TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Reservations (id INTEGER PRIMARY KEY, id_przedmiotu INTEGER, imię_nazwisko TEXT, data_od DATETIME, data_do DATETIME, komentarz TEXT)');

    const initialItems = [
        { nazwa: 'Stół pingpongowy', opis: 'Stół do tenisa stołowego w korytarzu G-1', kategoria: 'Sprzęt sportowy'},
        { nazwa: 'Projektor', opis: 'Projektor z intytutu fizyki', kategoria: 'Electronika'},
    ];

    const insertStmt = db.prepare('INSERT INTO Items (nazwa, opis, kategoria) VALUES (?, ?, ?)');
    initialItems.forEach(item => {
        insertStmt.run(item.nazwa, item.opis, item.kategoria);
    });
    insertStmt.finalize();
});

module.exports = db;