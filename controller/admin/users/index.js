const usersDb = require('../../../data-access/usersDb');
const reportsDb = require('../../../data-access/reportsDb');
const vehiclesDb = require('../../../data-access/vehiclesDb');
const companiesDb = require('../../../data-access/companiesDb');
const conversationsDb = require('../../../data-access/conversationsDb');
const driversDb = require('../../../data-access/driversDb');
const userTokensDb = require('../../../data-access/userTokensDb');
const roleDb = require('../../../data-access/roleDb');
const projectRouteDb = require('../../../data-access/projectRouteDb');
const routeRoleDb = require('../../../data-access/routeRoleDb');
const userRoleDb = require('../../../data-access/userRoleDb');

const usersSchema = require('../../../validation/schema/users');

const createValidation = require('../../../validation')(usersSchema.createSchema);
const updateValidation = require('../../../validation')(usersSchema.updateSchema);
const filterValidation = require('../../../validation')(usersSchema.filterValidationSchema);
const changePasswordUsecase = require('../../../use-case/users/changePassword')({ usersDb });
const updateProfileUsecase = require('../../../use-case/users/updateProfile')({
  usersDb,
  updateValidation
});
const getUsersUsecase = require('../../../use-case/users/getUsers')({
  usersDb,
  filterValidation
});

const usersController = require('./users');

const changePassword = usersController.changePassword(changePasswordUsecase);
const updateProfile = usersController.updateProfile(updateProfileUsecase);
const getLoggedInUserInfo = usersController.getLoggedInUserInfo(getUsersUsecase);

module.exports = {
  changePassword,
  updateProfile,
  getLoggedInUserInfo,
};