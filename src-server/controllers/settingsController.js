const { pool } = require('../database');
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');
require('dotenv').config(); 
const settingsController = {

  getAllUserInfo: async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM user_info');
      res.json(result.rows);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка' });
    }
  },


  updateSyncPeriod: async (req, res) => {
    const { login, sync_period } = req.body;

    try {
      await pool.query(
        'UPDATE user_info SET sync_period = $1 WHERE login = $2',
        [sync_period, login]
      );
      res.status(200).json({ message: 'Обновлен период синхронизации' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка' });
    }
  },


  updateRepricePeriod: async (req, res) => {
    const { login, reprice_period } = req.body;

    try {
      await pool.query(
        'UPDATE user_info SET reprice_period = $1 WHERE login = $2',
        [reprice_period, login]
      );
      res.status(200).json({ message: 'обновлен период репрайсинга' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error updating reprice period' });
    }
  },

  getDatabaseDump: (req, res) => {
    const dumpFilePath = path.join(__dirname, '../data', 'database_dump.sql');
    process.env.PGPASSWORD = process.env.DB_PASSWORD;
    const pgDumpCommand = `"C:\\Program Files\\PostgreSQL\\14\\bin\\pg_dump.exe" -U ${process.env.DB_USER} -p ${process.env.DB_PORT} -d ${process.env.DB_NAME} -n public -f ${dumpFilePath}`;

    exec(pgDumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(error);
        res.status(500).json({ error: 'Error generating database dump' });
        return;
      }

      res.download(dumpFilePath, 'database_dump.sql', (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error sending database dump' });
        } else {

          fs.unlinkSync(dumpFilePath);
        }
      });
    });
  },
};

module.exports = settingsController;