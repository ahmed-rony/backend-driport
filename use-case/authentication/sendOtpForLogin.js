const response = require('../../utils/response');
const makeSendLoginOTP = require('../common/sendLoginOTP');

/**
 * @description : send OTP to user for login
 * @param {Object} params : request body.
 * @return {Object} : response for sendOtpForLogin {status, message, data}
 */
const sendOtpForLogin = ({ usersDb }) => async (params) => {
  if (!params.username){
    return response.badRequest({ message : 'Insufficient request parameters! username is required.' });
  }
  let sendLoginOTP = makeSendLoginOTP({ usersDb });
  let result = await sendLoginOTP(params.username);
  return result;
};
module.exports = sendOtpForLogin;