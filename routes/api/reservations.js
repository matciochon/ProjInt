const express = require('express');
const router = express.Router();
const reservationController = require('../../controllers/reservationController');

router.post('/new', reservationController.submitReservationAPI);

router.get('/', reservationController.getAllReservationsAPI);

module.exports = router;