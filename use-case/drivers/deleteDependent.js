const response = require('../../utils/response');

const getDependencyCount = ({
  driversDb,vehiclesDb
})=> async (filter) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  await vehiclesDb.count(vehiclesFilter);
    let result = { vehicles :vehiclesCnt , };
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
  driversDb,vehiclesDb
})=> async (filter) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  (await vehiclesDb.deleteMany(vehiclesFilter));
    let deleted = (await driversDb.deleteMany(filter));
    let result = { vehicles :vehiclesCnt , };
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
  driversDb,vehiclesDb
}) => async (filter,updateBody) =>{
  let drivers = await driversDb.findMany(filter);
  if (drivers.length){
    let driversIds = drivers.map((obj) => obj.id);

    const vehiclesFilter = { '$or': [{ driverId : { '$in' : driversIds } }] };
    const vehiclesCnt =  (await vehiclesDb.updateMany(vehiclesFilter,updateBody));
    let updated = (await driversDb.updateMany(filter,updateBody));
    let result = { vehicles :vehiclesCnt , };
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
