const vehiclesDb = require('../../../data-access/vehiclesDb');
const reportsDb = require('../../../data-access/reportsDb');
const driversDb = require('../../../data-access/driversDb');

const vehiclesSchema = require('../../../validation/schema/vehicles');

const createValidation = require('../../../validation')(vehiclesSchema.createSchema);
const updateValidation = require('../../../validation')(vehiclesSchema.updateSchema);
const filterValidation = require('../../../validation')(vehiclesSchema.filterValidationSchema);
const addVehiclesUsecase = require('../../../use-case/vehicles/addVehicles')({
  vehiclesDb,
  createValidation 
});
const bulkInsertVehiclesUsecase = require('../../../use-case/vehicles/bulkInsertVehicles')({ vehiclesDb });
const findAllVehiclesUsecase = require('../../../use-case/vehicles/findAllVehicles')({
  vehiclesDb,
  filterValidation
});
const getVehiclesCountUsecase = require('../../../use-case/vehicles/getVehiclesCount')({
  vehiclesDb,
  filterValidation
});
const getVehiclesUsecase = require('../../../use-case/vehicles/getVehicles')({
  vehiclesDb,
  filterValidation
});
const updateVehiclesUsecase = require('../../../use-case/vehicles/updateVehicles')({
  vehiclesDb,
  updateValidation 
});
const partialUpdateVehiclesUsecase = require('../../../use-case/vehicles/partialUpdateVehicles')({ vehiclesDb });
const bulkUpdateVehiclesUsecase = require('../../../use-case/vehicles/bulkUpdateVehicles')({ vehiclesDb });
const softDeleteVehiclesUsecase = require('../../../use-case/vehicles/softDeleteVehicles')({
  vehiclesDb,
  reportsDb,
  driversDb
});
const softDeleteManyVehiclesUsecase = require('../../../use-case/vehicles/softDeleteManyVehicles')({
  vehiclesDb,
  reportsDb,
  driversDb
});
const deleteVehiclesUsecase = require('../../../use-case/vehicles/deleteVehicles')({
  vehiclesDb,
  reportsDb,
  driversDb
});
const deleteManyVehiclesUsecase = require('../../../use-case/vehicles/deleteManyVehicles')({
  vehiclesDb,
  reportsDb,
  driversDb
});

const vehiclesController = require('./vehicles');

const addVehicles = vehiclesController.addVehicles(addVehiclesUsecase);
const bulkInsertVehicles = vehiclesController.bulkInsertVehicles(bulkInsertVehiclesUsecase);
const findAllVehicles = vehiclesController.findAllVehicles(findAllVehiclesUsecase);
const getVehiclesCount = vehiclesController.getVehiclesCount(getVehiclesCountUsecase);
const getVehiclesById = vehiclesController.getVehicles(getVehiclesUsecase);
const updateVehicles = vehiclesController.updateVehicles(updateVehiclesUsecase);
const partialUpdateVehicles = vehiclesController.partialUpdateVehicles(partialUpdateVehiclesUsecase);
const bulkUpdateVehicles = vehiclesController.bulkUpdateVehicles(bulkUpdateVehiclesUsecase);
const softDeleteVehicles = vehiclesController.softDeleteVehicles(softDeleteVehiclesUsecase);
const softDeleteManyVehicles = vehiclesController.softDeleteManyVehicles(softDeleteManyVehiclesUsecase);
const deleteVehicles = vehiclesController.deleteVehicles(deleteVehiclesUsecase);
const deleteManyVehicles = vehiclesController.deleteManyVehicles(deleteManyVehiclesUsecase);

module.exports = {
  addVehicles,
  bulkInsertVehicles,
  findAllVehicles,
  getVehiclesCount,
  getVehiclesById,
  updateVehicles,
  partialUpdateVehicles,
  bulkUpdateVehicles,
  softDeleteVehicles,
  softDeleteManyVehicles,
  deleteVehicles,
  deleteManyVehicles,
};