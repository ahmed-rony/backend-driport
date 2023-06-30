const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  brand: joi.string().allow(null).allow(''),
  model: joi.string().allow(null).allow(''),
  year: joi.number().integer().allow(0),
  color: joi.string().allow(null).allow(''),
  plate: joi.string().allow(null).allow(''),
  vin: joi.string().allow(null).allow(''),
  stickerID: joi.string().allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  driverId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  brand: joi.string().allow(null).allow(''),
  model: joi.string().allow(null).allow(''),
  year: joi.number().integer().allow(0),
  color: joi.string().allow(null).allow(''),
  plate: joi.string().allow(null).allow(''),
  vin: joi.string().allow(null).allow(''),
  stickerID: joi.string().allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  driverId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
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
      brand: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      model: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      year: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      color: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      plate: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      vin: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      stickerID: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      companyId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      driverId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
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