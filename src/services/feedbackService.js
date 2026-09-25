const feedbackRepository = require('../repositories/feedbackRepository');
const projectRepository = require('../repositories/projectRepository');
const { validateCreateFeedback } = require('../dtos/feedbackDto');
const ApiError = require('../utils/ApiError');

// Atividade 2: POST /api/projects/:id/feedbacks
// Cria o feedback e recalcula a média de notas do projeto.
const createFeedback = async (projectId, body) => {
  const project = await projectRepository.findById(projectId);
  if (!project) throw ApiError.notFound(`Project ${projectId} não encontrado`);

  const data = validateCreateFeedback(body);
  const feedback = await feedbackRepository.create({ ...data, projectId });
  const averageRating = await projectRepository.recalculateAverageRating(projectId);

  return { feedback, averageRating };
};

module.exports = { createFeedback };
