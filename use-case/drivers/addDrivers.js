/**
 *addDrivers.js
 */

const  driversEntity = require('../../entities/drivers');
const response = require('../../utils/response');
/**
 * @description : create new record of drivers in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addDrivers = ({
  driversDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let drivers = driversEntity(dataToCreate);
  drivers = await driversDb.create(drivers);
  return response.success({ data:drivers });
};
module.exports = addDrivers;