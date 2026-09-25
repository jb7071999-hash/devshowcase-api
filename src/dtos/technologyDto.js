const ApiError = require('../utils/ApiError');

function validateCreateTechnology(body) {
  const { name } = body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name é obrigatório e não pode ser vazio');
  }

  if (errors.length) {
    throw ApiError.badRequest('Dados de tecnologia inválidos', errors);
  }

  return { name: name.trim() };
}

module.exports = { validateCreateTechnology };
