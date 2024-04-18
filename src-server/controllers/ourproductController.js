const {pool} = require('../database')

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
          return res.status(404).json({ message: 'Product not found' });
      }

      //  данные 
      const productData = {
          id: rows[0].id,
          YM_id: rows[0].YM_id,
          url: rows[0].url,
          title: rows[0].title,
          image: rows[0].image,
          category_id: rows[0].category_id,
          price: rows[0].price,
          rec_price: rows[0].rec_price,
          min_price: rows[0].min_price,
          rule: rows[0].rule,
          updated_at: rows[0].updated_at,
          competitors_price: rows.filter(row => row.competitor_price != null).map(row => row.competitor_price)
      };

      res.json(productData);
  } catch (error) {
      console.error('Error getting product:', error);
      res.status(500).json({ message: 'Error getting product from database' });
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