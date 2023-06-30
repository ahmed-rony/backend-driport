const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/device/v1/reports');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/reports/create').post(reportsController.addReports);
router.route('/device/api/v1/reports/addBulk').post(reportsController.bulkInsertReports);
router.route('/device/api/v1/reports/list').post(reportsController.findAllReports);
router.route('/device/api/v1/reports/count').post(reportsController.getReportsCount);
router.route('/device/api/v1/reports/:id').get(reportsController.getReportsById);
router.route('/device/api/v1/reports/update/:id').put(reportsController.updateReports);  
router.route('/device/api/v1/reports/partial-update/:id').put(reportsController.partialUpdateReports);  
router.route('/device/api/v1/reports/updateBulk').put(reportsController.bulkUpdateReports);
router.route('/device/api/v1/reports/softDelete/:id').put(reportsController.softDeleteReports);
router.route('/device/api/v1/reports/softDeleteMany').put(reportsController.softDeleteManyReports);
router.route('/device/api/v1/reports/delete/:id').delete(reportsController.deleteReports);
router.route('/device/api/v1/reports/deleteMany').post(reportsController.deleteManyReports);

module.exports = router;
