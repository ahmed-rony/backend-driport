const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/client/v1/users');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/users/me').get(auth(PLATFORM.CLIENT),usersController.getLoggedInUserInfo);
router.route('/client/api/v1/users/change-password').put(auth(PLATFORM.CLIENT),usersController.changePassword);
router.route('/client/api/v1/users/update-profile').put(auth(PLATFORM.CLIENT),usersController.updateProfile);

module.exports = router;
