
/**
 *bulkInsertUsers.js
 */

const  usersEntity = require('../../entities/users');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Userss. {status, message, data}
 */

const bulkInsertUsers = ({ usersDb }) => async (dataToCreate,req,res) => {
  let usersEntities = dataToCreate.map(item => usersEntity(item));
  let createdUsers = await usersDb.create(usersEntities);
  return response.success({ data:{ count:createdUsers.length || 0 } });
};
module.exports = bulkInsertUsers;