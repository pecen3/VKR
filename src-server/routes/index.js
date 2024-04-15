const Router = require('express');
const router = new Router();
const parseRouter = require('./parse')
const syncRouter = require('./sync')
const statisticRouter = require('./statistic')
// const marketController = require('../controllers/marketController'); 

// router.get('/assortment', marketController.getAssortment);
router.use('/sync', syncRouter)
router.use('/parse', parseRouter)
router.use('/statistic', statisticRouter)


module.exports = router;
