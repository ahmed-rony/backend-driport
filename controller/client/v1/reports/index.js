const reportsDb = require('../../../../data-access/reportsDb');

const reportsSchema = require('../../../../validation/schema/reports');

const createValidation = require('../../../../validation')(reportsSchema.createSchema);
const updateValidation = require('../../../../validation')(reportsSchema.updateSchema);
const filterValidation = require('../../../../validation')(reportsSchema.filterValidationSchema);
const findAllReportsUsecase = require('../../../../use-case/reports/findAllReports')({
  reportsDb,
  filterValidation
});
const getReportsCountUsecase = require('../../../../use-case/reports/getReportsCount')({
  reportsDb,
  filterValidation
});
const getReportsUsecase = require('../../../../use-case/reports/getReports')({
  reportsDb,
  filterValidation
});

const reportsController = require('./reports');

const findAllReports = reportsController.findAllReports(findAllReportsUsecase);
const getReportsCount = reportsController.getReportsCount(getReportsCountUsecase);
const getReportsById = reportsController.getReports(getReportsUsecase);

module.exports = {
  findAllReports,
  getReportsCount,
  getReportsById,
};