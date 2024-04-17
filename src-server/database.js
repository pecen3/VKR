require('dotenv').config(); 
const { Pool } = require('pg');
const postgres = require('postgres')




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
  database: 'test', // название вашей базы данных
  password: '123456', // ваш пароль
  port: 5432, // порт, на котором работает PostgreSQL
});


const sql = postgres({
  host: 'localhost',            // Postgres ip address[s] or domain name[s]
  port: 5432,          // Postgres server port[s]
  database: 'test',            // Name of database to connect to
  username: 'postgres',            // Username of database user
  password: '123456',            // Password of database user

})

module.exports = { pool, sql };
