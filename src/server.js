require('dotenv').config();
const app = require('./app');
const sequelize = require('./config/database');
require('./models'); // garante que as associações sejam registradas

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco estabelecida com sucesso.');

    // Em produção, prefira migrations (sequelize-cli) em vez de sync().
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`DevShowcase API rodando na porta ${PORT}`);
      console.log(`Documentação: http://localhost:${PORT}/api-docs`);
    });
  } catch (err) {
    console.error('Falha ao conectar ao banco de dados:', err);
    process.exit(1);
  }
}

start();
