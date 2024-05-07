const {pool} = require('../database')

async function sendProductPrice(productId) {
  try {
    
    const result = await pool.query(
      'SELECT title, price, min_price FROM store_products WHERE id = $1',
      [productId]
    );

    if (result.rows.length > 0) {
      const { title, price, min_price } = result.rows[0];

      // Проверяем, что цена больше или равна минимальной цене
      if (price >= min_price) {
        // Отправляем данные на Яндекс.Маркет
        console.log(`Отправлена цена на ЯМ: ${price}, Название товара: ${title}`);
      } else {
        console.log(`Цена товара ${title} (${price}) ниже минимальной цены (${min_price}), не отправляем на ЯМ.`);
      }
    } else {
      console.error(`Товар с ID ${productId} не найден в базе данных.`);
    }
  } catch (error) {
    console.error('Ошибка при отправке цены на Яндекс.Маркет:', error);
  }
}


module.exports = {sendProductPrice};
