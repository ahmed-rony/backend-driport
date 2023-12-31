let  usersDb = require('../../../data-access/usersDb');
const userTokensDb = require('../../../data-access/userTokensDb');

const usersSchema = require('../../../validation/schema/users');
const createValidation = require('../../../validation')(usersSchema.createSchema);

const userRoleDb  = require('../../../data-access/userRoleDb');
const routeRoleDb = require('../../../data-access/routeRoleDb');
const roleDb = require('../../../data-access/roleDb');

const authController = require('./authController');

const registerUsecase = require('../../../use-case/authentication/register')({ 
  usersDb, 
  createValidation, 
  roleDb,
  userRoleDb,
});
const forgotPasswordUsecase = require('../../../use-case/authentication/forgotPassword')({ usersDb });
const resetPasswordUsecase = require('../../../use-case/authentication/resetPassword')({ usersDb });
const validateResetPasswordOtpUsecase = require('../../../use-case/authentication/validateResetPasswordOtp')({ usersDb });
const logoutUsecase = require('../../../use-case/authentication/logout')({ userTokensDb });
const authenticationUsecase = require('../../../use-case/authentication/authentication')({
  usersDb,
  userTokensDb,
  userRoleDb,
  routeRoleDb
});

const register = authController.register(registerUsecase);
const forgotPassword = authController.forgotPassword(forgotPasswordUsecase);
const resetPassword = authController.resetPassword(resetPasswordUsecase);
const validateResetPasswordOtp = authController.validateResetPasswordOtp(validateResetPasswordOtpUsecase);
const logout = authController.logout(logoutUsecase);
const authentication = authController.authentication(authenticationUsecase);

module.exports = {
  register,
  forgotPassword,
  resetPassword,
  validateResetPasswordOtp,
  logout,
  authentication,
};