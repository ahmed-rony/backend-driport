/**
 *addUsers.js
 */

const  usersEntity = require('../../entities/users');
const response = require('../../utils/response');
/**
 * @description : create new record of users in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addUsers = ({
  usersDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let users = usersEntity(dataToCreate);
  users = await usersDb.create(users);
  return response.success({ data:users });
};
module.exports = addUsers;