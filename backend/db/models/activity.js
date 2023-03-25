const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Activity extends Model {
    static associate() {}
  }
  Activity.init(
    {
      name: DataTypes.TEXT,
      kcalOn60min: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Activity',
    },
  );
  return Activity;
};
