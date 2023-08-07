let Drivers = require('../db/mongoDB/models/drivers');
let { 
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  findManyWithLimit,
  count,
  paginate,
} = require('../db/mongoDB/dbService')(Drivers);

module.exports = {
  create,
  updateOne,
  updateMany,
  deleteOne,
  deleteMany,
  findOne,
  findMany,
  findManyWithLimit,
  count,
  paginate,
};