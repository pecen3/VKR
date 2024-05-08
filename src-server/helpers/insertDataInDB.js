const {pool} = require('../database')



const insertAssortmentData = async (data) => {
  const client = await pool.connect();
  try {
    // Вставка категорий и получение их id
    const categoryInsertQuery = `
      INSERT INTO categories (id, name)
      VALUES ($1, $2) ON CONFLICT (id) DO NOTHING RETURNING id;
    `;

    // Структура для отслеживания новых вставок
    let newCategories = 0;
    let newProducts = 0;

    // Вставляем категории
    const categoryIds = await Promise.all(data.map(async item => {
      const categoryRes = await client.query(categoryInsertQuery, [item.category.id, item.category.name]);
      if (categoryRes.rowCount > 0) newCategories++;
      return { categoryId: item.category.id, product: item };
    }));

    // Вставка товаров
    const productInsertQuery = `
      INSERT INTO store_products (id, ym_id, url, title, image, category_id, price, rec_price, min_price, rule_id, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) ON CONFLICT (ym_id) DO NOTHING;
    `;

    const productsResult = await Promise.all(categoryIds.map(async ({ categoryId, product }) => {
      const productParams = [
        product.product_id,
        product.YM_id,
        product.url,
        product.title,
        product.image,
        categoryId, 
        product.price,
        null, // rec_price
        0, 
        product.rule_id,
        new Date() // updated_at, текущая дата и время
      ];
      console.log(productParams)
      const res = await client.query(productInsertQuery, productParams);
      if (res.rowCount > 0) newProducts++;
      return res;
    }));

    console.log(`Новых категорий: ${newCategories}, Новых товаров: ${newProducts}`);
    return { "Новых категорий": newCategories, "Новых товаров": newProducts };
  } catch (err) {
    console.error('Ошибка при вставке в БД:', err);
    throw err;
  } finally {
    client.release();
  }
};

module.exports = {
  insertAssortmentData,
}