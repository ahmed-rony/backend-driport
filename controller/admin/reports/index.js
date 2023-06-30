const reportsDb = require('../../../data-access/reportsDb');

const reportsSchema = require('../../../validation/schema/reports');

const createValidation = require('../../../validation')(reportsSchema.createSchema);
const updateValidation = require('../../../validation')(reportsSchema.updateSchema);
const filterValidation = require('../../../validation')(reportsSchema.filterValidationSchema);
const addReportsUsecase = require('../../../use-case/reports/addReports')({
  reportsDb,
  createValidation 
});
const bulkInsertReportsUsecase = require('../../../use-case/reports/bulkInsertReports')({ reportsDb });
const findAllReportsUsecase = require('../../../use-case/reports/findAllReports')({
  reportsDb,
  filterValidation
});
const getReportsCountUsecase = require('../../../use-case/reports/getReportsCount')({
  reportsDb,
  filterValidation
});
const getReportsUsecase = require('../../../use-case/reports/getReports')({
  reportsDb,
  filterValidation
});
const updateReportsUsecase = require('../../../use-case/reports/updateReports')({
  reportsDb,
  updateValidation 
});
const partialUpdateReportsUsecase = require('../../../use-case/reports/partialUpdateReports')({ reportsDb });
const bulkUpdateReportsUsecase = require('../../../use-case/reports/bulkUpdateReports')({ reportsDb });
const softDeleteReportsUsecase = require('../../../use-case/reports/softDeleteReports')({ reportsDb });
const softDeleteManyReportsUsecase = require('../../../use-case/reports/softDeleteManyReports')({ reportsDb });
const deleteReportsUsecase = require('../../../use-case/reports/deleteReports')({ reportsDb });
const deleteManyReportsUsecase = require('../../../use-case/reports/deleteManyReports')({ reportsDb });

const reportsController = require('./reports');

const addReports = reportsController.addReports(addReportsUsecase);
const bulkInsertReports = reportsController.bulkInsertReports(bulkInsertReportsUsecase);
const findAllReports = reportsController.findAllReports(findAllReportsUsecase);
const getReportsCount = reportsController.getReportsCount(getReportsCountUsecase);
const getReportsById = reportsController.getReports(getReportsUsecase);
const updateReports = reportsController.updateReports(updateReportsUsecase);
const partialUpdateReports = reportsController.partialUpdateReports(partialUpdateReportsUsecase);
const bulkUpdateReports = reportsController.bulkUpdateReports(bulkUpdateReportsUsecase);
const softDeleteReports = reportsController.softDeleteReports(softDeleteReportsUsecase);
const softDeleteManyReports = reportsController.softDeleteManyReports(softDeleteManyReportsUsecase);
const deleteReports = reportsController.deleteReports(deleteReportsUsecase);
const deleteManyReports = reportsController.deleteManyReports(deleteManyReportsUsecase);

module.exports = {
  addReports,
  bulkInsertReports,
  findAllReports,
  getReportsCount,
  getReportsById,
  updateReports,
  partialUpdateReports,
  bulkUpdateReports,
  softDeleteReports,
  softDeleteManyReports,
  deleteReports,
  deleteManyReports,
};