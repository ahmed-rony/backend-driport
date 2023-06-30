const express = require('express');
const router = express.Router();
const usersController = require('../../controller/admin/users');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/users/me').get(auth(PLATFORM.ADMIN),usersController.getLoggedInUserInfo);
router.route('/admin/users/change-password').put(auth(PLATFORM.ADMIN),usersController.changePassword);
router.route('/admin/users/update-profile').put(auth(PLATFORM.ADMIN),usersController.updateProfile);

module.exports = router;
