const {Sequelize} = require('sequelize');
require('dotenv').config(); 
const { Pool } = require('pg');




// const sequelize = new Sequelize(
//   process.env.DB_NAME, 
//   process.env.USER, 
//   process.env.DB_PASSWORD,
//   {
//   host: process.env.HOST,
//   dialect: 'postgres', 
//   port: process.env.PORT,
//   // schema: process.env.SEARCHPATH,
 
// });
// module.exports = sequelize;

const pool = new Pool({
  user: 'postgres', // ваше имя пользователя в PostgreSQL
  host: 'localhost',
  database: 'VKR', // название вашей базы данных
  password: '123456', // ваш пароль
  port: 5432, // порт, на котором работает PostgreSQL
});

module.exports = { pool };
