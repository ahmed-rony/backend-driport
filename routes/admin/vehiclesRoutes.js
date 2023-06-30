const express = require('express');
const router = express.Router();
const vehiclesController = require('../../controller/admin/vehicles');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/vehicles/create').post(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.addVehicles);
router.route('/admin/vehicles/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.bulkInsertVehicles);
router.route('/admin/vehicles/list').post(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.findAllVehicles);
router.route('/admin/vehicles/count').post(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.getVehiclesCount);
router.route('/admin/vehicles/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.getVehiclesById);
router.route('/admin/vehicles/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.updateVehicles);   
router.route('/admin/vehicles/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.partialUpdateVehicles);   
router.route('/admin/vehicles/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.bulkUpdateVehicles); 
router.route('/admin/vehicles/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.softDeleteVehicles);
router.route('/admin/vehicles/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.softDeleteManyVehicles);
router.route('/admin/vehicles/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.deleteVehicles);
router.route('/admin/vehicles/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,vehiclesController.deleteManyVehicles);

module.exports = router;
