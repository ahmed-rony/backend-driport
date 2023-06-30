const response = require('../../utils/response');

const getDependencyCount = ({
  companiesDb,reportsDb,vehiclesDb,usersDb
})=> async (filter) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  await vehiclesDb.count(vehiclesFilter);

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  await usersDb.count(usersFilter);
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
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
  companiesDb,reportsDb,vehiclesDb,usersDb
})=> async (filter) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  (await vehiclesDb.deleteMany(vehiclesFilter));

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  (await usersDb.deleteMany(usersFilter));
    let deleted = (await companiesDb.deleteMany(filter));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
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
  companiesDb,reportsDb,vehiclesDb,usersDb
}) => async (filter,updateBody) =>{
  let companies = await companiesDb.findMany(filter);
  if (companies.length){
    let companiesIds = companies.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));

    const vehiclesFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const vehiclesCnt =  (await vehiclesDb.updateMany(vehiclesFilter,updateBody));

    const usersFilter = { '$or': [{ companyId : { '$in' : companiesIds } }] };
    const usersCnt =  (await usersDb.updateMany(usersFilter,updateBody));
    let updated = (await companiesDb.updateMany(filter,updateBody));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
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
