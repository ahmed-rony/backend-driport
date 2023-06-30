const express = require('express');
const router = express.Router();
const vehiclesController = require('../../../controller/client/v1/vehicles');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/vehicles/create').post(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.addVehicles);
router.route('/client/api/v1/vehicles/list').post(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.findAllVehicles);
router.route('/client/api/v1/vehicles/count').post(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.getVehiclesCount);
router.route('/client/api/v1/vehicles/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.getVehiclesById);
router.route('/client/api/v1/vehicles/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.updateVehicles);   
router.route('/client/api/v1/vehicles/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.partialUpdateVehicles);   
router.route('/client/api/v1/vehicles/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.softDeleteVehicles);
router.route('/client/api/v1/vehicles/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.softDeleteManyVehicles);
router.route('/client/api/v1/vehicles/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.bulkInsertVehicles);
router.route('/client/api/v1/vehicles/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.bulkUpdateVehicles); 
router.route('/client/api/v1/vehicles/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.deleteVehicles);
router.route('/client/api/v1/vehicles/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,vehiclesController.deleteManyVehicles);

module.exports = router;
