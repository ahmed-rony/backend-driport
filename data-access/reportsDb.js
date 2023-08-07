let Reports = require('../db/mongoDB/models/reports');
let { 
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  getTopVehiclesWithMostReports,
  count,
  paginate,
} = require('../db/mongoDB/dbService')(Reports);

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  getTopVehiclesWithMostReports,
  count,
  paginate,
};