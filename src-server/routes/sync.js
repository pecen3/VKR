const Router = require('express');
const router = new Router();
const marketController = require('../controllers/marketController');
const settingsController = require('../controllers/settingsController');


router.get('/assortment', marketController.getAssortment);

router.get('/', settingsController.getAllUserInfo);

router.patch('/sync-period', settingsController.updateSyncPeriod);

router.patch('/reprice-period', settingsController.updateRepricePeriod);

router.get('/database-dump', settingsController.getDatabaseDump);



module.exports = router;
