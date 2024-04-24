const Router = require('express');
const router = new Router();
const parseRouter = require('./parse')
const syncRouter = require('./sync')
const statisticRouter = require('./statistic')
const competitorsRouter = require('./competitors');
const productRouter = require('./ourproduct');
const rulesRouter = require('./rules');
// const marketController = require('../controllers/marketController'); 

// router.get('/assortment', marketController.getAssortment);

router.use('/sync', syncRouter)
router.use('/parse', parseRouter)
router.use('/statistic', statisticRouter)
router.use('/competitors', competitorsRouter)
router.use('/products',productRouter )
router.use('/rules',rulesRouter )



module.exports = router;
