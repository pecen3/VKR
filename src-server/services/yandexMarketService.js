

require('dotenv').config(); 

const axios = require('axios');

const url = `https://api.partner.market.yandex.ru/businesses/${process.env.COMPANY_ID}/offer-mappings?page_token=&limit=`;
const API_TOKEN = process.env.COMPANY_KEY;

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
  'Content-Type': 'application/json'
 
};
const data = {
  
};

const fetchAssortment = async () => {
  try {
    const response = await axios.post(url, data, { headers: headers });
    // console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error('Ошибка при запросе к Яндекс.Маркету:', error);
    throw error; 
  }
};

module.exports = {
  fetchAssortment,
};
