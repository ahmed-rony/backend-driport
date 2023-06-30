const express = require('express');
const router = express.Router();
const driversController = require('../../controller/admin/drivers');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/drivers/create').post(auth(PLATFORM.ADMIN),checkRolePermission,driversController.addDrivers);
router.route('/admin/drivers/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,driversController.bulkInsertDrivers);
router.route('/admin/drivers/list').post(auth(PLATFORM.ADMIN),checkRolePermission,driversController.findAllDrivers);
router.route('/admin/drivers/count').post(auth(PLATFORM.ADMIN),checkRolePermission,driversController.getDriversCount);
router.route('/admin/drivers/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,driversController.getDriversById);
router.route('/admin/drivers/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,driversController.updateDrivers);   
router.route('/admin/drivers/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,driversController.partialUpdateDrivers);   
router.route('/admin/drivers/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,driversController.bulkUpdateDrivers); 
router.route('/admin/drivers/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,driversController.softDeleteDrivers);
router.route('/admin/drivers/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,driversController.softDeleteManyDrivers);
router.route('/admin/drivers/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,driversController.deleteDrivers);
router.route('/admin/drivers/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,driversController.deleteManyDrivers);

module.exports = router;
