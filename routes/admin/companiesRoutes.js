const express = require('express');
const router = express.Router();
const companiesController = require('../../controller/admin/companies');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/companies/create').post(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.addCompanies);
router.route('/admin/companies/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.bulkInsertCompanies);
router.route('/admin/companies/list').post(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.findAllCompanies);
router.route('/admin/companies/count').post(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.getCompaniesCount);
router.route('/admin/companies/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.getCompaniesById);
router.route('/admin/companies/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.updateCompanies);   
router.route('/admin/companies/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.partialUpdateCompanies);   
router.route('/admin/companies/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.bulkUpdateCompanies); 
router.route('/admin/companies/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.softDeleteCompanies);
router.route('/admin/companies/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.softDeleteManyCompanies);
router.route('/admin/companies/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.deleteCompanies);
router.route('/admin/companies/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,companiesController.deleteManyCompanies);

module.exports = router;
