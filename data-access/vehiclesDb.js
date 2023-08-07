let Vehicles = require('../db/mongoDB/models/vehicles');
let { 
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  paginate,
  getTopVehiclesWithMostReports
} = require('../db/mongoDB/dbService')(Vehicles);

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  count,
  getTopVehiclesWithMostReports,
  paginate,
};