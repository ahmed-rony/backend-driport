const response = require('../../utils/response');

const getDependencyCount = ({
  vehiclesDb,reportsDb,driversDb
})=> async (filter) =>{
  let vehicles = await vehiclesDb.findMany(filter);
  if (vehicles.length){
    let vehiclesIds = vehicles.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);

    const driversFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const driversCnt =  await driversDb.count(driversFilter);
    let result = {
      reports :reportsCnt ,
      drivers :driversCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  vehicles : 0 }
    });
  }
};

const deleteWithDependency = ({
  vehiclesDb,reportsDb,driversDb
})=> async (filter) =>{
  let vehicles = await vehiclesDb.findMany(filter);
  if (vehicles.length){
    let vehiclesIds = vehicles.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));

    const driversFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const driversCnt =  (await driversDb.deleteMany(driversFilter));
    let deleted = (await vehiclesDb.deleteMany(filter));
    let result = {
      reports :reportsCnt ,
      drivers :driversCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  vehicles : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  vehiclesDb,reportsDb,driversDb
}) => async (filter,updateBody) =>{
  let vehicles = await vehiclesDb.findMany(filter);
  if (vehicles.length){
    let vehiclesIds = vehicles.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));

    const driversFilter = { '$or': [{ vehicleId : { '$in' : vehiclesIds } }] };
    const driversCnt =  (await driversDb.updateMany(driversFilter,updateBody));
    let updated = (await vehiclesDb.updateMany(filter,updateBody));
    let result = {
      reports :reportsCnt ,
      drivers :driversCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  vehicles : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
