
/**
 *bulkInsertCompanies.js
 */

const  companiesEntity = require('../../entities/companies');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Companiess. {status, message, data}
 */

const bulkInsertCompanies = ({ companiesDb }) => async (dataToCreate,req,res) => {
  let companiesEntities = dataToCreate.map(item => companiesEntity(item));
  let createdCompanies = await companiesDb.create(companiesEntities);
  return response.success({ data:{ count:createdCompanies.length || 0 } });
};
module.exports = bulkInsertCompanies;