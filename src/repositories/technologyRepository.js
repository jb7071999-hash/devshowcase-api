const { Technology } = require('../models');

const create = (data) => Technology.create(data);

const findAll = () => Technology.findAll();

const findByIds = (ids) => Technology.findAll({ where: { id: ids } });

module.exports = { create, findAll, findByIds };
