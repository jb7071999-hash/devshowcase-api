const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Profile extends Model {}

Profile.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'name não pode ser vazio' } },
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    githubUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      field: 'github_url',
      validate: { isUrl: { msg: 'githubUrl deve ser uma URL válida' } },
    },
  },
  {
    sequelize,
    modelName: 'Profile',
    tableName: 'profiles',
    timestamps: true,
  }
);

module.exports = Profile;
