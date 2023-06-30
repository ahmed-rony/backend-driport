/**
 *partialUpdateUsers.js
 */

const response = require('../../utils/response');

/**
 * @description : partially update record with data by id;
 * @param {Object} params : request body.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {obj} : updated Users. {status, message, data}
 */
const partialUpdateUsers = ({ usersDb }) => async (params,req,res) => {
  const users = await usersDb.updateOne(params.query,params.dataToUpdate);
  if (!users){
    return response.recordNotFound();
  }
  return response.success({ data:users });
};
module.exports = partialUpdateUsers;