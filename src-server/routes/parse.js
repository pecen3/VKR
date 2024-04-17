const Router = require('express');
const router = new Router();
const parseController = require('../controllers/parseController')

// router.get('/', (req, res) => {
//   res.json({message: 'ok'})
// });

router.get('/', parseController.getParse );
router.post('/',parseController.postParse );



module.exports = router;
