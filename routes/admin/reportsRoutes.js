const express = require('express');
const router = express.Router();
const reportsController = require('../../controller/admin/reports');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/reports/list').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.findAllReports);
router.route('/admin/reports/count').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.getReportsCount);
router.route('/admin/reports/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.getReportsById);

module.exports = router;
