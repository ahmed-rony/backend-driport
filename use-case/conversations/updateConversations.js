/**
 *updateConversations.js
 */

const  conversationsEntity = require('../../entities/conversations');
const response = require('../../utils/response');

/**
 * @description : update record with data by id.
 * @param {Object} params : request body including query and data.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : updated Conversations. {status, message, data}
 */
const updateConversations = ({
  conversationsDb, updateValidation
}) => async (params,req,res) => {
  let {
    dataToUpdate, query 
  } = params;
  const validateRequest = await updateValidation(dataToUpdate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  let conversations = conversationsEntity(dataToUpdate);
  conversations = await conversationsDb.updateOne(query,conversations);
  if (!conversations){
    return response.recordNotFound();
  }
  return response.success({ data:conversations });
};
module.exports = updateConversations;