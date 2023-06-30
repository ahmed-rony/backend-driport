const express =  require('express');
const router =  express.Router();
router.use('/admin/auth',require('./auth'));
router.use(require('./reportsRoutes'));
router.use(require('./vehiclesRoutes'));
router.use(require('./companiesRoutes'));
router.use(require('./conversationsRoutes'));
router.use(require('./driversRoutes'));
router.use(require('./usersRoutes'));
router.use(require('./roleRoutes'));
router.use(require('./projectRouteRoutes'));
router.use(require('./routeRoleRoutes'));
router.use(require('./userRoleRoutes'));
router.use(require('./uploadRoutes'));

module.exports = router;
