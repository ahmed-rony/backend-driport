const express = require('express');
const router = express.Router();
const reportsController = require('../../../controller/client/v1/reports');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/reports/create').post(reportsController.addReports);
router.route('/client/api/v1/reports/addBulk').post(reportsController.bulkInsertReports);
router.route('/client/api/v1/reports/list').post(reportsController.findAllReports);
router.route('/client/api/v1/reports/count').post(reportsController.getReportsCount);
router.route('/client/api/v1/reports/:id').get(reportsController.getReportsById);
router.route('/client/api/v1/reports/update/:id').put(reportsController.updateReports);  
router.route('/client/api/v1/reports/partial-update/:id').put(reportsController.partialUpdateReports);  
router.route('/client/api/v1/reports/updateBulk').put(reportsController.bulkUpdateReports);
router.route('/client/api/v1/reports/softDelete/:id').put(reportsController.softDeleteReports);
router.route('/client/api/v1/reports/softDeleteMany').put(reportsController.softDeleteManyReports);
router.route('/client/api/v1/reports/delete/:id').delete(reportsController.deleteReports);
router.route('/client/api/v1/reports/deleteMany').post(reportsController.deleteManyReports);

module.exports = router;
