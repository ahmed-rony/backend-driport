const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  sender: joi.string().allow(null).allow(''),
  profileName: joi.string().allow(null).allow(''),
  step: joi.number().integer().allow(0),
  data: joi.array().items(),
  messages: joi.array().items(),
  isCompleted: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow('')
}).unknown(true);

const updateSchema = joi.object({
  sender: joi.string().allow(null).allow(''),
  profileName: joi.string().allow(null).allow(''),
  step: joi.number().integer().allow(0),
  data: joi.array().items(),
  messages: joi.array().items(),
  isCompleted: joi.boolean(),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      sender: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      profileName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      step: joi.alternatives().try(joi.array().items(),joi.number().integer(),joi.object()),
      data: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      messages: joi.alternatives().try(joi.array().items(),joi.array().items(),joi.object()),
      isCompleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      companyId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
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