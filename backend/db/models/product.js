const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate({ User }) {
      Product.Owner = Product.belongsTo(User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Product.init(
    {
      name: DataTypes.TEXT,
      kcalOn100g: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Product',
    },
  );
  return Product;
};
