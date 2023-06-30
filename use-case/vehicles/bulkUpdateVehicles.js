/**
 *bulkUpdateVehicles.js
 */

const response = require('../../utils/response');

/**
 * @description : update multiple records of vehicles with data by filter.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of bulkUpdate. {status, message, data}
 */
const bulkUpdateVehicles = ({ vehiclesDb }) => async (params,req,res) => {
  const updatedVehicles = await vehiclesDb.updateMany(params.query,params.dataToUpdate);
  return response.success({ data:{ count:updatedVehicles } });
};
module.exports = bulkUpdateVehicles;