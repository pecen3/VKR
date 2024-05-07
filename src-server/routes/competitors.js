const Router = require('express');
const competitorController = require('../controllers/competitorController');
const router = new Router();


router.get('/', competitorController.getAll ); 
router.post('/', competitorController.postCompetitor ); //добавить  конкурента
router.delete('/:id', competitorController.deleteCompetitor ); //удалить конкурента
router.post('/addproduct', competitorController.addProduct );//добавить продукт конкурента
router.delete('/deleteproduct/:id', competitorController.deleteProduct );//удалить продукт конкурента




module.exports = router;
