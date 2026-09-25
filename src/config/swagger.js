const swaggerJsdoc = require('swagger-jsdoc');

// Documentação interativa exigida na Atividade 2 (acessível em /api-docs).
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'DevShowcase API',
      version: '1.0.0',
      description:
        'API da plataforma DevShowcase — projeto da disciplina UAPITSI16 Programação Backend (UESPI).',
    },
    servers: [{ url: '/', description: 'Servidor atual' }],
  },
  // Lê as anotações @openapi nos arquivos de rota
  apis: ['./src/routes/*.js'],
};

module.exports = swaggerJsdoc(options);
