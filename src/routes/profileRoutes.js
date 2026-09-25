const { Router } = require('express');
const profileController = require('../controllers/profileController');

const router = Router();

/**
 * @openapi
 * /api/profiles:
 *   post:
 *     summary: Cria um perfil de desenvolvedor
 *     tags: [Profiles]
 *   get:
 *     summary: Lista todos os perfis
 *     tags: [Profiles]
 */
router.post('/', profileController.create);
router.get('/', profileController.list);

/**
 * @openapi
 * /api/profiles/{id}:
 *   get:
 *     summary: Busca um perfil por id
 *     tags: [Profiles]
 */
router.get('/:id', profileController.getById);

module.exports = router;
