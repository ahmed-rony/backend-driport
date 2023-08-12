/**
 *addVehicles.js
 */

const  vehiclesEntity = require('../../entities/vehicles');
const { uploadFileToS3 } = require('../../services/fileUploadS3/fileUploadService');
const response = require('../../utils/response');
/**
 * @description : create new record of vehicles in database.
 * @param {Object} dataToCreate : data for create new document.
 * @param {Object} req : The req object represents the HTTP request.
 * @param {Object} res : The res object represents HTTP response.
 * @return {Object} : response of create. {status, message, data}
 */
const addVehicles = ({
  vehiclesDb,createValidation 
}) => async (dataToCreate,fileToCreate,req,res) => {
  const validateRequest = await createValidation(dataToCreate);
  if (!validateRequest.isValid) {
    return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
  }
  try {
    let imageVehicle = []; 
    if (fileToCreate['image']){
      let img = await uploadFileToS3(`${dataToCreate.vin}-1.jpg` ,Buffer.from( fileToCreate.image[0].buffer));
      imageVehicle.push(img.Key);
    }
    if (fileToCreate['secondImage']){
      let img = await uploadFileToS3(`${dataToCreate.vin}-2.jpg`,fileToCreate.secondImage[0].buffer);
      imageVehicle.push(img.Key);
    }
    if (fileToCreate['thirdImage']){
      let img = await uploadFileToS3(`${dataToCreate.vin}-3.jpg`,fileToCreate.thirdImage[0].buffer);
      imageVehicle.push(img.Key);
    }
    dataToCreate['imageVehicle'] = imageVehicle;
    
  } catch (error) {
    console.log('Error al subir las imagenes a S3');
    
  }
  let vehicles = vehiclesEntity(dataToCreate);
  try {
    console.log(vehicles.imageVehicle);
    vehicles = await vehiclesDb.create(vehicles);
    return response.success({ data:vehicles });  
  } catch (error) {
    console.log(error);
  }
  
};
module.exports = addVehicles;