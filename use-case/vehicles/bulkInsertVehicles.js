
/**
 *bulkInsertVehicles.js
 */

const  vehiclesEntity = require('../../entities/vehicles');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Vehicless. {status, message, data}
 */

const bulkInsertVehicles = ({ vehiclesDb }) => async (dataToCreate,req,res) => {
  let vehiclesEntities = dataToCreate.map(item => vehiclesEntity(item));
  let createdVehicles = await vehiclesDb.create(vehiclesEntities);
  return response.success({ data:{ count:createdVehicles.length || 0 } });
};
module.exports = bulkInsertVehicles;