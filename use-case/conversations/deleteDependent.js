const response = require('../../utils/response');

const getDependencyCount = ({
  conversationsDb,reportsDb
})=> async (filter) =>{
  let conversations = await conversationsDb.findMany(filter);
  if (conversations.length){
    let conversationsIds = conversations.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ conversationId : { '$in' : conversationsIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);
    let result = { reports :reportsCnt , };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  conversations : 0 }
    });
  }
};

const deleteWithDependency = ({
  conversationsDb,reportsDb
})=> async (filter) =>{
  let conversations = await conversationsDb.findMany(filter);
  if (conversations.length){
    let conversationsIds = conversations.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ conversationId : { '$in' : conversationsIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));
    let deleted = (await conversationsDb.deleteMany(filter));
    let result = { reports :reportsCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  conversations : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  conversationsDb,reportsDb
}) => async (filter,updateBody) =>{
  let conversations = await conversationsDb.findMany(filter);
  if (conversations.length){
    let conversationsIds = conversations.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ conversationId : { '$in' : conversationsIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));
    let updated = (await conversationsDb.updateMany(filter,updateBody));
    let result = { reports :reportsCnt , };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  conversations : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
