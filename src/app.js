const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');

const routes = require('./routes');
const swaggerSpec = require('./config/swagger');
const { errorHandler, notFoundHandler } = require('./middlewares/errorHandler');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Documentação interativa: /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.json({ status: 'ok', service: 'DevShowcase API' });
});

app.use('/api', routes);

// 404 para rotas inexistentes, depois o handler global de erros
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
