const express = require('express');
const router = express.Router();
const driversController = require('../../../controller/client/v1/drivers');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/drivers/create').post(auth(PLATFORM.CLIENT),checkRolePermission,driversController.addDrivers);
router.route('/client/api/v1/drivers/list').post(auth(PLATFORM.CLIENT),checkRolePermission,driversController.findAllDrivers);
router.route('/client/api/v1/drivers/count').post(auth(PLATFORM.CLIENT),checkRolePermission,driversController.getDriversCount);
router.route('/client/api/v1/drivers/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,driversController.getDriversById);
router.route('/client/api/v1/drivers/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,driversController.updateDrivers);   
router.route('/client/api/v1/drivers/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,driversController.partialUpdateDrivers);   
router.route('/client/api/v1/drivers/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,driversController.softDeleteDrivers);
router.route('/client/api/v1/drivers/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,driversController.softDeleteManyDrivers);
router.route('/client/api/v1/drivers/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,driversController.bulkInsertDrivers);
router.route('/client/api/v1/drivers/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,driversController.bulkUpdateDrivers); 
router.route('/client/api/v1/drivers/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,driversController.deleteDrivers);
router.route('/client/api/v1/drivers/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,driversController.deleteManyDrivers);

module.exports = router;
