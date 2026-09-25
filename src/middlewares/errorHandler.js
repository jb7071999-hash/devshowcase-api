const { ValidationError } = require('sequelize');
const ApiError = require('../utils/ApiError');

// Formato padronizado de erro exigido pela Atividade 2:
// { status, message, details }
function errorHandler(err, req, res, next) {
  // Erros de validação do Sequelize (ex.: campo obrigatório vazio, URL inválida)
  if (err instanceof ValidationError) {
    return res.status(400).json({
      status: 400,
      message: 'Erro de validação',
      details: err.errors.map((e) => e.message),
    });
  }

  // Erros de negócio lançados explicitamente (ApiError.badRequest/notFound)
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
      details: err.details,
    });
  }

  // Qualquer outro erro não tratado -> 500, sem vazar detalhes internos
  console.error(err);
  return res.status(500).json({
    status: 500,
    message: 'Erro interno do servidor',
    details: null,
  });
}

// Middleware para rotas não encontradas (404 padrão)
function notFoundHandler(req, res) {
  res.status(404).json({
    status: 404,
    message: `Rota ${req.method} ${req.originalUrl} não encontrada`,
    details: null,
  });
}

module.exports = { errorHandler, notFoundHandler };
