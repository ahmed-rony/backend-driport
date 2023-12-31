/**
 *updateUsers.js
 */

const  usersEntity = require('../../entities/users');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Users. {status, message, data}
 */
const updateUsers = ({
  usersDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let users = usersEntity(dataToUpdate);
  users = await usersDb.updateOne(query,users);
  if (!users){
    return response.recordNotFound();
  }
  return response.success({ data:users });
};
module.exports = updateUsers;