const driversDb = require('../../../../data-access/driversDb');
const reportsDb = require('../../../../data-access/reportsDb');
const vehiclesDb = require('../../../../data-access/vehiclesDb');

const driversSchema = require('../../../../validation/schema/drivers');

const createValidation = require('../../../../validation')(driversSchema.createSchema);
const updateValidation = require('../../../../validation')(driversSchema.updateSchema);
const filterValidation = require('../../../../validation')(driversSchema.filterValidationSchema);
const addDriversUsecase = require('../../../../use-case/drivers/addDrivers')({
  driversDb,
  createValidation 
});
const bulkInsertDriversUsecase = require('../../../../use-case/drivers/bulkInsertDrivers')({ driversDb });
const findAllDriversUsecase = require('../../../../use-case/drivers/findAllDrivers')({
  driversDb,
  filterValidation
});
const getDriversCountUsecase = require('../../../../use-case/drivers/getDriversCount')({
  driversDb,
  filterValidation
});
const getDriversUsecase = require('../../../../use-case/drivers/getDrivers')({
  driversDb,
  filterValidation
});
const updateDriversUsecase = require('../../../../use-case/drivers/updateDrivers')({
  driversDb,
  updateValidation 
});
const partialUpdateDriversUsecase = require('../../../../use-case/drivers/partialUpdateDrivers')({ driversDb });
const bulkUpdateDriversUsecase = require('../../../../use-case/drivers/bulkUpdateDrivers')({ driversDb });
const softDeleteDriversUsecase = require('../../../../use-case/drivers/softDeleteDrivers')({
  driversDb,
  reportsDb,
  vehiclesDb
});
const softDeleteManyDriversUsecase = require('../../../../use-case/drivers/softDeleteManyDrivers')({
  driversDb,
  reportsDb,
  vehiclesDb
});
const deleteDriversUsecase = require('../../../../use-case/drivers/deleteDrivers')({
  driversDb,
  reportsDb,
  vehiclesDb
});
const deleteManyDriversUsecase = require('../../../../use-case/drivers/deleteManyDrivers')({
  driversDb,
  reportsDb,
  vehiclesDb
});

const driversController = require('./drivers');

const addDrivers = driversController.addDrivers(addDriversUsecase);
const bulkInsertDrivers = driversController.bulkInsertDrivers(bulkInsertDriversUsecase);
const findAllDrivers = driversController.findAllDrivers(findAllDriversUsecase);
const getDriversCount = driversController.getDriversCount(getDriversCountUsecase);
const getDriversById = driversController.getDrivers(getDriversUsecase);
const updateDrivers = driversController.updateDrivers(updateDriversUsecase);
const partialUpdateDrivers = driversController.partialUpdateDrivers(partialUpdateDriversUsecase);
const bulkUpdateDrivers = driversController.bulkUpdateDrivers(bulkUpdateDriversUsecase);
const softDeleteDrivers = driversController.softDeleteDrivers(softDeleteDriversUsecase);
const softDeleteManyDrivers = driversController.softDeleteManyDrivers(softDeleteManyDriversUsecase);
const deleteDrivers = driversController.deleteDrivers(deleteDriversUsecase);
const deleteManyDrivers = driversController.deleteManyDrivers(deleteManyDriversUsecase);

module.exports = {
  addDrivers,
  bulkInsertDrivers,
  findAllDrivers,
  getDriversCount,
  getDriversById,
  updateDrivers,
  partialUpdateDrivers,
  bulkUpdateDrivers,
  softDeleteDrivers,
  softDeleteManyDrivers,
  deleteDrivers,
  deleteManyDrivers,
};