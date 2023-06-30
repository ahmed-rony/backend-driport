
/**
 *deleteReports.js
 */
 
const response = require('../../utils/response');
/**
 * @description : delete record from database.
 * @param {Object} query : query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Reports. {status, message, data}
 */
const deleteReports = ({ reportsDb }) => async (query,req,res) => {
  let deletedReports = await reportsDb.deleteOne(query);
  if (!deletedReports){
    return response.recordNotFound({});
  }
  return response.success({ data: deletedReports });
};

module.exports = deleteReports;