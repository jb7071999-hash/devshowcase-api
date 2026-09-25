const { Router } = require('express');
const projectController = require('../controllers/projectController');
const feedbackController = require('../controllers/feedbackController');

const router = Router();

/**
 * @openapi
 * /api/projects:
 *   post:
 *     summary: Cadastra um projeto (com validação de campos)
 *     tags: [Projects]
 *   get:
 *     summary: Lista projetos com busca por título, filtro por tecnologia e paginação
 *     tags: [Projects]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *       - in: query
 *         name: technology
 *         schema: { type: string }
 *       - in: query
 *         name: page
 *         schema: { type: integer }
 *       - in: query
 *         name: pageSize
 *         schema: { type: integer }
 */
router.post('/', projectController.create);
router.get('/', projectController.list);

/**
 * @openapi
 * /api/projects/{id}:
 *   get:
 *     summary: Busca um projeto por id
 *     tags: [Projects]
 *   put:
 *     summary: Incrementa curtidas/destaque do projeto
 *     tags: [Projects]
 */
router.get('/:id', projectController.getById);
router.put('/:id', projectController.update);

/**
 * @openapi
 * /api/projects/{id}/feedbacks:
 *   post:
 *     summary: Registra um feedback (nota 1-5) e recalcula a média do projeto
 *     tags: [Feedbacks]
 */
router.post('/:id/feedbacks', feedbackController.create);

module.exports = router;
