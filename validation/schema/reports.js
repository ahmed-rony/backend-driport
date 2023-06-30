const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  conversationId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  profileName: joi.string().allow(null).allow(''),
  userPhone: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  reportType: joi.number().integer().allow(0),
  media: joi.string().allow(null).allow(''),
  evidenceID: joi.string().allow(null).allow(''),
  plate: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  riskMatrix: joi.number().integer().allow(0),
  count: joi.number().integer().allow(0),
  driverId: joi.string().allow(null).allow(''),
  vehicleId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  conversationId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  profileName: joi.string().allow(null).allow(''),
  userPhone: joi.string().allow(null).allow(''),
  description: joi.string().allow(null).allow(''),
  reportType: joi.number().integer().allow(0),
  media: joi.string().allow(null).allow(''),
  evidenceID: joi.string().allow(null).allow(''),
  plate: joi.string().allow(null).allow(''),
  date: joi.date().options({ convert: true }).allow(null).allow(''),
  location: joi.string().allow(null).allow(''),
  riskMatrix: joi.number().integer().allow(0),
  count: joi.number().integer().allow(0),
  driverId: joi.string().allow(null).allow(''),
  vehicleId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      conversationId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      profileName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      userPhone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      description: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      reportType: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      media: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      evidenceID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      plate: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      date: joi.alternatives().try(joi.array().items(),joi.date().options({ convert: true }),joi.object()),
      location: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      riskMatrix: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      count: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      driverId: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      vehicleId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      companyId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      id: joi.any(),
      _id: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object())
    }
    ).unknown(true),])
  ),
  isCountOnly: isCountOnly,
  populate: joi.array().items(populate),
  select: select

}).unknown(true);

module.exports = {
  createSchema,
  updateSchema,
  filterValidationSchema
};