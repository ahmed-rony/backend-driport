const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/client/v1/reports');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/reports/list').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.findAllReports);
router.route('/client/api/v1/reports/count').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.getReportsCount);
router.route('/client/api/v1/reports/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.getReportsById);

module.exports = router;
