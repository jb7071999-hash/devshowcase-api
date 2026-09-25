const { Router } = require('express');
const technologyController = require('../controllers/technologyController');

const router = Router();

/**
 * @openapi
 * /api/technologies:
 *   post:
 *     summary: Cadastra uma tecnologia
 *     tags: [Technologies]
 *   get:
 *     summary: Lista todas as tecnologias
 *     tags: [Technologies]
 */
router.post('/', technologyController.create);
router.get('/', technologyController.list);

module.exports = router;
