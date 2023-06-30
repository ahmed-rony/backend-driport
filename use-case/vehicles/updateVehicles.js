/**
 *updateVehicles.js
 */

const  vehiclesEntity = require('../../entities/vehicles');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Vehicles. {status, message, data}
 */
const updateVehicles = ({
  vehiclesDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let vehicles = vehiclesEntity(dataToUpdate);
  vehicles = await vehiclesDb.updateOne(query,vehicles);
  if (!vehicles){
    return response.recordNotFound();
  }
  return response.success({ data:vehicles });
};
module.exports = updateVehicles;