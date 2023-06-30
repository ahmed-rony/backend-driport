const express = require('express');
const router = express.Router();
const companiesController = require('../../../controller/client/v1/companies');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/companies/create').post(companiesController.addCompanies);
router.route('/client/api/v1/companies/addBulk').post(companiesController.bulkInsertCompanies);
router.route('/client/api/v1/companies/list').post(companiesController.findAllCompanies);
router.route('/client/api/v1/companies/count').post(companiesController.getCompaniesCount);
router.route('/client/api/v1/companies/:id').get(companiesController.getCompaniesById);
router.route('/client/api/v1/companies/update/:id').put(companiesController.updateCompanies);  
router.route('/client/api/v1/companies/partial-update/:id').put(companiesController.partialUpdateCompanies);  
router.route('/client/api/v1/companies/updateBulk').put(companiesController.bulkUpdateCompanies);
router.route('/client/api/v1/companies/softDelete/:id').put(companiesController.softDeleteCompanies);
router.route('/client/api/v1/companies/softDeleteMany').put(companiesController.softDeleteManyCompanies);
router.route('/client/api/v1/companies/delete/:id').delete(companiesController.deleteCompanies);
router.route('/client/api/v1/companies/deleteMany').post(companiesController.deleteManyCompanies);

module.exports = router;
