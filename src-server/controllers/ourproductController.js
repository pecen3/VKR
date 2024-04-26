const {pool} = require('../database')
const axios = require('axios');
const BASE_URL = process.env.BASE_URL;
class ourproductController {
  async getAll(req, res) {
    try {
      
      const { rows } = await pool.query('SELECT id FROM store_products');
      
      res.json( rows );
    } catch (error) {
      
      console.error('Error getting products:', error);
      res.status(500).json({ message: 'Error getting products from database' });
    }
  };
  async getOne(req, res) {
    const { id } = req.params; 
 
  
    try {
      const queryText = `
          SELECT 
              sp.id, sp.YM_id, sp.url, sp.title, sp.image, sp.category_id, sp.price, sp.rec_price, sp.min_price, sp.rule_id, sp.updated_at,
              cp.price AS competitor_price
          FROM 
              store_products sp
          LEFT JOIN 
              competitor_products cp 
          ON 
              sp.id = cp.our_product_id
          WHERE 
              sp.id = $1;
      `;
      const { rows } = await pool.query(queryText, [id]);

      if (rows.length === 0) {
          return res.status(404).json({ message: 'Не найден товар' });
      }
      console.log(rows[0].category_id)
      console.log(`${BASE_URL}/categories/${rows[0].category_id}`)
      const categoryResponse = await axios.get(`${BASE_URL}/categories/${rows[0].category_id}`);
      const category_name = categoryResponse.data.category_name;
      const ruleResponse = await axios.get(`${BASE_URL}/rules/${rows[0].rule_id}`);
      const rule_info = ruleResponse.data;
      //  данные 
      const productData = {
          id: rows[0].id,
          ym_id: rows[0].ym_id,
          url: rows[0].url,
          title: rows[0].title,
          image: rows[0].image,
          category_id: rows[0].category_id,
          category_name: category_name,
          price: rows[0].price,
          rec_price: rows[0].rec_price,
          min_price: rows[0].min_price,
          rule_id: rows[0].rule_id,
          rule_description: rule_info.description,
          rule_rule: rule_info.rule, 
          updated_at: rows[0].updated_at,
          competitors_price: rows.filter(row => row.competitor_price != null).map(row => row.competitor_price)
      };

      res.json(productData);
  } catch (error) {
      console.error('Ошибка:', error);
      res.status(500).json({ message: 'Ошибка бд' });
  }
  };


  async getAllCompetitorsProducts(req, res) {
    const { id } = req.params;  
    try {
      
      const queryText = 'SELECT * FROM competitor_products WHERE competitor_products.our_product_id = $1';
      const { rows } = await pool.query(queryText, [id]);
      if (rows.length === 0) {
        
        return res.status(404).json({ message: 'No competitor products found for this product' });
      }
  
      res.json( rows );
    } catch (error) {
      
      console.error('Error getting competitor products:', error);
      res.status(500).json({ message: 'Error getting competitor products from database' });
    }
  }
  async setMinPrice(req, res) {
    const { id } = req.params;  
    const { min_price } = req.body;  

    if (!min_price) {
      return res.status(400).json({ message: "min_price is required" });
    }

    try {
      
      const queryText = 'UPDATE store_products SET min_price = $1 WHERE id = $2 RETURNING *;';
      const { rows } = await pool.query(queryText, [min_price, id]);

      if (rows.length === 0) {
        
        return res.status(404).json({ message: 'Product not found' });
      }

      
      res.status(200).json({ message: 'Min price updated successfully', product: rows[0] });
    } catch (error) {
      
      console.error('Error updating min price:', error);
      res.status(500).json({ message: 'Error updating min price in database' });
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