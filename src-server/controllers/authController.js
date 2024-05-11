const {pool} = require('../database')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require('axios');
const xlsx = require('xlsx');

class authController {
  async loginJWT(req, res) {
    const { login, password } = req.body;

    try {
      
      const user = await pool.query('SELECT * FROM user_info WHERE login = $1', [login]);

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(401).json({ message: 'Неверный логин или пароль' });
      }

      
      const token = jwt.sign(
        { userId: user.id, login: user.login },
        process.env.JWT_SECRET,
        { expiresIn: '12h' }
      );

      res.json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async regUser(req, res) {
    const { login, password } = req.body;

    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      
      await db.query(
        'INSERT INTO user_info (login, password) VALUES ($1, $2)',
        [login, hashedPassword]
      );

      res.status(201).json({ message: 'Пользователь успешно зарегистрирован' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async apiCheck(req, res) {
    const { api_key } = req.body;

    try {
      // Найти пользователя в базе данных по API ключу
      const user = await db.query('SELECT * FROM user_info WHERE api_key = $1', [api_key]);

      if (user.rowCount === 0) {
        return res.status(401).json({ message: 'Неверный API ключ' });
      }

      // Установить API ключ в campaignsApi
      campaignsApi.apiClient.authentications['OAuth'].accessToken = api_key;

      // Выполнить тестовый запрос к API
      const response = await campaignsApi.getCampaigns();

      res.json({ message: 'API ключ действителен' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
  async importXls(req, res) {
    try {
     
      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({ message: 'Файл не был загружен' });
      }

     
      const workbook = xlsx.read(req.files.file.data);
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];

      
      const data = xlsx.utils.sheet_to_json(worksheet);

      for (const row of data) {
        const { id, urls, shops } = row;

        const urlsArray = urls.split(',').map(url => url.trim());
        const shopsArray = shops.split(',').map(shop => shop.trim());


        for (let i = 0; i < urlsArray.length; i++) {
          await db.query(
            'INSERT INTO product_competitors (product_id, competitor_url, competitor_shop) VALUES ($1, $2, $3)',
            [id, urlsArray[i], shopsArray[i]]
          );
        }
      }

      res.json({ message: 'Данные успешно импортированы' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }
}

module.exports = new authController() 