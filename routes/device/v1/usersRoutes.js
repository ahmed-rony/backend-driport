const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/device/v1/users');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/users/me').get(auth(PLATFORM.DEVICE),usersController.getLoggedInUserInfo);
router.route('/device/api/v1/users/change-password').put(auth(PLATFORM.DEVICE),usersController.changePassword);
router.route('/device/api/v1/users/update-profile').put(auth(PLATFORM.DEVICE),usersController.updateProfile);

module.exports = router;
