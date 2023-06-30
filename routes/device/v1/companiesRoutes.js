const express = require('express');
const router = express.Router();
const companiesController = require('../../../controller/device/v1/companies');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/companies/create').post(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.addCompanies);
router.route('/device/api/v1/companies/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.bulkInsertCompanies);
router.route('/device/api/v1/companies/list').post(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.findAllCompanies);
router.route('/device/api/v1/companies/count').post(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.getCompaniesCount);
router.route('/device/api/v1/companies/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.getCompaniesById);
router.route('/device/api/v1/companies/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.updateCompanies);   
router.route('/device/api/v1/companies/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.partialUpdateCompanies);   
router.route('/device/api/v1/companies/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.bulkUpdateCompanies); 
router.route('/device/api/v1/companies/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.softDeleteCompanies);
router.route('/device/api/v1/companies/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.softDeleteManyCompanies);
router.route('/device/api/v1/companies/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.deleteCompanies);
router.route('/device/api/v1/companies/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,companiesController.deleteManyCompanies);

module.exports = router;
