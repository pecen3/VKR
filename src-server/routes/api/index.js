const express = require('express');
const router = express.Router();
const marketController = require('../controllers/marketController');

router.get('/assortment', marketController.getAssortment);

module.exports = router;
