const express = require('express');
const router = express.Router();
const itemController = require('../../controllers/itemController');

router.get('/', itemController.getAllItemsAPI);

router.get('/:id', itemController.getItemByIdAPI);

module.exports = router;