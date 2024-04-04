const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

const indexRoute = require('./routes/index');
const itemRoute = require('./routes/items');
const reservationRoute = require('./routes/reservations');

app.use('/', indexRoute);
app.use('/items', itemRoute);
app.use('/reservations', reservationRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));