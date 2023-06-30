/**
 *softDeleteVehicles.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Vehicles. {status, message, data}
 */
const softDeleteVehicles = ({
  vehiclesDb,reportsDb,driversDb
}) => async (params,req,res) => {
  let {
    query, dataToUpdate,isWarning 
  } = params;
  let updatedVehicles = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      vehiclesDb,
      reportsDb,
      driversDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      vehiclesDb,
      reportsDb,
      driversDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteVehicles;