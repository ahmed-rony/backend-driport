/**
 *softDeleteCompanies.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeSoftDeleteWithDependency = require('./deleteDependent').softDeleteWithDependency;
const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Companies. {status, message, data}
 */
const softDeleteCompanies = ({
  companiesDb,reportsDb,vehiclesDb,usersDb
}) => async (params,req,res) => {
  let {
    query, dataToUpdate,isWarning 
  } = params;
  let updatedCompanies = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      companiesDb,
      reportsDb,
      vehiclesDb,
      usersDb
    });
    return await getDependencyCount(query);
  } else {
    const softDeleteWithDependency = makeSoftDeleteWithDependency({
      companiesDb,
      reportsDb,
      vehiclesDb,
      usersDb
    });
    return await softDeleteWithDependency(query, dataToUpdate);
  }
};
module.exports = softDeleteCompanies;