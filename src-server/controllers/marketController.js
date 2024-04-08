const yandexMarketService = require('../services/yandexMarketService');

const getAssortment = async (req, res) => {
  try {
    const data = await yandexMarketService.fetchAssortment();
    res.json(data); // Отправляем полученные данные клиенту
  } catch (error) {
    res.status(500).json({ message: 'Ошибка при получении данных от Яндекс.Маркета' });
  }
};

module.exports = {
  getAssortment,
};
