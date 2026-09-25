const { Router } = require('express');
const profileRoutes = require('./profileRoutes');
const technologyRoutes = require('./technologyRoutes');
const projectRoutes = require('./projectRoutes');

const router = Router();

router.use('/profiles', profileRoutes);
router.use('/technologies', technologyRoutes);
router.use('/projects', projectRoutes);

module.exports = router;
