const ApiError = require('../utils/ApiError');

function validateCreateProject(body) {
  const { title, description, repoUrl, profileId, technologyIds } = body;
  const errors = [];

  if (!title || typeof title !== 'string' || !title.trim()) {
    errors.push('title é obrigatório e não pode ser vazio');
  }
  if (!repoUrl || !/^https?:\/\/.+/.test(repoUrl)) {
    errors.push('repoUrl é obrigatório e deve ser uma URL válida');
  }
  if (!profileId || Number.isNaN(Number(profileId))) {
    errors.push('profileId é obrigatório e deve ser numérico');
  }
  if (technologyIds && !Array.isArray(technologyIds)) {
    errors.push('technologyIds deve ser um array de ids');
  }

  if (errors.length) {
    throw ApiError.badRequest('Dados de projeto inválidos', errors);
  }

  return {
    title: title.trim(),
    description: description || null,
    repoUrl,
    profileId: Number(profileId),
    technologyIds: technologyIds || [],
  };
}

// Atividade 2: PUT /api/projects/:id — atualiza curtidas/destaque de forma incremental
function validateUpdateProject(body) {
  const { incrementStars } = body;
  if (incrementStars !== undefined && (!Number.isInteger(incrementStars) || incrementStars <= 0)) {
    throw ApiError.badRequest('Dados de atualização inválidos', [
      'incrementStars deve ser um inteiro positivo',
    ]);
  }
  return { incrementStars: incrementStars || 1 };
}

module.exports = { validateCreateProject, validateUpdateProject };
