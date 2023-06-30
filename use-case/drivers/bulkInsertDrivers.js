
/**
 *bulkInsertDrivers.js
 */

const  driversEntity = require('../../entities/drivers');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Driverss. {status, message, data}
 */

const bulkInsertDrivers = ({ driversDb }) => async (dataToCreate,req,res) => {
  let driversEntities = dataToCreate.map(item => driversEntity(item));
  let createdDrivers = await driversDb.create(driversEntities);
  return response.success({ data:{ count:createdDrivers.length || 0 } });
};
module.exports = bulkInsertDrivers;