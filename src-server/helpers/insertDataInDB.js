const {pool} = require('../database')

const insertAssortmentData = async (data) => {
  console.log(data)
  const client = await pool.connect();
  try {
    // Обновленный текст запроса для вставки в таблицу store_products
    const queryText = `
      INSERT INTO store_products (product_id, url, title, image, price, rule_id)
      VALUES ($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING;
    `;
    // Параметры для вставки, взятые из объекта data
    const res = await Promise.all(data.map(async data => {
      const queryParams = [
        data.product_id, // UUID для продукта
        data.url, // URL строки 
        data.title,// Название продукта
        data.image, // URL изображения продукта
        data.price, // Цена продукта, bigint
        data.rule_id, // ID правила, integer
      ];
      const res = await client.query(queryText, queryParams);
      return res
    }))

    
    console.log('Вставленная записи:', res);
    return res; // Возвращает вставленную запись
  } catch (err) {
    console.error('Ошибка при вставке в БД:', err);
    throw err; // Пробрасывает ошибку дальше
  } finally {
    client.release(); // Освобождение клиента после завершения запроса
  }
};

module.exports = {
  insertAssortmentData,
}