const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres', // ваше имя пользователя в PostgreSQL
  host: 'localhost',
  database: 'VKR', // название вашей базы данных
  password: '123456', // ваш пароль
  port: 5432, // порт, на котором работает PostgreSQL
  searchPath: ['main'],
});

module.exports = pool;
