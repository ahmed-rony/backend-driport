const express = require('express');
const router = express.Router();
const companiesController = require('../../../controller/client/v1/companies');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/companies/create').post(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.addCompanies);
router.route('/client/api/v1/companies/list').post(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.findAllCompanies);
router.route('/client/api/v1/companies/count').post(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.getCompaniesCount);
router.route('/client/api/v1/companies/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.getCompaniesById);
router.route('/client/api/v1/companies/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.updateCompanies);   
router.route('/client/api/v1/companies/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.partialUpdateCompanies);   
router.route('/client/api/v1/companies/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.softDeleteCompanies);
router.route('/client/api/v1/companies/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.softDeleteManyCompanies);
router.route('/client/api/v1/companies/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.bulkInsertCompanies);
router.route('/client/api/v1/companies/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.bulkUpdateCompanies); 
router.route('/client/api/v1/companies/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.deleteCompanies);
router.route('/client/api/v1/companies/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,companiesController.deleteManyCompanies);

module.exports = router;
