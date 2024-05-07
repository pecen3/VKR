const Router = require('express');
const router = new Router();
const rulesController = require('../controllers/rulesController')



router.get('/', rulesController.getAll );
router.get('/:id',rulesController.getOne);
router.post('/',rulesController.addRule);
router.patch('/:id',rulesController.changeRule);
router.post('/product', rulesController.changeProductRule)
router.delete('/:id',rulesController.deleteRule);

module.exports = router;
