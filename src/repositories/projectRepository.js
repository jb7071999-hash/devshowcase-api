const { Op } = require('sequelize');
const sequelize = require('../config/database');
const { Project, Profile, Technology, Feedback } = require('../models');

// ILIKE é específico do PostgreSQL (nosso banco de produção). Em outro dialeto
// (ex.: sqlite em testes locais), cai para LIKE, que no sqlite já é case-insensitive
// por padrão para texto ASCII.
const likeOperator = sequelize.getDialect() === 'postgres' ? Op.iLike : Op.like;

const include = [
  { model: Profile, as: 'profile' },
  { model: Technology, as: 'technologies', through: { attributes: [] } },
];

const create = (data) => Project.create(data);

const findById = (id) => Project.findByPk(id, { include });

const associateTechnologies = (project, technologyIds) =>
  project.setTechnologies(technologyIds);

// Atividade 2: GET /api/projects — busca por título, filtro por tecnologia e paginação
const findAndCountAll = async ({ search, technology, page = 1, pageSize = 10 }) => {
  const where = {};
  if (search) {
    where.title = { [likeOperator]: `%${search}%` };
  }

  const technologyWhere = technology ? { name: technology } : undefined;

  return Project.findAndCountAll({
    where,
    distinct: true,
    include: [
      { model: Profile, as: 'profile' },
      {
        model: Technology,
        as: 'technologies',
        through: { attributes: [] },
        where: technologyWhere,
        required: Boolean(technologyWhere),
      },
    ],
    limit: pageSize,
    offset: (page - 1) * pageSize,
    order: [['createdAt', 'DESC']],
  });
};

const incrementStars = (project, amount) => project.increment('starCount', { by: amount });

// Recalcula a média de notas do projeto a partir de todos os feedbacks
const recalculateAverageRating = async (projectId) => {
  const feedbacks = await Feedback.findAll({ where: { projectId } });
  const average = feedbacks.length
    ? feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length
    : 0;

  await Project.update({ averageRating: average.toFixed(2) }, { where: { id: projectId } });
  return average;
};

module.exports = {
  create,
  findById,
  associateTechnologies,
  findAndCountAll,
  incrementStars,
  recalculateAverageRating,
};
