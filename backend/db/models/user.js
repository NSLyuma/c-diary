const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(Product) {
      User.Products = User.hasMany(Product, {
        foreignKey: 'userId',
        as: 'products',
      });
    }
  }
  User.init(
    {
      name: DataTypes.TEXT,
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
      height: DataTypes.INTEGER,
      weight: DataTypes.INTEGER,
      birthDate: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
    },
  );
  return User;
};
