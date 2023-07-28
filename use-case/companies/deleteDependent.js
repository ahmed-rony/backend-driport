const response = require('../../utils/response');

const getDependencyCount = ({
  companiesDb,reportsDb,vehiclesDb,conversationsDb,driversDb,usersDb
})=> async (filter) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  await vehiclesDb.count(vehiclesFilter);

    const conversationsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const conversationsCnt =  await conversationsDb.count(conversationsFilter);

    const driversFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const driversCnt =  await driversDb.count(driversFilter);

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  await usersDb.count(usersFilter);
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  companies : 0 }
    });
  }
};

const deleteWithDependency = ({
  companiesDb,reportsDb,vehiclesDb,conversationsDb,driversDb,usersDb
})=> async (filter) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  (await vehiclesDb.deleteMany(vehiclesFilter));

    const conversationsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const conversationsCnt =  (await conversationsDb.deleteMany(conversationsFilter));

    const driversFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const driversCnt =  (await driversDb.deleteMany(driversFilter));

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  (await usersDb.deleteMany(usersFilter));
    let deleted = (await companiesDb.deleteMany(filter));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  companies : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  companiesDb,reportsDb,vehiclesDb,conversationsDb,driversDb,usersDb
}) => async (filter,updateBody) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  (await vehiclesDb.updateMany(vehiclesFilter,updateBody));

    const conversationsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const conversationsCnt =  (await conversationsDb.updateMany(conversationsFilter,updateBody));

    const driversFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const driversCnt =  (await driversDb.updateMany(driversFilter,updateBody));

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  (await usersDb.updateMany(usersFilter,updateBody));
    let updated = (await companiesDb.updateMany(filter,updateBody));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
      conversations :conversationsCnt ,
      drivers :driversCnt ,
      users :usersCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  companies : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
