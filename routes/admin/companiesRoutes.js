const express = require('express');
const router = express.Router();
const companiesController = require('../../controller/admin/companies');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/companies/create').post(companiesController.addCompanies);
router.route('/admin/companies/addBulk').post(companiesController.bulkInsertCompanies);
router.route('/admin/companies/list').post(companiesController.findAllCompanies);
router.route('/admin/companies/count').post(companiesController.getCompaniesCount);
router.route('/admin/companies/:id').get(companiesController.getCompaniesById);
router.route('/admin/companies/update/:id').put(companiesController.updateCompanies);  
router.route('/admin/companies/partial-update/:id').put(companiesController.partialUpdateCompanies);  
router.route('/admin/companies/updateBulk').put(companiesController.bulkUpdateCompanies);
router.route('/admin/companies/softDelete/:id').put(companiesController.softDeleteCompanies);
router.route('/admin/companies/softDeleteMany').put(companiesController.softDeleteManyCompanies);
router.route('/admin/companies/delete/:id').delete(companiesController.deleteCompanies);
router.route('/admin/companies/deleteMany').post(companiesController.deleteManyCompanies);

module.exports = router;
