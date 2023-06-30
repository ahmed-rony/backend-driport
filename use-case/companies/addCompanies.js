/**
 *addCompanies.js
 */

const  companiesEntity = require('../../entities/companies');
const response = require('../../utils/response');
/**
 * @description : create new record of companies in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addCompanies = ({
  companiesDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let companies = companiesEntity(dataToCreate);
  companies = await companiesDb.create(companies);
  return response.success({ data:companies });
};
module.exports = addCompanies;