/**
 * getVehicles.js
 */

const { getFileStreamFromS3 } = require('../../services/fileUploadS3/fileUploadService');
const response = require('../../utils/response');
const streamToBuffer = require('../../utils/streamToBuffer');

/**
 * @description : find record from database by id;
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Vehicle. {status, message, data}
 */
const getVehicles = ({
  vehiclesDb, filterValidation
}) => async (params, req, res) => {
  
  let {
    query, options
  } = params;

  const validateRequest = await filterValidation(options);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  let foundVehicle = await vehiclesDb.findOne(query, options);
  if (!foundVehicle) {
    return response.recordNotFound();
  }

  const imageStreams = [];
  if (foundVehicle.imageVehicle &&  Array.isArray(foundVehicle.imageVehicle)) {
    for (const imageKey of foundVehicle.imageVehicle) {
      try {
        const imageFileStream = await getFileStreamFromS3(imageKey);

        const imageBuffer = await streamToBuffer(imageFileStream);
        const base64Image = imageBuffer.toString('base64');

        imageStreams.push({
          key: imageKey,
          data: base64Image,
        });
      } catch (error) {
        console.error(`Error al obtener la imagen ${imageKey} desde S3:`, error);
      }
    }

    foundVehicle.downloadedImages = imageStreams;
  }

  return response.success({ data: foundVehicle });
};

module.exports = getVehicles;
