
/**
 *bulkInsertReports.js
 */

const  reportsEntity = require('../../entities/reports');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Reportss. {status, message, data}
 */

const bulkInsertReports = ({ reportsDb }) => async (dataToCreate,req,res) => {
  let reportsEntities = dataToCreate.map(item => reportsEntity(item));
  let createdReports = await reportsDb.create(reportsEntities);
  return response.success({ data:{ count:createdReports.length || 0 } });
};
module.exports = bulkInsertReports;