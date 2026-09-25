require('dotenv').config();
const { Sequelize } = require('sequelize');

// Conexão com PostgreSQL provisionado na nuvem (Supabase, Render, etc.).
// As credenciais vêm SEMPRE de variáveis de ambiente — nunca hardcoded.
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 5432,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions:
      process.env.DB_SSL === 'true'
        ? {
            ssl: {
              require: true,
              rejectUnauthorized: false,
            },
          }
        : {},
  }
);

module.exports = sequelize;
