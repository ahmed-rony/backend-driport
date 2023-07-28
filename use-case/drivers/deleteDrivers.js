
/**
 *deleteDrivers.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Drivers. {status, message, data}
 */
const deleteDrivers = ({
  driversDb,reportsDb,vehiclesDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedDrivers = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      driversDb,
      reportsDb,
      vehiclesDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      driversDb,
      reportsDb,
      vehiclesDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteDrivers;