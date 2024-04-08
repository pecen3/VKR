const pool = require('./database');

async function fetchUsers() {
  const { rows } = await pool.query("SELECT * FROM main.price_rules");
  console.log(rows);
}

fetchUsers().catch(err => console.log(err));
