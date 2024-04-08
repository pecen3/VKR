

const axios = require('axios');

const API_URL = 'https://api.partner.market.yandex.ru/businesses/53590269/offer-mappings';
const API_TOKEN = 'y0_AgAAAABWeeOtAAuWRAAAAAEBUUsMAAC-BeQJufFOyKGuHKSnBdhIVSLNmQ'; 

const fetchAssortment = async () => {
  try {
    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
    return response.data; 
  } catch (error) {
    console.error('Ошибка при запросе к Яндекс.Маркету:', error);
    throw error; 
  }
};

module.exports = {
  fetchAssortment,
};
