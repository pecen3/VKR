require('dotenv').config()
const cors = require('cors')
const express = require('express')
const router = require('./routes/index')
const aa = require('./helpers/insertDataInDB')
const cron = require('node-cron');
const { setupCronJobs } = require('./reprising/timer');
const { repriceProducts } = require('./reprising/repriceOurProducts')
const PORT = process.env.PORT || 5000

const app = express()
app.use(express.json())
app.use(cors())
app.use('/api', router)

// setupCronJobs();

const start = async () => {
  try {
    repriceProducts()
    app.listen(PORT, () => console.log(PORT))

  } catch (error) {
    console.log(error)
  }
}




start()











// async function fetchUsers() {
//   const { rows } = await pool.query("SELECT * FROM main.price_rules");
//   console.log(rows);
// }

// fetchUsers().catch(err => console.log(err));
