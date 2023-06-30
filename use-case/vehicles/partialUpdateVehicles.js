/**
 *partialUpdateVehicles.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Vehicles. {status, message, data}
 */
const partialUpdateVehicles = ({ vehiclesDb }) => async (params,req,res) => {
  const vehicles = await vehiclesDb.updateOne(params.query,params.dataToUpdate);
  if (!vehicles){
    return response.recordNotFound();
  }
  return response.success({ data:vehicles });
};
module.exports = partialUpdateVehicles;