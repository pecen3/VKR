const Router = require('express');
const router = new Router();
const marketController = require('../controllers/marketController');

router.get('/assortment', marketController.getAssortment);



module.exports = router;
