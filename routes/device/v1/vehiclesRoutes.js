const express = require('express');
const router = express.Router();
const vehiclesController = require('../../../controller/device/v1/vehicles');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/vehicles/create').post(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.addVehicles);
router.route('/device/api/v1/vehicles/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.bulkInsertVehicles);
router.route('/device/api/v1/vehicles/list').post(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.findAllVehicles);
router.route('/device/api/v1/vehicles/count').post(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.getVehiclesCount);
router.route('/device/api/v1/vehicles/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.getVehiclesById);
router.route('/device/api/v1/vehicles/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.updateVehicles);   
router.route('/device/api/v1/vehicles/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.partialUpdateVehicles);   
router.route('/device/api/v1/vehicles/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.bulkUpdateVehicles); 
router.route('/device/api/v1/vehicles/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.softDeleteVehicles);
router.route('/device/api/v1/vehicles/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.softDeleteManyVehicles);
router.route('/device/api/v1/vehicles/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.deleteVehicles);
router.route('/device/api/v1/vehicles/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,vehiclesController.deleteManyVehicles);

module.exports = router;
