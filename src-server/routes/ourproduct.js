const Router = require('express');
const ourproductController = require('../controllers/ourproductController');
const router = new Router();


router.get('/', ourproductController.getAll); //to do 
router.get('/:id', ourproductController.getOne);
router.get('/competitors/:id', ourproductController.getAllCompetitorsProducts);


module.exports = router;
