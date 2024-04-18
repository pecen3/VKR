require('dotenv').config();
const axios = require('axios');

const BASE_URL = process.env.BASE_URL;

async function fetchOurProducts() {
    try {
      console.log(1212)
        const response = await axios.get(`${BASE_URL}/products/`);
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении наших товаров:', error);
        return [];
    }
}

async function fetchCompetitorsForProduct(productId) {
    try {
        const response = await axios.get(`${BASE_URL}/products/competitors/${productId}`);
        return response.data;
    } catch (error) {
        console.error(`Ошибка при получении товаров конкурентов для продукта ${productId}:`, error);
        return [];
    }
}

async function checkProductsAndCompetitors() {
  const products = await fetchOurProducts();
  if (products.length > 0) {
      console.log('Найдены наши товары, проверяем наличие товаров конкурентов...');
      for (const product of products) {
          const competitors = await fetchCompetitorsForProduct(product.id);
          if (competitors.length > 0) {
              console.log(`Для товара ${product.id} найдены товары конкурентов.`);
              return true; // Условия удовлетворены, возвращаем true
          }
      }
  } else {
      console.log('Наши товары не найдены.');
  }
  return false; // Условия не удовлетворены, возвращаем false
}

module.exports = { checkProductsAndCompetitors };
