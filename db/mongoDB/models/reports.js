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
  userPhone: { type: String },
  profileName: { type: String },
  companyId: {
    type: Schema.Types.ObjectId,
    ref: 'companies'
  },
  vehicle: {
    _id: {
      type: Schema.Types.ObjectId,
      ref: 'vehicles'
    },
    brand: { type: String },
    model: { type: String },
    year: { type: Number },
    color: { type: String },
    plate: { type: String },
    vin: { type: String },
    stickerID: { type: String },
    companyId: {
      type: Schema.Types.ObjectId,
      ref: 'companies'
    },
    driverId: {
      type: Schema.Types.ObjectId,
      ref: 'drivers'
    }
  },
  reportType: { type: String },
  reportDetails: { type: String },
  reportMedia: [{
    file: { type: String }, // ¿Es una URL? Si es así, pon tipo String
    id: { type: String }, // Puede ser type Schema.Types.ObjectId si es un ObjectId de MongoDB
    mime_type: { type: String },
    sha256: { type: String },
    caption: { type: String }
  }],
  reportLocation: {
    latitude: { type: Number },
    longitude: { type: Number }
  },
  additionalDetails: { type: String },
  reportId: { type: String }, // Si es un UUID, déjalo como String
  date: { type: Date }
}, { 
  timestamps: { 
    createdAt: 'createdAt', 
    updatedAt: 'updatedAt' 
  } 
})
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
