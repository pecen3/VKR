const Router = require('express');
const competitorController = require('../controllers/competitorController');
const router = new Router();


router.get('/', ); //to do 
router.post('/', competitorController.postCompetitor );
router.post('/addproduct', competitorController.addProduct );//sдобавить продукт конкурента
router.delete('/', competitorController.deleteCompetitor );




module.exports = router;
