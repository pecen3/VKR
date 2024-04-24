const {pool} = require('../database')

const rulesController = {

  async getAll(req, res) {
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM price_rules');
      client.release(); 
      res.json(result.rows);
    } catch (err) {
      console.error('Error executing query', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  },


  async getOne(req, res) {
    const { id } = req.params;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM price_rules WHERE id = $1', [id]);
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