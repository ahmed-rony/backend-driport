const usersDb = require('../../../../data-access/usersDb');
const reportsDb = require('../../../../data-access/reportsDb');
const vehiclesDb = require('../../../../data-access/vehiclesDb');
const companiesDb = require('../../../../data-access/companiesDb');
const conversationsDb = require('../../../../data-access/conversationsDb');
const driversDb = require('../../../../data-access/driversDb');
const userTokensDb = require('../../../../data-access/userTokensDb');
const roleDb = require('../../../../data-access/roleDb');
const projectRouteDb = require('../../../../data-access/projectRouteDb');
const routeRoleDb = require('../../../../data-access/routeRoleDb');
const userRoleDb = require('../../../../data-access/userRoleDb');

const usersSchema = require('../../../../validation/schema/users');

const createValidation = require('../../../../validation')(usersSchema.createSchema);
const updateValidation = require('../../../../validation')(usersSchema.updateSchema);
const filterValidation = require('../../../../validation')(usersSchema.filterValidationSchema);
const addUsersUsecase = require('../../../../use-case/users/addUsers')({
  usersDb,
  createValidation 
});
const bulkInsertUsersUsecase = require('../../../../use-case/users/bulkInsertUsers')({ usersDb });
const findAllUsersUsecase = require('../../../../use-case/users/findAllUsers')({
  usersDb,
  filterValidation
});
const getUsersCountUsecase = require('../../../../use-case/users/getUsersCount')({
  usersDb,
  filterValidation
});
const getUsersUsecase = require('../../../../use-case/users/getUsers')({
  usersDb,
  filterValidation
});
const updateUsersUsecase = require('../../../../use-case/users/updateUsers')({
  usersDb,
  updateValidation 
});
const partialUpdateUsersUsecase = require('../../../../use-case/users/partialUpdateUsers')({ usersDb });
const bulkUpdateUsersUsecase = require('../../../../use-case/users/bulkUpdateUsers')({ usersDb });
const softDeleteUsersUsecase = require('../../../../use-case/users/softDeleteUsers')({
  usersDb,
  reportsDb,
  vehiclesDb,
  companiesDb,
  conversationsDb,
  driversDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const softDeleteManyUsersUsecase = require('../../../../use-case/users/softDeleteManyUsers')({
  usersDb,
  reportsDb,
  vehiclesDb,
  companiesDb,
  conversationsDb,
  driversDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const deleteUsersUsecase = require('../../../../use-case/users/deleteUsers')({
  usersDb,
  reportsDb,
  vehiclesDb,
  companiesDb,
  conversationsDb,
  driversDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const deleteManyUsersUsecase = require('../../../../use-case/users/deleteManyUsers')({
  usersDb,
  reportsDb,
  vehiclesDb,
  companiesDb,
  conversationsDb,
  driversDb,
  userTokensDb,
  roleDb,
  projectRouteDb,
  routeRoleDb,
  userRoleDb
});
const changePasswordUsecase = require('../../../../use-case/users/changePassword')({ usersDb });
const updateProfileUsecase = require('../../../../use-case/users/updateProfile')({
  usersDb,
  updateValidation
});

const usersController = require('./users');

const addUsers = usersController.addUsers(addUsersUsecase);
const bulkInsertUsers = usersController.bulkInsertUsers(bulkInsertUsersUsecase);
const findAllUsers = usersController.findAllUsers(findAllUsersUsecase);
const getUsersCount = usersController.getUsersCount(getUsersCountUsecase);
const getUsersById = usersController.getUsers(getUsersUsecase);
const updateUsers = usersController.updateUsers(updateUsersUsecase);
const partialUpdateUsers = usersController.partialUpdateUsers(partialUpdateUsersUsecase);
const bulkUpdateUsers = usersController.bulkUpdateUsers(bulkUpdateUsersUsecase);
const softDeleteUsers = usersController.softDeleteUsers(softDeleteUsersUsecase);
const softDeleteManyUsers = usersController.softDeleteManyUsers(softDeleteManyUsersUsecase);
const deleteUsers = usersController.deleteUsers(deleteUsersUsecase);
const deleteManyUsers = usersController.deleteManyUsers(deleteManyUsersUsecase);
const changePassword = usersController.changePassword(changePasswordUsecase);
const updateProfile = usersController.updateProfile(updateProfileUsecase);
const getLoggedInUserInfo = usersController.getLoggedInUserInfo(getUsersUsecase);

module.exports = {
  addUsers,
  bulkInsertUsers,
  findAllUsers,
  getUsersCount,
  getUsersById,
  updateUsers,
  partialUpdateUsers,
  bulkUpdateUsers,
  softDeleteUsers,
  softDeleteManyUsers,
  deleteUsers,
  deleteManyUsers,
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};