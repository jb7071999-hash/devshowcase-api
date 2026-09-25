require('dotenv').config();
const sequelize = require('../config/database');
const { Profile, Project, Technology } = require('../models');

// Roda com: npm run seed
// Popula o banco (local ou o de produção, conforme o .env usado) com dados
// de exemplo, para não gravar o vídeo de demonstração com a API vazia.
async function seed() {
  await sequelize.authenticate();
  await sequelize.sync();

  const [nodejs] = await Technology.findOrCreate({ where: { name: 'Node.js' } });
  const [express] = await Technology.findOrCreate({ where: { name: 'Express' } });
  const [postgres] = await Technology.findOrCreate({ where: { name: 'PostgreSQL' } });

  const [profile] = await Profile.findOrCreate({
    where: { name: 'Francisco de Assis Brito Rocha Junior' },
    defaults: {
      bio: 'Desenvolvedor — projeto da disciplina Programação Backend (UESPI).',
      githubUrl: 'https://github.com/jb7071999-hash',
    },
  });

  const [project] = await Project.findOrCreate({
    where: { title: 'DevShowcase API' },
    defaults: {
      description: 'Backend da plataforma DevShowcase, entregue nas Atividades 1 e 2.',
      repoUrl: 'https://github.com/jb7071999-hash/devshowcase-api',
      profileId: profile.id,
    },
  });
  await project.setTechnologies([nodejs, express, postgres]);

  console.log('Seed concluído com sucesso:');
  console.log(`- Profile #${profile.id}: ${profile.name}`);
  console.log(`- Project #${project.id}: ${project.title}`);
  console.log('Use esses ids no Postman para demonstrar feedbacks e curtidas.');

  process.exit(0);
}

seed().catch((err) => {
  console.error('Erro ao rodar o seed:', err);
  process.exit(1);
});
