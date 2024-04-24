const Router = require('express');
const competitorController = require('../controllers/competitorController');
const router = new Router();


router.get('/', ); //to do 
router.post('/', competitorController.postCompetitor ); //добавить  конкурента
router.post('/addproduct', competitorController.addProduct );//добавить продукт конкурента
router.delete('/', competitorController.deleteCompetitor ); //удалить продукт конкурента




module.exports = router;
