const { Upload , } = require('@aws-sdk/lib-storage');
const { GetObjectCommand } = require( '@aws-sdk/client-s3');
const s3 = require('../../constants/awsConstant');

async function uploadFileToS3 (fileName, fileData) {
  const uploadParams = {
    Bucket: 'driports-files',
    Key: fileName,
    Body: fileData,           
    ContentType:'image/jpeg'      
  };

  const uploadResult = await new Upload({
    client: s3,
    params: uploadParams
  }).done();

  // Retorna el S3 key después de cargar el archivo
  return uploadResult;
}

async function getFileStreamFromS3 (s3Key) {
  const params = {
    Bucket: 'driports-files',
    Key: s3Key
  };

  const getObjectCommand = new GetObjectCommand(params);

  try {
    const s3Object = await s3.send(getObjectCommand);
    return s3Object.Body;
  } catch (error) {
    console.error(`Error al obtener la imagen ${s3Key} desde S3:`, error);
    throw error;
  }
}

module.exports = {
  uploadFileToS3,
  getFileStreamFromS3 
};
