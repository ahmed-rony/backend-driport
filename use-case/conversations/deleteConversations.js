
/**
 *deleteConversations.js
 */
 
const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete record from database.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : deleted Conversations. {status, message, data}
 */
const deleteConversations = ({
  conversationsDb,reportsDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedConversations = {};
  if (isWarning) {
    const getDependencyCount = makeGetDependencyCount({
      conversationsDb,
      reportsDb
    });
    return await getDependencyCount(query);
  } else {
    const deleteWithDependency = makeDeleteWithDependency({
      conversationsDb,
      reportsDb
    });
    return await deleteWithDependency(query);
  }
};

module.exports = deleteConversations;