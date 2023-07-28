let mongoose = require('../connection.js');
const mongoosePaginate = require('mongoose-paginate-v2');
const idValidator = require('mongoose-id-validator');

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
  companyName: { type:String },
  registrationNumber: { type:String },
  email: { type:String },
  phone: { type:String },
  website: { type:String },
  address: { type:String },
  otherData: { type:String },
  isDeleted: { type:Boolean },
  isActive: { type:Boolean },
  createdAt: { type:Date },
  updatedAt: { type:Date },
  addedBy: {
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  updatedBy: {
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  userId: {
    ref:'users',
    type:Schema.Types.ObjectId
  }
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

schema.method('toJSON', function () {
  const {
    _id, __v, ...object 
  } = this.toObject({ virtuals: true });
  object.id = _id;
  return object;
});
schema.plugin(mongoosePaginate);
schema.plugin(idValidator);

const companies = mongoose.model('companies',schema);
module.exports = companies;
