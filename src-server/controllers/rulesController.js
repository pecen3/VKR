const {pool} = require('../database');
const { repriceProduct } = require('../reprising/repriceOurProducts');

const rulesController = {

  async getAll(req, res) {
    try {
      const client = await pool.connect();
      const result = await client.query(`
        SELECT
          pr.id,
          pr.description,
          pr.rule,
          COUNT(sp.id) AS product_count
        FROM price_rules pr
        LEFT JOIN store_products sp ON pr.id = sp.rule_id
        GROUP BY pr.id, pr.description, pr.rule
      `);
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
  async changeRule(req, res) {
    const { id } = req.params;
    const { description, rule } = req.body;
  
    try {
      const client = await pool.connect();
  
      const updateResult = await client.query(
        'UPDATE price_rules SET description = $1, rule = $2 WHERE id = $3 RETURNING *',
        [description, rule, id]
      );
  
      if (updateResult.rowCount === 0) {
        res.status(404).json({ error: 'Правило не найдено' });
        return;
      }
  
      const updatedRule = updateResult.rows[0];
      client.release();
      res.json(updatedRule);
    } catch (err) {
      console.error('Ошибка', err);
      res.status(500).json({ error: 'Внутрянняя ошибка' });
    }
  }, 


  async changeProductRule(req, res) {
    const productId = req.query.id; 
    const ruleId = parseInt(req.query.ruleid);

    try {
      
      const result = await pool.query(
          'UPDATE store_products SET rule_id = $1 WHERE id = $2',
          [ruleId, productId]
      );
      repriceProduct(productId)

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