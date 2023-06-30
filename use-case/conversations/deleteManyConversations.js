/**
 *deleteManyConversations.js
 */

const makeGetDependencyCount = require('./deleteDependent').getDependencyCount;
const makeDeleteWithDependency = require('./deleteDependent').deleteWithDependency;
const response = require('../../utils/response');
    
/**
 * @description : delete documents from table by using ids.
 * @param {Object} params : request body including query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : no of documents deleted. {status, message, data}
 */
const deleteManyConversations = ({
  conversationsDb,reportsDb
}) => async (params,req,res) => {
  let {
    query,isWarning 
  } = params;
  let deletedConversations;
  if (isWarning){
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
module.exports = deleteManyConversations;