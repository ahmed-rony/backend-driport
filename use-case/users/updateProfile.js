/**
 *updateProfile.js
 */

const usersEntity = require('../../entities/users');
const response = require('../../utils/response');

const updateProfile = ({
  usersDb,updateValidation
}) => async (params) => {
  let {
    id, profileData
  } = params;
  if (id && profileData){
    delete profileData.createdAt;
    delete profileData.updatedAt;
    delete profileData.id;
    const validateRequest = await updateValidation(profileData);
    if (!validateRequest.isValid) {
      return response.validationError({ message : `Invalid values in parameters, ${validateRequest.message}` });
    }
    let users = usersEntity(profileData);
    let updatedUsers = await usersDb.updateOne({ _id:id }, users);
    return response.success({ data:updatedUsers });
  }
  return response.badRequest();
};

module.exports = updateProfile;