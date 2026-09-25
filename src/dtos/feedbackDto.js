const ApiError = require('../utils/ApiError');

// Atividade 2: POST /api/projects/:id/feedbacks — nota de 1 a 5
function validateCreateFeedback(body) {
  const { rating, comment } = body;
  const errors = [];

  const ratingNum = Number(rating);
  if (!rating || !Number.isInteger(ratingNum) || ratingNum < 1 || ratingNum > 5) {
    errors.push('rating é obrigatório e deve ser um inteiro entre 1 e 5');
  }

  if (errors.length) {
    throw ApiError.badRequest('Dados de feedback inválidos', errors);
  }

  return { rating: ratingNum, comment: comment || null };
}

module.exports = { validateCreateFeedback };
