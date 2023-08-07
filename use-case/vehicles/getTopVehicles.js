/**
 *getTopVehicles.js
 */

const response = require('../../utils/response');
/**
 * @description : returns total number of records of vehicles
 * @param {Object} params : request body including where conditions.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of count. {status, message, data}
 */
const getTopVehicles = ({
  reportsDb,filterValidation 
}) => async (params,req,res) => {
  
  let { aggregate } = params;
  let topVehicles = await reportsDb.getTopVehiclesWithMostReports(aggregate);
  return response.success({ data: { topVehicles } });
};
module.exports = getTopVehicles;