/**
 * getReports.js
 */

const { getFileStreamFromS3 } = require('../../services/fileUploadS3/fileUploadService');
const response = require('../../utils/response');
const streamToBuffer = require('../../utils/streamToBuffer');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Reports. {status, message, data}
 */
const getReports = ({
  reportsDb, filterValidation
}) => async (params, req, res) => {
  let {
    query, options
  } = params;
  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  let foundReports = await reportsDb.findOne(query, options);
  if (!foundReports) {
    return response.recordNotFound();
  }

  // Verificar si reportMedia existe y tiene un ID
  console.log(foundReports._doc.reportMedia);
  if (foundReports._doc.reportMedia && foundReports._doc.reportMedia[0].id) {
    
    try {
      const imageKey = foundReports._doc.reportMedia[0].id + '.jpeg';
      const imageFileStream = await getFileStreamFromS3(imageKey);

      const imageBuffer = await streamToBuffer(imageFileStream);
      const base64Image = imageBuffer.toString('base64');

      foundReports._doc.reportMedia[0].downloadedImage = {
        key: imageKey,
        data: base64Image,
      };
    } catch (error) {
      console.error(`Error al obtener la imagen ${foundReports._doc.reportMedia[0].id}.jpeg desde S3:`, error);
    }
  }

  return response.success({ data: foundReports });
};

module.exports = getReports;
