/**
 *addVehicles.js
 */

const  vehiclesEntity = require('../../entities/vehicles');
const response = require('../../utils/response');
/**
 * @description : create new record of vehicles in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addVehicles = ({
  vehiclesDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let vehicles = vehiclesEntity(dataToCreate);
  vehicles = await vehiclesDb.create(vehicles);
  return response.success({ data:vehicles });
};
module.exports = addVehicles;