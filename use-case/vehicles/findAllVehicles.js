/**
 *findAllVehicles.js
 */

const { getFileStreamFromS3 } = require('../../services/fileUploadS3/fileUploadService');
const response = require('../../utils/response');
const streamToBuffer = require('../../utils/streamToBuffer');

/**
 * @description : find all records from database based on query and options.
 * @param {Object} params : request body including option and query.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : found Vehicles(s). {status, message, data}
 */
const findAllVehicles = ({
  vehiclesDb, filterValidation
}) => async (params, req, res) => {
  
  const validateRequest = await filterValidation(params);
  if (!validateRequest.isValid) {
    return response.validationError({ message: `Invalid values in parameters, ${validateRequest.message}` });
  }

  let {
    query, options, isCountOnly
  } = params;
  
  if (isCountOnly) {
    let totalRecords = await vehiclesDb.count(query);
    return response.success({ data: { totalRecords } });
  } else {
    let foundVehicles = await vehiclesDb.paginate(query, options);
    if (!foundVehicles) {
      return response.recordNotFound();
    }

    const updatedVehicles = [];

    for (const vehicle of foundVehicles.data) {
      if (vehicle.imageVehicle && Array.isArray(vehicle.imageVehicle)) {
        
        const imageStreams = [];
        try {
          const imageFileStream = await getFileStreamFromS3(vehicle.imageVehicle[0]);
    
          const imageBuffer = await streamToBuffer(imageFileStream);
          const base64Image = imageBuffer.toString('base64');

          imageStreams.push({
            key: vehicle.imageVehicle[0],
            data: base64Image,
          });
        } catch (error) {
          console.error(`Error al obtener la imagen ${vehicle.imageVehicle[0]} desde S3:`, error);
        }

        updatedVehicles.push({
          ...vehicle,
          downloadedImages: imageStreams
        });
      } else {
        updatedVehicles.push(vehicle);
      }
    }

    return response.success({ data: updatedVehicles });
  }
};

module.exports = findAllVehicles;