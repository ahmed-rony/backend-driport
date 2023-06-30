/**
 *partialUpdateConversations.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Conversations. {status, message, data}
 */
const partialUpdateConversations = ({ conversationsDb }) => async (params,req,res) => {
  const conversations = await conversationsDb.updateOne(params.query,params.dataToUpdate);
  if (!conversations){
    return response.recordNotFound();
  }
  return response.success({ data:conversations });
};
module.exports = partialUpdateConversations;