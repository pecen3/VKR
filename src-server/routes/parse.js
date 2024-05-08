const Router = require('express');
const router = new Router();
const parseController = require('../controllers/parseController')



router.get('/', parseController.getAll);
router.put('/:id', parseController.changeOne);
router.post('/', parseController.addSite);



module.exports = router;
