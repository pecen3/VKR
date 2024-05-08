const {pool} = require('../database')
const axios = require('axios');
const BASE_URL = process.env.BASE_URL;

class categoriesController {
  async getAll(req, res) {
    try {
      
      const { rows } = await pool.query('SELECT * FROM categories');
      
      res.json( rows );
    } catch (error) {
      
      console.error('Error getting products:', error);
      res.status(500).json({ message: 'Error getting products from database' });
    }
  };
  async getOne(req, res){
    const categoryId = req.params.id;
    const query = {
      text: `SELECT name FROM categories WHERE id = $1`,
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
  }

}

module.exports = new categoriesController() 