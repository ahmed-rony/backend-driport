const express = require('express');
const router = express.Router();
const driversController = require('../../../controller/device/v1/drivers');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/drivers/create').post(driversController.addDrivers);
router.route('/device/api/v1/drivers/addBulk').post(driversController.bulkInsertDrivers);
router.route('/device/api/v1/drivers/list').post(driversController.findAllDrivers);
router.route('/device/api/v1/drivers/count').post(driversController.getDriversCount);
router.route('/device/api/v1/drivers/:id').get(driversController.getDriversById);
router.route('/device/api/v1/drivers/update/:id').put(driversController.updateDrivers);  
router.route('/device/api/v1/drivers/partial-update/:id').put(driversController.partialUpdateDrivers);  
router.route('/device/api/v1/drivers/updateBulk').put(driversController.bulkUpdateDrivers);
router.route('/device/api/v1/drivers/softDelete/:id').put(driversController.softDeleteDrivers);
router.route('/device/api/v1/drivers/softDeleteMany').put(driversController.softDeleteManyDrivers);
router.route('/device/api/v1/drivers/delete/:id').delete(driversController.deleteDrivers);
router.route('/device/api/v1/drivers/deleteMany').post(driversController.deleteManyDrivers);

module.exports = router;
