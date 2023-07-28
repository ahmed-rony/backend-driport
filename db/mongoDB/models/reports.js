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
  conversationId: {
    type:Schema.Types.ObjectId,
    ref:'conversations'
  },
  profileName: { type:String },
  userPhone: { type:String },
  description: { type:String },
  reportType: { type:Number },
  media: { type:String },
  evidenceID: { type:String },
  plate: { type:String },
  date: { type:Date },
  location: { type:String },
  riskMatrix: { type:Number },
  count: { type:Number },
  driverId: {
    type:Schema.Types.ObjectId,
    ref:'drivers'
  },
  vehicleId: {
    type:Schema.Types.ObjectId,
    ref:'vehicles'
  },
  companyId: {
    type:Schema.Types.ObjectId,
    ref:'companies'
  },
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

const reports = mongoose.model('reports',schema);
module.exports = reports;
