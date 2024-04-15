const { transformDataForDB } = require('../helpers/transformDataForDB');
const  {insertAssortmentData}  = require('../helpers/insertDataInDB');
const yandexMarketService = require('../services/yandexMarketService');

const getAssortment = async (req, res) => {
  try {
    const data = await yandexMarketService.fetchAssortment();
    // console.log(data)
    const transformed = transformDataForDB(data)
    // console.log(transformed)
    // console.log(insertAssortmentData.insertAssortmentData())
    const insertData = await insertAssortmentData(transformed)
    
    res.json(insertData); // Отправляем полученные данные клиенту
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Ошибка при получении данных от Яндекс.Маркета' });
  }
};

module.exports = {
  getAssortment,
};
