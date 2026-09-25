const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Technology extends Model {}

Technology.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: { notEmpty: { msg: 'name não pode ser vazio' } },
    },
  },
  {
    sequelize,
    modelName: 'Technology',
    tableName: 'technologies',
    timestamps: true,
  }
);

module.exports = Technology;
