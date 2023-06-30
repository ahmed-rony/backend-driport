/**
 *addConversations.js
 */

const  conversationsEntity = require('../../entities/conversations');
const response = require('../../utils/response');
/**
 * @description : create new record of conversations in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addConversations = ({
  conversationsDb,createValidation 
}) => async (dataToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let conversations = conversationsEntity(dataToCreate);
  conversations = await conversationsDb.create(conversations);
  return response.success({ data:conversations });
};
module.exports = addConversations;