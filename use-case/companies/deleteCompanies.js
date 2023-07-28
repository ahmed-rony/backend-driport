
/**
 *deleteCompanies.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Companies. {status, message, data}
 */
const deleteCompanies = ({
  companiesDb,reportsDb,vehiclesDb,conversationsDb,driversDb,usersDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedCompanies = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      companiesDb,
      reportsDb,
      vehiclesDb,
      conversationsDb,
      driversDb,
      usersDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      companiesDb,
      reportsDb,
      vehiclesDb,
      conversationsDb,
      driversDb,
      usersDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteCompanies;