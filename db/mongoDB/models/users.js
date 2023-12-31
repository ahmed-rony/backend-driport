let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');
const convertObjectToEnum = require('../../../utils/convertObjectToEnum');
const { USER_TYPES } =  require('../../../constants/authConstant');
const bcrypt = require('bcrypt');
const authConstantEnum = require('../../../constants/authConstant');

const modelCustomLabels = {
  totalDocs: 'itemCount',
  docs: 'data',
  limit: 'perPage',
  page: 'currentPage',
  nextPage: 'next',
  prevPage: 'prev',
  totalPages: 'pageCount',
  pagingCounter: 'slNo',
  meta: 'paginator',
};
mongoosePaginate.paginate.options = { customLabels: modelCustomLabels };
const Schema = mongoose.Schema;
const schema = new Schema({
  name: { type:String },
  email: { type:String },
  password: { type:String },
  role: { type:String },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  companyId: {
    type:Schema.Types.ObjectId,
    ref:'companies'
  },
  isDeleted: { type:Boolean },
  isActive: { type:Boolean },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  userType: {
    type:Number,
    enum:convertObjectToEnum(USER_TYPES),
    required:true
  },
  mobileNo: { type:String },
  username: { type:String },
  resetPasswordLink: {
    code:String,
    expireTime:Date
  },
  loginRetryLimit: {
    type:Number,
    default:0
  },
  loginReactiveTime: { type:Date }
}
,{ 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
}
);
schema.pre('save', async function (next) {
  this.isDeleted = false;
  this.isActive = true;
  if (this.password){
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});
schema.pre('insertMany', async function (next, docs) {
  if (docs && docs.length){
    for (let index = 0; index < docs.length; index++) {
      const element = docs[index];
      element.isDeleted = false;
      element.isActive = true;
    }
  }
  next();
});

schema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};
schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals: true });
  object.id = _id;
  delete object.password;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const users = mongoose.model('users',schema);
module.exports = users;
