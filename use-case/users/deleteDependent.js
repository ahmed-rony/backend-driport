const response = require('../../utils/response');

const getDependencyCount = ({
  usersDb,reportsDb,vehiclesDb,companiesDb,conversationsDb,driversDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let users = await usersDb.findMany(filter);
  if (users.length){
    let usersIds = users.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);

    const vehiclesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const vehiclesCnt =  await vehiclesDb.count(vehiclesFilter);

    const companiesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const companiesCnt =  await companiesDb.count(companiesFilter);

    const conversationsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const conversationsCnt =  await conversationsDb.count(conversationsFilter);

    const driversFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const driversCnt =  await driversDb.count(driversFilter);

    const usersFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const usersCnt =  await usersDb.count(usersFilter);

    const userTokensFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userTokensCnt =  await userTokensDb.count(userTokensFilter);

    const roleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const roleCnt =  await roleDb.count(roleFilter);

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const projectRouteCnt =  await projectRouteDb.count(projectRouteFilter);

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const routeRoleCnt =  await routeRoleDb.count(routeRoleFilter);

    const userRoleFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userRoleCnt =  await userRoleDb.count(userRoleFilter);
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      companies :companiesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt + 1,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  users : 0 }
    });
  }
};

const deleteWithDependency = ({
  usersDb,reportsDb,vehiclesDb,companiesDb,conversationsDb,driversDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
})=> async (filter) =>{
  let users = await usersDb.findMany(filter);
  if (users.length){
    let usersIds = users.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));

    const vehiclesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const vehiclesCnt =  (await vehiclesDb.deleteMany(vehiclesFilter));

    const companiesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const companiesCnt =  (await companiesDb.deleteMany(companiesFilter));

    const conversationsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const conversationsCnt =  (await conversationsDb.deleteMany(conversationsFilter));

    const driversFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const driversCnt =  (await driversDb.deleteMany(driversFilter));

    const usersFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const usersCnt =  (await usersDb.deleteMany(usersFilter));

    const userTokensFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userTokensCnt =  (await userTokensDb.deleteMany(userTokensFilter));

    const roleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const roleCnt =  (await roleDb.deleteMany(roleFilter));

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const projectRouteCnt =  (await projectRouteDb.deleteMany(projectRouteFilter));

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const routeRoleCnt =  (await routeRoleDb.deleteMany(routeRoleFilter));

    const userRoleFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userRoleCnt =  (await userRoleDb.deleteMany(userRoleFilter));
    let deleted = (await usersDb.deleteMany(filter));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      companies :companiesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt + deleted,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  users : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  usersDb,reportsDb,vehiclesDb,companiesDb,conversationsDb,driversDb,userTokensDb,roleDb,projectRouteDb,routeRoleDb,userRoleDb
}) => async (filter,updateBody) =>{
  let users = await usersDb.findMany(filter);
  if (users.length){
    let usersIds = users.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));

    const vehiclesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const vehiclesCnt =  (await vehiclesDb.updateMany(vehiclesFilter,updateBody));

    const companiesFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const companiesCnt =  (await companiesDb.updateMany(companiesFilter,updateBody));

    const conversationsFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const conversationsCnt =  (await conversationsDb.updateMany(conversationsFilter,updateBody));

    const driversFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const driversCnt =  (await driversDb.updateMany(driversFilter,updateBody));

    const usersFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const usersCnt =  (await usersDb.updateMany(usersFilter,updateBody));

    const userTokensFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userTokensCnt =  (await userTokensDb.updateMany(userTokensFilter,updateBody));

    const roleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const roleCnt =  (await roleDb.updateMany(roleFilter,updateBody));

    const projectRouteFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const projectRouteCnt =  (await projectRouteDb.updateMany(projectRouteFilter,updateBody));

    const routeRoleFilter = { '$or': [{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const routeRoleCnt =  (await routeRoleDb.updateMany(routeRoleFilter,updateBody));

    const userRoleFilter = { '$or': [{ userId : { '$in' : usersIds } },{ addedBy : { '$in' : usersIds } },{ updatedBy : { '$in' : usersIds } }] };
    const userRoleCnt =  (await userRoleDb.updateMany(userRoleFilter,updateBody));
    let updated = (await usersDb.updateMany(filter,updateBody));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      companies :companiesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt + updated,
      userTokens :userTokensCnt ,
      role :roleCnt ,
      projectRoute :projectRouteCnt ,
      routeRole :routeRoleCnt ,
      userRole :userRoleCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  users : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
