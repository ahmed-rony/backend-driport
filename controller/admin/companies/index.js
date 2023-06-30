const companiesDb = require('../../../data-access/companiesDb');
const reportsDb = require('../../../data-access/reportsDb');
const vehiclesDb = require('../../../data-access/vehiclesDb');
const usersDb = require('../../../data-access/usersDb');

const companiesSchema = require('../../../validation/schema/companies');

const createValidation = require('../../../validation')(companiesSchema.createSchema);
const updateValidation = require('../../../validation')(companiesSchema.updateSchema);
const filterValidation = require('../../../validation')(companiesSchema.filterValidationSchema);

const companiesController = require('./companies');

module.exports = {};