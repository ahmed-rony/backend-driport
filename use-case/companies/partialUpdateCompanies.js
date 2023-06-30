/**
 *partialUpdateCompanies.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Companies. {status, message, data}
 */
const partialUpdateCompanies = ({ companiesDb }) => async (params,req,res) => {
  const companies = await companiesDb.updateOne(params.query,params.dataToUpdate);
  if (!companies){
    return response.recordNotFound();
  }
  return response.success({ data:companies });
};
module.exports = partialUpdateCompanies;