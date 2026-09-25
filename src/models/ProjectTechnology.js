const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

// Tabela de junção do relacionamento N:N entre Project e Technology.
class ProjectTechnology extends Model {}

ProjectTechnology.init(
  {
    projectId: {
      type: DataTypes.INTEGER,
      field: 'project_id',
    },
    technologyId: {
      type: DataTypes.INTEGER,
      field: 'technology_id',
    },
  },
  {
    sequelize,
    modelName: 'ProjectTechnology',
    tableName: 'project_technologies',
    timestamps: false,
  }
);

module.exports = ProjectTechnology;
