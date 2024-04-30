const Router = require('express');
const ourproductController = require('../controllers/ourproductController');
const router = new Router();


router.get('/', ourproductController.getAll); // все товары
router.get('/:id', ourproductController.getOne); //один товар, TODO??? ВМЕСТЕ СО СПИСКОМ КОНКУРЕНТОВ И ИХ ЦЕНАМИ. уже готовый ответ для раскрытия
router.post('/:id', ourproductController.setMinPrice); // изменить мин цену нашего товара. 
router.get('/competitors/:id', ourproductController.getAllCompetitorsProducts); // все товары конкурентов 
router.get('/history/:id', ourproductController.getHistory); // история
router.get('/detailcomp/:id', ourproductController.getDetailedComp); // товары конкурентов с названиями магазов
module.exports = router;
