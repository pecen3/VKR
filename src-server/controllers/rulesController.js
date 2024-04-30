const {pool} = require('../database')

const rulesController = {

  async getAll(req, res) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM price_rules');
      client.release(); 
      res.json(result.rows);
    } catch (err) {
      console.error('Ошибка', err);
      res.status(500).json({ error: 'Внутрянняя ошибка' });
    }
  },


  async getOne(req, res) {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM price_rules WHERE id = $1', [id]);
      client.release();
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Не найдено правило' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Ошибка', err);
      res.status(500).json({ error: 'Внутрянняя ошибка' });
    }
  },


  async addRule(req, res) {
    const { description, rule } = req.body;
    try {
      const client = await pool.connect();
      const result = await client.query('INSERT INTO price_rules (description, rule) VALUES ($1, $2) RETURNING *', [description, rule]);
      client.release();
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },

  async changeProductRule(req, res) {
    const productId = req.query.id; 
    const ruleId = parseInt(req.query.ruleid);

    try {
      // Выполняем SQL-запрос UPDATE для изменения правила продукта
      const result = await pool.query(
          'UPDATE store_products SET rule_id = $1 WHERE id = $2',
          [ruleId, productId]
      );

      res.status(200).send('Правило продукта успешно изменено');
  } catch (error) {
      console.error('Ошибка при изменении правила продукта:', error);
      res.status(500).send('Произошла ошибка при изменении правила продукта');
  }

  },



  async deleteRule(req, res) {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('DELETE FROM price_rules WHERE id = $1 RETURNING *', [id]);
      client.release();
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'Rule not found' });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },
};

module.exports = rulesController;