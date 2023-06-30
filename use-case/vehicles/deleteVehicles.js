
/**
 *deleteVehicles.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Vehicles. {status, message, data}
 */
const deleteVehicles = ({
  vehiclesDb,reportsDb,driversDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedVehicles = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      vehiclesDb,
      reportsDb,
      driversDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      vehiclesDb,
      reportsDb,
      driversDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteVehicles;