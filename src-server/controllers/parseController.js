const { scrapeWebsite } = require('../parser/parser');
const {pool} = require('../database')



class parseController {
  async getAll(req, res) {
    try {
      const { rows } = await pool.query('SELECT * FROM parser');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async changeOne(req, res) {
    const { id } = req.params;
    const { site, html_title, html_price } = req.body;

    try {
      await pool.query(
        'UPDATE parser SET site = $1, html_title = $2, html_price = $3 WHERE id = $4',
        [site, html_title, html_price, id]
      );
      res.json({ message: 'обновлено' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }

  async addSite(req, res) {
    const { site, html_title, html_price } = req.body;

    try {
      await pool.query(
        'INSERT INTO parser (site, html_title, html_price) VALUES ($1, $2, $3)',
        [site, html_title, html_price]
      );
      res.json({ message: 'Добавлено' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ошибка сервера' });
    }
  }
}

module.exports = new parseController() 