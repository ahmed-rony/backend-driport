
/**
 *bulkInsertUsers.js
 */

const authConstant = require('../../constants/authConstant');
const  usersEntity = require('../../entities/users');
const response = require('../../utils/response');

/**
 * @description : create multiple records  in database.
 * @param {Object} dataToCreate : data for creating documents.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : created Userss. {status, message, data}
 */

const bulkInsertUsers = ({
  usersDb,roleDb,userRoleDb
}) => async (dataToCreate,req,res) => {
  let usersEntities = dataToCreate.map(item => usersEntity(item));
  let createdUsers = await usersDb.create(usersEntities);
  if (createdUsers && createdUsers.length) {
    const defaultRole = await roleDb.findOne({ name: authConstant.DEFAULT_USER_ROLE });
    let userRoleData = createdUsers.map(r => {
      if (r.id) {
        return {
          userId: r.id,
          roleId: defaultRole.id
        };
      }
    });
    if (userRoleData.length){
      await userRoleDb.create(userRoleData);
    }
  }
  return response.success({ data:{ count:createdUsers.length || 0 } });
};
module.exports = bulkInsertUsers;