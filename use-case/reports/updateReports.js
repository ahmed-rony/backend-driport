/**
 *updateReports.js
 */

const  reportsEntity = require('../../entities/reports');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Reports. {status, message, data}
 */
const updateReports = ({
  reportsDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let reports = reportsEntity(dataToUpdate);
  reports = await reportsDb.updateOne(query,reports);
  if (!reports){
    return response.recordNotFound();
  }
  return response.success({ data:reports });
};
module.exports = updateReports;