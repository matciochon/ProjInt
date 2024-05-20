const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const { sequelize } = require('./models/db');
const Item = require('./models/item');
const initialItems = [
    { nazwa: 'Stół pingpongowy', opis: 'Stół do tenisa stołowego w korytarzu G-1', kategoria: 'Sprzęt sportowy' },
    { nazwa: 'Projektor', opis: 'Projektor z intytutu fizyki', kategoria: 'Electronika' },
];
sequelize.sync()
    .then(() => {
        return Promise.all(initialItems.map(item => Item.create(item)));
    })
    .then(() => {
        console.log('Początkowe przedmioty dodane do bazy danych');
    })
    .catch(err => {
        console.error('Błąd przy dodawaniu przedmiotów do bazy:', err);
    });

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const indexRoute = require('./routes/index');
const itemRoute = require('./routes/items');
const itemRouteAPI = require('./routes/api/items');
const reservationRoute = require('./routes/reservations');
const reservationRouteAPI = require('./routes/api/reservations');

app.use('/', indexRoute);
app.use('/items', itemRoute);
app.use('/reservations', reservationRoute);

app.use('/api/items', itemRouteAPI);
app.use('/api/reservations', reservationRouteAPI);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));