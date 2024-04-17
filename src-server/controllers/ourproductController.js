const {pool} = require('../database')

class ourproductController {
  async getAll(req, res) {
    try {
      
      const { rows } = await pool.query('SELECT * FROM store_products');
      
      res.json({ message: 'All products retrieved successfully', data: rows });
    } catch (error) {
      
      console.error('Error getting products:', error);
      res.status(500).json({ message: 'Error getting products from database' });
    }
  };
  async getOne(req, res) {
    const { id } = req.params; // Получение ID из параметров пути

    try {
      // Подготовка и выполнение SQL-запроса
      const queryText = 'SELECT * FROM store_products WHERE id = $1';
      const { rows } = await pool.query(queryText, [id]);

      if (rows.length === 0) {
        // Если продукт не найден, отправляем ответ с кодом 404
        return res.status(404).json({ message: 'Product not found' });
      }

      // Отправка найденного продукта в ответе
      res.json({ message: 'Product retrieved successfully', data: rows[0] });
    } catch (error) {
      // Обработка ошибок при выполнении запроса к базе данных
      console.error('Error getting product:', error);
      res.status(500).json({ message: 'Error getting product from database' });
    }
  };
  async  getAllCompetitorsProducts(req, res) {
    const { id } = req.params;  
    try {
      
      const queryText = 'SELECT * FROM competitor_products WHERE competitor_products.our_porduct_id = $1';
      const { rows } = await pool.query(queryText, [id]);
      if (rows.length === 0) {
        
        return res.status(404).json({ message: 'No competitor products found for this product' });
      }
  
      res.json({ message: 'Competitor products retrieved successfully', data: rows });
    } catch (error) {
      
      console.error('Error getting competitor products:', error);
      res.status(500).json({ message: 'Error getting competitor products from database' });
    }
  }
  //  async postParse(req, res) {
  //   const {url} = req.body
  //   // console.log(url)
  //   try {
  //     const scrapedItem = await scrapeWebsite(url)
  //     res.json(scrapedItem)
  //   } catch (error) {
  //     res.status(500).json({ message: 'Ошибка1' });
  //   }
  // };
}

module.exports = new ourproductController() 