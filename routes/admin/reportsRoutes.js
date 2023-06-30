const express = require('express');
const router = express.Router();
const reportsController = require('../../controller/admin/reports');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/reports/create').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.addReports);
router.route('/admin/reports/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,reportsController.bulkInsertReports);
router.route('/admin/reports/list').post(reportsController.findAllReports);
router.route('/admin/reports/count').post(reportsController.getReportsCount);
router.route('/admin/reports/:id').get(reportsController.getReportsById);
router.route('/admin/reports/update/:id').put(reportsController.updateReports);  
router.route('/admin/reports/partial-update/:id').put(reportsController.partialUpdateReports);  
router.route('/admin/reports/updateBulk').put(reportsController.bulkUpdateReports);
router.route('/admin/reports/softDelete/:id').put(reportsController.softDeleteReports);
router.route('/admin/reports/softDeleteMany').put(reportsController.softDeleteManyReports);
router.route('/admin/reports/delete/:id').delete(reportsController.deleteReports);
router.route('/admin/reports/deleteMany').post(reportsController.deleteManyReports);

module.exports = router;
