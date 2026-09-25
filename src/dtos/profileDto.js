const ApiError = require('../utils/ApiError');

function validateCreateProfile(body) {
  const { name, bio, githubUrl } = body;
  const errors = [];

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.push('name é obrigatório e não pode ser vazio');
  }
  if (githubUrl && !/^https?:\/\/.+/.test(githubUrl)) {
    errors.push('githubUrl deve ser uma URL válida');
  }

  if (errors.length) {
    throw ApiError.badRequest('Dados de perfil inválidos', errors);
  }

  return { name: name.trim(), bio: bio || null, githubUrl: githubUrl || null };
}

module.exports = { validateCreateProfile };
