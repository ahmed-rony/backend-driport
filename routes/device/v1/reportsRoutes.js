const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/device/v1/reports');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/reports/list').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.findAllReports);
router.route('/device/api/v1/reports/count').post(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.getReportsCount);
router.route('/device/api/v1/reports/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,reportsController.getReportsById);

module.exports = router;
