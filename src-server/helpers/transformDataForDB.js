const { v4: uuidv4 } = require('uuid');
const transformDataForDB = (originalData) => {
  return originalData.result.offerMappings.map((item) => {
    const { offer, mapping } = item;
    return { 
  
      product_id: uuidv4(),
      YM_id: mapping.marketSku,
      url: 'https://random-url',
      title: offer.name,
      image: offer.pictures[0], 
      price: offer.basicPrice.value, 
      rule_id: 1,
      category:{
        id: mapping.marketCategoryId,
        name: mapping.marketCategoryName
      }
  
    
  }
  });
};

module.exports = {
  transformDataForDB
}