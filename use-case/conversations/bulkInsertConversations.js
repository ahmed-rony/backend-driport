
/**
 *bulkInsertConversations.js
 */

const  conversationsEntity = require('../../entities/conversations');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Conversationss. {status, message, data}
 */

const bulkInsertConversations = ({ conversationsDb }) => async (dataToCreate,req,res) => {
  let conversationsEntities = dataToCreate.map(item => conversationsEntity(item));
  let createdConversations = await conversationsDb.create(conversationsEntities);
  return response.success({ data:{ count:createdConversations.length || 0 } });
};
module.exports = bulkInsertConversations;