/**
 *addReports.js
 */

const  reportsEntity = require('../../entities/reports');
const response = require('../../utils/response');
/**
 * @description : create new record of reports in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addReports = ({
  reportsDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let reports = reportsEntity(dataToCreate);
  reports = await reportsDb.create(reports);
  return response.success({ data:reports });
};
module.exports = addReports;