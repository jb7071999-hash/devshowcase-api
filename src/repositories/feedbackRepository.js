const { Feedback } = require('../models');

const create = (data) => Feedback.create(data);

const findByProject = (projectId) => Feedback.findAll({ where: { projectId } });

module.exports = { create, findByProject };
