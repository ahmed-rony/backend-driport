const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/client/v1/reports');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/reports/create').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.addReports);
router.route('/client/api/v1/reports/list').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.findAllReports);
router.route('/client/api/v1/reports/count').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.getReportsCount);
router.route('/client/api/v1/reports/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.getReportsById);
router.route('/client/api/v1/reports/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.updateReports);   
router.route('/client/api/v1/reports/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.partialUpdateReports);   
router.route('/client/api/v1/reports/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.softDeleteReports);
router.route('/client/api/v1/reports/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.softDeleteManyReports);
router.route('/client/api/v1/reports/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.bulkInsertReports);
router.route('/client/api/v1/reports/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.bulkUpdateReports); 
router.route('/client/api/v1/reports/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.deleteReports);
router.route('/client/api/v1/reports/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,reportsController.deleteManyReports);

module.exports = router;
