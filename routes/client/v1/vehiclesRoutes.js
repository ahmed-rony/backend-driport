const express = require('express');
const router = express.Router();
const vehiclesController = require('../../../controller/client/v1/vehicles');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/vehicles/create').post(vehiclesController.addVehicles);
router.route('/client/api/v1/vehicles/addBulk').post(vehiclesController.bulkInsertVehicles);
router.route('/client/api/v1/vehicles/list').post(vehiclesController.findAllVehicles);
router.route('/client/api/v1/vehicles/count').post(vehiclesController.getVehiclesCount);
router.route('/client/api/v1/vehicles/:id').get(vehiclesController.getVehiclesById);
router.route('/client/api/v1/vehicles/update/:id').put(vehiclesController.updateVehicles);  
router.route('/client/api/v1/vehicles/partial-update/:id').put(vehiclesController.partialUpdateVehicles);  
router.route('/client/api/v1/vehicles/updateBulk').put(vehiclesController.bulkUpdateVehicles);
router.route('/client/api/v1/vehicles/softDelete/:id').put(vehiclesController.softDeleteVehicles);
router.route('/client/api/v1/vehicles/softDeleteMany').put(vehiclesController.softDeleteManyVehicles);
router.route('/client/api/v1/vehicles/delete/:id').delete(vehiclesController.deleteVehicles);
router.route('/client/api/v1/vehicles/deleteMany').post(vehiclesController.deleteManyVehicles);

module.exports = router;
