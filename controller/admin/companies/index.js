const companiesDb = require('../../../data-access/companiesDb');
const reportsDb = require('../../../data-access/reportsDb');
const vehiclesDb = require('../../../data-access/vehiclesDb');
const conversationsDb = require('../../../data-access/conversationsDb');
const driversDb = require('../../../data-access/driversDb');
const usersDb = require('../../../data-access/usersDb');

const companiesSchema = require('../../../validation/schema/companies');

const createValidation = require('../../../validation')(companiesSchema.createSchema);
const updateValidation = require('../../../validation')(companiesSchema.updateSchema);
const filterValidation = require('../../../validation')(companiesSchema.filterValidationSchema);
const addCompaniesUsecase = require('../../../use-case/companies/addCompanies')({
  companiesDb,
  createValidation 
});
const bulkInsertCompaniesUsecase = require('../../../use-case/companies/bulkInsertCompanies')({ companiesDb });
const findAllCompaniesUsecase = require('../../../use-case/companies/findAllCompanies')({
  companiesDb,
  filterValidation
});
const getCompaniesCountUsecase = require('../../../use-case/companies/getCompaniesCount')({
  companiesDb,
  filterValidation
});
const getCompaniesUsecase = require('../../../use-case/companies/getCompanies')({
  companiesDb,
  filterValidation
});
const updateCompaniesUsecase = require('../../../use-case/companies/updateCompanies')({
  companiesDb,
  updateValidation 
});
const partialUpdateCompaniesUsecase = require('../../../use-case/companies/partialUpdateCompanies')({ companiesDb });
const bulkUpdateCompaniesUsecase = require('../../../use-case/companies/bulkUpdateCompanies')({ companiesDb });
const softDeleteCompaniesUsecase = require('../../../use-case/companies/softDeleteCompanies')({
  companiesDb,
  reportsDb,
  vehiclesDb,
  conversationsDb,
  driversDb,
  usersDb
});
const softDeleteManyCompaniesUsecase = require('../../../use-case/companies/softDeleteManyCompanies')({
  companiesDb,
  reportsDb,
  vehiclesDb,
  conversationsDb,
  driversDb,
  usersDb
});
const deleteCompaniesUsecase = require('../../../use-case/companies/deleteCompanies')({
  companiesDb,
  reportsDb,
  vehiclesDb,
  conversationsDb,
  driversDb,
  usersDb
});
const deleteManyCompaniesUsecase = require('../../../use-case/companies/deleteManyCompanies')({
  companiesDb,
  reportsDb,
  vehiclesDb,
  conversationsDb,
  driversDb,
  usersDb
});

const companiesController = require('./companies');

const addCompanies = companiesController.addCompanies(addCompaniesUsecase);
const bulkInsertCompanies = companiesController.bulkInsertCompanies(bulkInsertCompaniesUsecase);
const findAllCompanies = companiesController.findAllCompanies(findAllCompaniesUsecase);
const getCompaniesCount = companiesController.getCompaniesCount(getCompaniesCountUsecase);
const getCompaniesById = companiesController.getCompanies(getCompaniesUsecase);
const updateCompanies = companiesController.updateCompanies(updateCompaniesUsecase);
const partialUpdateCompanies = companiesController.partialUpdateCompanies(partialUpdateCompaniesUsecase);
const bulkUpdateCompanies = companiesController.bulkUpdateCompanies(bulkUpdateCompaniesUsecase);
const softDeleteCompanies = companiesController.softDeleteCompanies(softDeleteCompaniesUsecase);
const softDeleteManyCompanies = companiesController.softDeleteManyCompanies(softDeleteManyCompaniesUsecase);
const deleteCompanies = companiesController.deleteCompanies(deleteCompaniesUsecase);
const deleteManyCompanies = companiesController.deleteManyCompanies(deleteManyCompaniesUsecase);

module.exports = {
  addCompanies,
  bulkInsertCompanies,
  findAllCompanies,
  getCompaniesCount,
  getCompaniesById,
  updateCompanies,
  partialUpdateCompanies,
  bulkUpdateCompanies,
  softDeleteCompanies,
  softDeleteManyCompanies,
  deleteCompanies,
  deleteManyCompanies,
};