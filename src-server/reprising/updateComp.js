const { pool } = require('../database'); 
const {scrapeWebsite} = require('../parser/parser'); 

async function updateComp() {
    const client = await pool.connect();
    try {
        
        const res = await client.query('SELECT id, url, title, price, our_product_id, competitor_id, updated_at FROM competitor_products');
        const products = res.rows;
        console.log(products)
        
        for (const product of products) {
            const { url, title, price } = await scrapeWebsite(product.url);

            
            await client.query('UPDATE competitor_products SET title = $1, price = $2, updated_at = $3 WHERE id = $4', 
                [title, price, new Date(), product.id]);

            
            await client.query('INSERT INTO price_history (product_id, time_stamp, price) VALUES ($1, $2, $3)', 
                [product.id, new Date(), price]);
        }
        return true
    } catch (error) {
        console.error('Ошибка при обновлении данных конкурентов:', error);
        return false
    } finally {
        client.release();
    }

}

module.exports = {updateComp}