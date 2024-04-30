
const {sql, pool} = require('../database')

const { v4: uuidv4 } = require('uuid');
const { scrapeWebsite } = require('../parser/parser');

class competitorsConroller {
  async getAll(req, res) {
    try {
      const query = 'SELECT * FROM competitor';
      const { rows } = await pool.query(query);

      res.json(rows);
    } catch (error) {
      console.error('Ошибка при получении конкурентов:', error);
      res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
  }

  
   async postCompetitor(req, res) {
    const {name} = req.body
    const uuid = {id: uuidv4(), name: name}
    console.log(uuid)
    try {
      const insertComp = await sql`
      insert into competitors ${
        sql(uuid, 'id', 'name')
      }
      `
      res.json(insertComp)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка' });
    }
  };

  async deleteCompetitor(req, res) {
    const {id} = req.params
    
    try {
        const result = await pool.query('DELETE FROM competitors WHERE id = $1', [id]); // 
        if (result.rowCount === 0) {
            
            return res.status(404).json({ message: "Competitor not found" });
        }
        res.status(200).json({ message: "Competitor deleted successfully" });
    } catch (error) {
        console.error('Error deleting competitor:', error);
        res.status(500).json({ message: "Error deleting competitor" });
    }
  };
  //добавить продукт конкурента
  async addProduct(req, res) {
    const {our_product_id, competitor_id, url} = req.body

 
    try {
      const { title, price } = await scrapeWebsite(url);
  
      const client = await pool.connect();
      const insertQuery = `
        INSERT INTO competitor_products (id, url, title, price, our_product_id, competitor_id, updated_at)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
      `;
      const values = [
        // Генерируем новый UUID для id. Можно использовать библиотеку uuid для генерации UUID
        require('uuid').v4(),
        url,
        title,
        price,
        our_product_id,
        competitor_id,
        new Date()  // Текущее время для поля updated_at
      ];
  
      const result = await client.query(insertQuery, values);
      client.release();
  
      res.status(200).json({ message: "Продукт успешно добавлен", product: result.rows[0] });
    } catch (error) {
      console.error('Ошибка при добавлении продукта:', error);
      res.status(500).json({ error: "Ошибка при добавлении продукта" });
    }
  }


  async deleteProduct(req, res) {
    const {id} = req.params

    console.log(id)
    try {
      const deleteProductQuery = 'DELETE FROM competitor_products WHERE id = $1';
      await pool.query(deleteProductQuery, [id]);
  
  
      res.status(200).json({ message: 'Товар успешно удален и связанные записи из истории цен тоже удалены.' });
    } catch (error) {
      console.error('Ошибка при удалении товара:', error);
      res.status(500).json({ error: 'Произошла ошибка при удалении товара и связанных записей из истории цен.' });
    }
  }
}


module.exports = new competitorsConroller()