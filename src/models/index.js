const sequelize = require('../config/database');
const Profile = require('./Profile');
const Project = require('./Project');
const Technology = require('./Technology');
const Feedback = require('./Feedback');
const ProjectTechnology = require('./ProjectTechnology');

// Profile 1:N Project
Profile.hasMany(Project, { foreignKey: 'profileId', as: 'projects' });
Project.belongsTo(Profile, { foreignKey: 'profileId', as: 'profile' });

// Project N:N Technology
Project.belongsToMany(Technology, {
  through: ProjectTechnology,
  foreignKey: 'projectId',
  otherKey: 'technologyId',
  as: 'technologies',
});
Technology.belongsToMany(Project, {
  through: ProjectTechnology,
  foreignKey: 'technologyId',
  otherKey: 'projectId',
  as: 'projects',
});

// Project 1:N Feedback
Project.hasMany(Feedback, { foreignKey: 'projectId', as: 'feedbacks' });
Feedback.belongsTo(Project, { foreignKey: 'projectId', as: 'project' });

module.exports = {
  sequelize,
  Profile,
  Project,
  Technology,
  Feedback,
  ProjectTechnology,
};
