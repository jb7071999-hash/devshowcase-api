const { Profile } = require('../models');

const create = (data) => Profile.create(data);

const findAll = () => Profile.findAll();

const findById = (id) => Profile.findByPk(id);

module.exports = { create, findAll, findById };
