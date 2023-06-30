/**
 *partialUpdateDrivers.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Drivers. {status, message, data}
 */
const partialUpdateDrivers = ({ driversDb }) => async (params,req,res) => {
  const drivers = await driversDb.updateOne(params.query,params.dataToUpdate);
  if (!drivers){
    return response.recordNotFound();
  }
  return response.success({ data:drivers });
};
module.exports = partialUpdateDrivers;