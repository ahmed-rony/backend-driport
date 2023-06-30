const express = require('express');
const router = express.Router();
const driversController = require('../../controller/admin/drivers');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/drivers/create').post(driversController.addDrivers);
router.route('/admin/drivers/addBulk').post(driversController.bulkInsertDrivers);
router.route('/admin/drivers/list').post(driversController.findAllDrivers);
router.route('/admin/drivers/count').post(driversController.getDriversCount);
router.route('/admin/drivers/:id').get(driversController.getDriversById);
router.route('/admin/drivers/update/:id').put(driversController.updateDrivers);  
router.route('/admin/drivers/partial-update/:id').put(driversController.partialUpdateDrivers);  
router.route('/admin/drivers/updateBulk').put(driversController.bulkUpdateDrivers);
router.route('/admin/drivers/softDelete/:id').put(driversController.softDeleteDrivers);
router.route('/admin/drivers/softDeleteMany').put(driversController.softDeleteManyDrivers);
router.route('/admin/drivers/delete/:id').delete(driversController.deleteDrivers);
router.route('/admin/drivers/deleteMany').post(driversController.deleteManyDrivers);

module.exports = router;
