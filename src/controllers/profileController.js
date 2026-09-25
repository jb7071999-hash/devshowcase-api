const profileService = require('../services/profileService');

const create = async (req, res, next) => {
  try {
    const profile = await profileService.createProfile(req.body);
    res.status(201).json(profile);
  } catch (err) {
    next(err);
  }
};

const list = async (req, res, next) => {
  try {
    const profiles = await profileService.listProfiles();
    res.json(profiles);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const profile = await profileService.getProfileById(req.params.id);
    res.json(profile);
  } catch (err) {
    next(err);
  }
};

module.exports = { create, list, getById };
