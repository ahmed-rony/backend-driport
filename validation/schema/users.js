const joi = require('joi');
const {
  options, isCountOnly, populate, select 
} = require('../commonFilterValidation');
const authConstantDefault = require('../../constants/authConstant');

const { USER_TYPES } = require('../../constants/authConstant');
const convertObjectToEnum = require('../../utils/convertObjectToEnum');

const createSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  role: joi.string().allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  userType: joi.number().allow(0),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  })
}).unknown(true);

const updateSchema = joi.object({
  name: joi.string().allow(null).allow(''),
  email: joi.string().allow(null).allow(''),
  password: joi.string().allow(null).allow(''),
  role: joi.string().allow(null).allow(''),
  companyId: joi.string().regex(/^[0-9a-fA-F]{24}$/).allow(null).allow(''),
  isDeleted: joi.boolean(),
  isActive: joi.boolean(),
  userType: joi.number().allow(0),
  mobileNo: joi.string().allow(null).allow(''),
  username: joi.string().allow(null).allow(''),
  resetPasswordLink: joi.object({
    code:joi.string(),
    expireTime:joi.date().options({ convert: true })
  }),
  _id: joi.string().regex(/^[0-9a-fA-F]{24}$/)
}
).unknown(true);

let keys = ['query', 'where'];
let filterValidationSchema = joi.object({
  options: options,
  ...Object.fromEntries(
    keys.map(key => [key, joi.object({
      name: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      email: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      password: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      role: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      companyId: joi.alternatives().try(joi.array().items(),joi.string().regex(/^[0-9a-fA-F]{24}$/),joi.object()),
      isDeleted: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      isActive: joi.alternatives().try(joi.array().items(),joi.boolean(),joi.object()),
      mobileNo: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
      username: joi.alternatives().try(joi.array().items(),joi.string(),joi.object()),
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