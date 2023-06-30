/**
 *updateDrivers.js
 */

const  driversEntity = require('../../entities/drivers');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Drivers. {status, message, data}
 */
const updateDrivers = ({
  driversDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let drivers = driversEntity(dataToUpdate);
  drivers = await driversDb.updateOne(query,drivers);
  if (!drivers){
    return response.recordNotFound();
  }
  return response.success({ data:drivers });
};
module.exports = updateDrivers;