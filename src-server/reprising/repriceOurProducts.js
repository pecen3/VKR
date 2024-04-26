const axios = require('axios');
const { calculateRecommendedPrice } = require('./repricer');
require('dotenv').config(); 
const {pool} = require('../database')


async function updateRecommendedPrice(productId, recommendedPrice, ruleDescription) {
  try {
   
    // if (!ruleDescription || ruleDescription === "Без правила") {
    //   console.log(` "Без правила" для товара с ID ${productId}`);
    //   return;
    // }ы

    const client = await pool.connect();
    const query = 'UPDATE store_products SET price = $1, rec_price = $1 WHERE id = $2';
    const result = await client.query(query, [recommendedPrice, productId]);
    client.release();
    console.log(`Обнавлена рекомендованная цена дял товара с ID ${productId} на ${recommendedPrice}`);
  } catch (error) {
    console.error(`Ошибка обновления товара с ID ${productId}:`, error.message);
    throw error;
  }
}


async function getProductIds() {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/products`);
    return response.data.map(product => product.id);
  } catch (error) {
    console.error('Ошибка получения ID товаров:', error.message);
    throw error;
  }
}


async function getProductInfo(productId) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка получения инфо о товаре по ID ${productId}:`, error.message);
    throw error;
  }
}


async function getRuleById(ruleId) {
  try {
    const response = await axios.get(`${process.env.BASE_URL}/rules/${ruleId}`);
    return response.data;
  } catch (error) {
    console.error(`Ошибка получения правила по ID ${ruleId}:`, error.message);
    throw error;
  }
}

async function repriceProducts() {
  try {

    const productIds = await getProductIds();

    for (const productId of productIds) {

      const productInfo = await getProductInfo(productId);

      const rule = await getRuleById(productInfo.rule_id);

      // const hasRule = !!rule;
      const ruleDescription = rule.description;

      // console.log(ruleDescription)
      if (ruleDescription === "Без правила") {
        console.log(`"Без правила" для товара с ID ${productId}`);
        

      } else {
        const recommendedPrice = calculateRecommendedPrice(productInfo, rule.rule);
        if (recommendedPrice < productInfo.min_price) {
          await updateRecommendedPrice(productId, productInfo.min_price, ruleDescription);
        } else {
          await updateRecommendedPrice(productId, recommendedPrice, ruleDescription);
        }
        
      }
      const client = await pool.connect();
      await client.query('INSERT INTO our_price_history (our_product_id, time_stamp, price) VALUES ($1, $2, $3)',
                           [productInfo.id, new Date(),  productInfo.price]);
      client.release();
      
    }
  } catch (error) {
    console.error('Ошибка во время репрайсинга наших товаров:', error.message);
  }
}

module.exports = { repriceProducts }