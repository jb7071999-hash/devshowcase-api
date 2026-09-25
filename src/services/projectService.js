const projectRepository = require('../repositories/projectRepository');
const profileRepository = require('../repositories/profileRepository');
const technologyRepository = require('../repositories/technologyRepository');
const { validateCreateProject, validateUpdateProject } = require('../dtos/projectDto');
const ApiError = require('../utils/ApiError');

const createProject = async (body) => {
  const data = validateCreateProject(body);

  const profile = await profileRepository.findById(data.profileId);
  if (!profile) throw ApiError.notFound(`Profile ${data.profileId} não encontrado`);

  const project = await projectRepository.create(data);

  if (data.technologyIds.length) {
    const technologies = await technologyRepository.findByIds(data.technologyIds);
    await projectRepository.associateTechnologies(project, technologies);
  }

  return projectRepository.findById(project.id);
};

const getProjectById = async (id) => {
  const project = await projectRepository.findById(id);
  if (!project) throw ApiError.notFound(`Project ${id} não encontrado`);
  return project;
};

// Atividade 2: GET /api/projects — busca + filtro por tecnologia + paginação
const listProjects = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const pageSize = Math.min(Number(query.pageSize) || 10, 50);

  const { rows, count } = await projectRepository.findAndCountAll({
    search: query.search,
    technology: query.technology,
    page,
    pageSize,
  });

  return {
    data: rows,
    pagination: {
      page,
      pageSize,
      total: count,
      totalPages: Math.ceil(count / pageSize),
    },
  };
};

// Atividade 2: PUT /api/projects/:id — incrementa curtidas/destaque
const updateProject = async (id, body) => {
  const { incrementStars } = validateUpdateProject(body);
  const project = await getProjectById(id);
  await projectRepository.incrementStars(project, incrementStars);
  return projectRepository.findById(id);
};

module.exports = { createProject, getProjectById, listProjects, updateProject };
