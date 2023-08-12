// config/awsConfig.js
const { S3 } = require('@aws-sdk/client-s3');

const s3 = new S3({
  region: 'us-east-2',
  credentials: {
    accessKeyId: process.env.AWS_KeyId,
    secretAccessKey: process.env.AWS_secretAccessKey,
  }
});

module.exports = s3;
