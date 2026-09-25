// Smoke test end-to-end: sobe a API com sqlite em memória e bate em cada endpoint
// para validar toda a cadeia rota -> controller -> service -> repository -> model.
process.env.DB_DIALECT_OVERRIDE = 'sqlite';

const { Sequelize } = require('sequelize');
const path = require('path');
const Module = require('module');

// Intercepta o require('../config/database') para injetar sqlite em memória,
// sem tocar no código de produção.
const testSequelize = new Sequelize('sqlite::memory:', { logging: false });
const dbConfigPath = path.resolve(__dirname, 'src/config/database.js');
require.cache[require.resolve(dbConfigPath)] = {
  id: dbConfigPath,
  filename: dbConfigPath,
  loaded: true,
  exports: testSequelize,
};

const request = require('supertest');
const app = require('./src/app');
require('./src/models');

async function run() {
  await testSequelize.sync();
  let failures = 0;

  const check = (label, cond) => {
    console.log(`${cond ? 'OK  ' : 'FAIL'} - ${label}`);
    if (!cond) failures++;
  };

  // 1. Criar profile
  let res = await request(app).post('/api/profiles').send({
    name: 'Wallyson Silva',
    bio: 'Dev e professor',
    githubUrl: 'https://github.com/wallyson',
  });
  check('POST /api/profiles -> 201', res.status === 201);
  const profileId = res.body.id;

  // 1b. Validação: profile sem name -> 400 padronizado
  res = await request(app).post('/api/profiles').send({});
  check('POST /api/profiles sem name -> 400', res.status === 400);
  check('erro no formato {status,message,details}', res.body.status === 400 && Array.isArray(res.body.details));

  // 2. Criar technologies
  res = await request(app).post('/api/technologies').send({ name: 'Node.js' });
  check('POST /api/technologies -> 201', res.status === 201);
  const techId = res.body.id;
  res = await request(app).post('/api/technologies').send({ name: 'Express' });
  check('POST /api/technologies (2) -> 201', res.status === 201);

  // 3. Criar project vinculado ao profile e à technology
  res = await request(app).post('/api/projects').send({
    title: 'DevShowcase API',
    description: 'Projeto da disciplina',
    repoUrl: 'https://github.com/wallyson/devshowcase-api',
    profileId,
    technologyIds: [techId],
  });
  check('POST /api/projects -> 201', res.status === 201);
  check('project retorna technologies associadas', res.body.technologies.length === 1);
  const projectId = res.body.id;

  // 3b. Validação: repoUrl inválida -> 400
  res = await request(app).post('/api/projects').send({ title: 'X', repoUrl: 'nao-e-url', profileId });
  check('POST /api/projects com repoUrl inválida -> 400', res.status === 400);

  // 3c. profileId inexistente -> 404
  res = await request(app).post('/api/projects').send({ title: 'X', repoUrl: 'https://x.com', profileId: 9999 });
  check('POST /api/projects com profileId inexistente -> 404', res.status === 404);

  // 4. GET /api/projects/:id
  res = await request(app).get(`/api/projects/${projectId}`);
  check('GET /api/projects/:id -> 200', res.status === 200);

  // 4b. GET /api/projects/:id inexistente -> 404
  res = await request(app).get('/api/projects/9999');
  check('GET /api/projects/:id inexistente -> 404', res.status === 404);

  // 5. Feedback -> recalcula média
  res = await request(app).post(`/api/projects/${projectId}/feedbacks`).send({ rating: 5, comment: 'Ótimo!' });
  check('POST feedback rating 5 -> 201', res.status === 201);
  check('averageRating recalculada = 5', Number(res.body.averageRating) === 5);

  res = await request(app).post(`/api/projects/${projectId}/feedbacks`).send({ rating: 3 });
  check('POST feedback rating 3 -> 201', res.status === 201);
  check('averageRating recalculada = 4', Number(res.body.averageRating) === 4);

  // 5b. rating fora do range -> 400
  res = await request(app).post(`/api/projects/${projectId}/feedbacks`).send({ rating: 10 });
  check('POST feedback rating inválido -> 400', res.status === 400);

  // 6. PUT /api/projects/:id -> incrementa starCount
  res = await request(app).put(`/api/projects/${projectId}`).send({ incrementStars: 3 });
  check('PUT /api/projects/:id -> 200', res.status === 200);
  check('starCount incrementado para 3', res.body.starCount === 3);

  // 7. GET /api/projects com busca, filtro por tecnologia e paginação
  res = await request(app).get('/api/projects').query({ search: 'DevShowcase', page: 1, pageSize: 10 });
  check('GET /api/projects?search= -> 200', res.status === 200);
  check('retorna pagination', res.body.pagination.total === 1);

  res = await request(app).get('/api/projects').query({ technology: 'Node.js' });
  check('GET /api/projects?technology= -> filtra corretamente', res.body.data.length === 1);

  res = await request(app).get('/api/projects').query({ technology: 'Rust' });
  check('GET /api/projects?technology= sem match -> lista vazia', res.body.data.length === 0);

  // 8. Rota inexistente -> 404 padronizado
  res = await request(app).get('/api/rota-que-nao-existe');
  check('rota inexistente -> 404 padronizado', res.status === 404 && res.body.status === 404);

  // 9. Swagger docs disponível
  res = await request(app).get('/api-docs/');
  check('GET /api-docs disponível', res.status === 200);

  console.log(`\n${failures === 0 ? 'TODOS OS TESTES PASSARAM' : failures + ' TESTE(S) FALHARAM'}`);
  process.exit(failures === 0 ? 0 : 1);
}

run().catch((err) => {
  console.error('Erro inesperado no smoke test:', err);
  process.exit(1);
});
