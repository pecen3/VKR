const Router = require('express');
const {pool} = require('../database')
const router = new Router();


router.get('/:id', async (req, res) => {
  const categoryId = req.params.id;
  const query = {
    text: `SELECT name FROM category WHERE id = $1`,
    values: [categoryId]
  };

  try {
    const result = await pool.query(query);
    if (result.rows.length > 0) {
      const category_name = result.rows[0].name;
      res.json({ category_name });
    } else {
      res.status(404).json({ error: 'Не найдено' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
});



module.exports = router;
