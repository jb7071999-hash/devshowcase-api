const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Project extends Model {}

Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: { notEmpty: { msg: 'title não pode ser vazio' } },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    repoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'repo_url',
      validate: { isUrl: { msg: 'repoUrl deve ser uma URL válida' } },
    },
    // Atividade 2: "curtidas/destaque", incrementado via PUT /api/projects/:id
    starCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'star_count',
    },
    // Atividade 2: média das notas recebidas em feedbacks, recalculada a cada POST feedback
    averageRating: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      defaultValue: 0,
      field: 'average_rating',
    },
    profileId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'profile_id',
    },
  },
  {
    sequelize,
    modelName: 'Project',
    tableName: 'projects',
    timestamps: true,
  }
);

module.exports = Project;
