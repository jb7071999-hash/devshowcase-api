const technologyService = require('../services/technologyService');

const create = async (req, res, next) => {
  try {
    const technology = await technologyService.createTechnology(req.body);
    res.status(201).json(technology);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const technologies = await technologyService.listTechnologies();
    res.json(technologies);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, list };
