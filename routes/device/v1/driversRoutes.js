const express = require('express');
const router = express.Router();
const driversController = require('../../../controller/device/v1/drivers');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/drivers/create').post(auth(PLATFORM.DEVICE),checkRolePermission,driversController.addDrivers);
router.route('/device/api/v1/drivers/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,driversController.bulkInsertDrivers);
router.route('/device/api/v1/drivers/list').post(auth(PLATFORM.DEVICE),checkRolePermission,driversController.findAllDrivers);
router.route('/device/api/v1/drivers/count').post(auth(PLATFORM.DEVICE),checkRolePermission,driversController.getDriversCount);
router.route('/device/api/v1/drivers/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,driversController.getDriversById);
router.route('/device/api/v1/drivers/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,driversController.updateDrivers);   
router.route('/device/api/v1/drivers/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,driversController.partialUpdateDrivers);   
router.route('/device/api/v1/drivers/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,driversController.bulkUpdateDrivers); 
router.route('/device/api/v1/drivers/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,driversController.softDeleteDrivers);
router.route('/device/api/v1/drivers/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,driversController.softDeleteManyDrivers);
router.route('/device/api/v1/drivers/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,driversController.deleteDrivers);
router.route('/device/api/v1/drivers/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,driversController.deleteManyDrivers);

module.exports = router;
