const profileRepository = require('../repositories/profileRepository');
const { validateCreateProfile } = require('../dtos/profileDto');
const ApiError = require('../utils/ApiError');

const createProfile = async (body) => {
  const data = validateCreateProfile(body);
  return profileRepository.create(data);
};

const listProfiles = () => profileRepository.findAll();

const getProfileById = async (id) => {
  const profile = await profileRepository.findById(id);
  if (!profile) throw ApiError.notFound(`Profile ${id} não encontrado`);
  return profile;
};

module.exports = { createProfile, listProfiles, getProfileById };
