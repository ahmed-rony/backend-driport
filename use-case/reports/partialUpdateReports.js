/**
 *partialUpdateReports.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Reports. {status, message, data}
 */
const partialUpdateReports = ({ reportsDb }) => async (params,req,res) => {
  const reports = await reportsDb.updateOne(params.query,params.dataToUpdate);
  if (!reports){
    return response.recordNotFound();
  }
  return response.success({ data:reports });
};
module.exports = partialUpdateReports;