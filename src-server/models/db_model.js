const sequelize = require('../database')
const {DataTypes} = require('sequelize')


const StoreProducts = sequelize.define('store_products', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    primaryKey: true,
    autoIncrement: true
  },
  url: {
    type: DataTypes.TEXT,
    unique: true,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  rule_id: {
    type: DataTypes.BIGINT,
    unique: false,
    allowNull: true,
  },
});

const CompetitorProducts = sequelize.define('competitor_products', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  url: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


// const CompetitorOurProduct = sequelize.define('competitor_our_product', {

// });


const PriceRules = sequelize.define('price_rules', {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    primaryKey: true,
  },
  rule: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});


const PriceHistory = sequelize.define('price_history', {
  id: {
    type: DataTypes.BIGINT,
    unique: true,
    allowNull: false,
    primaryKey: true,
  },
  time_stamp: {
    type: DataTypes.DATE, 
    allowNull: false,
  },
  product_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  price: {
    type: DataTypes.BIGINT,
    allowNull: true,
  },
});




// CompetitorProducts.hasOne(CompetitorOurProduct)
// CompetitorOurProduct.belongsTo(CompetitorProducts, { foreignKey: 'competitor_product',as: 'competitor_product_id' });

// StoreProducts.hasMany(CompetitorOurProduct)
// CompetitorOurProduct.belongsTo(StoreProducts, { foreignKey: 'our_product',as: 'our_product_id' });
// CompetitorProducts.hasOne(StoreProducts, {through: CompetitorOurProduct})

// StoreProducts.hasMany(CompetitorProducts, {through: CompetitorOurProduct})

StoreProducts.hasMany(CompetitorProducts, {foreignKey: 'our_product_id'})
// CompetitorProducts.hasOne(StoreProducts,{through: CompetitorOurProduct})
// CompetitorOurProduct.belongsToMany(StoreProducts)
// CompetitorOurProduct.belongsTo(CompetitorProducts)


PriceRules.hasOne(StoreProducts, { foreignKey: 'rule_id' })

StoreProducts.hasMany(PriceHistory, { foreignKey: 'product_id' })
CompetitorProducts.hasMany(PriceHistory, { foreignKey: 'product_id' })
// PriceHistory.belongsTo(StoreProducts, { foreignKey: 'product_id' });
// PriceHistory.belongsTo(CompetitorProducts, { foreignKey: 'product_id' });

module.exports = {
  StoreProducts,
  CompetitorProducts,
  // CompetitorOurProduct,
  PriceRules,
  PriceHistory

}