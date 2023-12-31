const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');

const createSchema = joi.object({
  companyName: joi.string().allow(null).allow(''),
  registrationNumber: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  website: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).allow(null).allow(''),
  address: joi.string().allow(null).allow(''),
  otherData: joi.string().allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean()
}).unknown(true);

const updateSchema = joi.object({
  companyName: joi.string().allow(null).allow(''),
  registrationNumber: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  phone: joi.string().allow(null).allow(''),
  website: joi.string().regex(/[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/).allow(null).allow(''),
  address: joi.string().allow(null).allow(''),
  otherData: joi.string().allow(null).allow(''),
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
      companyName: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      registrationNumber: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      phone: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      website: joi.alternatives().try(joi.array().items(),joi.string().regex(/[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/),joi.object()),
      address: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      otherData: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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