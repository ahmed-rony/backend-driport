const passport = require('passport');
let usersDb = require('../data-access/usersDb');
let userTokensDb = require('../data-access/userTokensDb');
let userRoleDb = require('../data-access/userRoleDb');
let routeRoleDb = require('../data-access/routeRoleDb');
let projectRouteDb = require('../data-access/projectRouteDb');

const auth = require('./auth')({
  passport,
  userTokensDb 
});
const checkRolePermission = require('./checkRolePermission')({
  userRoleDb,
  routeRoleDb,
  projectRouteDb
});

const clientPassportStrategy = require('./clientPassportStrategy')({ usersDb });
const adminPassportStrategy = require('./adminPassportStrategy')({ usersDb });

module.exports = {
  auth,
  checkRolePermission,
  clientPassportStrategy,
  adminPassportStrategy,
};