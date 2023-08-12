const multer = require('multer');
const filefilter = require('../utils/fileFilter');

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage ,
  fileFilter:filefilter
});

const uploadFile = upload.single('file');
const uploadVehicle = upload.fields([
  {
    name: 'image',
    maxCount: 1 
  },
  {
    name: 'secondImage',
    maxCount: 1 
  },
  {
    name: 'thirdImage',
    maxCount: 1 
  }
]);

module.exports = {
  uploadFile,
  uploadVehicle
};
