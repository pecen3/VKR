const Router = require('express');
const categoriesController = require('../controllers/categoriesController')
const router = new Router();


router.get('/:id', categoriesController.getOne);
router.get('/', categoriesController.getAll);


module.exports = router;
