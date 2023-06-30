const express = require('express');
const router = express.Router();
const vehiclesController = require('../../controller/admin/vehicles');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/vehicles/create').post(vehiclesController.addVehicles);
router.route('/admin/vehicles/addBulk').post(vehiclesController.bulkInsertVehicles);
router.route('/admin/vehicles/list').post(vehiclesController.findAllVehicles);
router.route('/admin/vehicles/count').post(vehiclesController.getVehiclesCount);
router.route('/admin/vehicles/:id').get(vehiclesController.getVehiclesById);
router.route('/admin/vehicles/update/:id').put(vehiclesController.updateVehicles);  
router.route('/admin/vehicles/partial-update/:id').put(vehiclesController.partialUpdateVehicles);  
router.route('/admin/vehicles/updateBulk').put(vehiclesController.bulkUpdateVehicles);
router.route('/admin/vehicles/softDelete/:id').put(vehiclesController.softDeleteVehicles);
router.route('/admin/vehicles/softDeleteMany').put(vehiclesController.softDeleteManyVehicles);
router.route('/admin/vehicles/delete/:id').delete(vehiclesController.deleteVehicles);
router.route('/admin/vehicles/deleteMany').post(vehiclesController.deleteManyVehicles);

module.exports = router;
