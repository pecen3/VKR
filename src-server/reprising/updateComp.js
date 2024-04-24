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

            await client.query('INSERT INTO competitor_price_history (competitor_product_id, time_stamp, price) VALUES ($1, $2, $3)', 
            [product.id, new Date(), price]);

            await client.query('UPDATE competitor_products SET price = $1 WHERE id = $2', 
                [ price, product.id]);

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