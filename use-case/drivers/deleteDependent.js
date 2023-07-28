const response = require('../../utils/response');

const getDependencyCount = ({
  driversDb,reportsDb,vehiclesDb
})=> async (filter) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const reportsCnt =  await reportsDb.count(reportsFilter);

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  await vehiclesDb.count(vehiclesFilter);
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
    };
    return response.success({
      message: 'No of Dependency found',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency found',
      data: {  drivers : 0 }
    });
  }
};

const deleteWithDependency = ({
  driversDb,reportsDb,vehiclesDb
})=> async (filter) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const reportsCnt =  (await reportsDb.deleteMany(reportsFilter));

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  (await vehiclesDb.deleteMany(vehiclesFilter));
    let deleted = (await driversDb.deleteMany(filter));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  drivers : 0 }
    });
  }
};

const softDeleteWithDependency = ({
  driversDb,reportsDb,vehiclesDb
}) => async (filter,updateBody) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const reportsFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const reportsCnt =  (await reportsDb.updateMany(reportsFilter,updateBody));

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  (await vehiclesDb.updateMany(vehiclesFilter,updateBody));
    let updated = (await driversDb.updateMany(filter,updateBody));
    let result = {
      reports :reportsCnt ,
      vehicles :vehiclesCnt ,
    };
    return response.success({
      message: 'No of Dependency deleted',
      data: result
    });
  } else {
    return response.success({
      message: 'No of Dependency deleted',
      data: {  drivers : 0 }
    });
  }
};
module.exports = {
  getDependencyCount,
  deleteWithDependency,
  softDeleteWithDependency
};
