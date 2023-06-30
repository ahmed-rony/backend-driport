/**
 *softDeleteReports.js
 */

const response = require('../../utils/response');

/**
 * @description : soft delete record from database by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response..
 * @return {Object} : deactivated Reports. {status, message, data}
 */
const softDeleteReports = ({ reportsDb }) => async (params,req,res) => {
  let updatedReports = await reportsDb.updateOne(params.query, params.dataToUpdate);
  if (!updatedReports){
    return response.recordNotFound();   
  }
  return response.success({ data:updatedReports });
};
module.exports = softDeleteReports;