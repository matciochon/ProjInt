const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

router.get('/new', reservationController.showReservationForm);

router.post('/new', reservationController.submitReservation);

router.get('/', reservationController.getAllReservations);

module.exports = router;