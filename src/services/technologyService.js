const technologyRepository = require('../repositories/technologyRepository');
const { validateCreateTechnology } = require('../dtos/technologyDto');

const createTechnology = async (body) => {
  const data = validateCreateTechnology(body);
  return technologyRepository.create(data);
};

const listTechnologies = () => technologyRepository.findAll();

module.exports = { createTechnology, listTechnologies };
