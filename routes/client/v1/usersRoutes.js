const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/client/v1/users');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/users/me').get(auth(PLATFORM.CLIENT),usersController.getLoggedInUserInfo);
router.route('/client/api/v1/users/create').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.addUsers);
router.route('/client/api/v1/users/list').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.findAllUsers);
router.route('/client/api/v1/users/count').post(auth(PLATFORM.CLIENT),checkRolePermission,usersController.getUsersCount);
router.route('/client/api/v1/users/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,usersController.getUsersById);
router.route('/client/api/v1/users/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.updateUsers);   
router.route('/client/api/v1/users/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,usersController.partialUpdateUsers);   
router.route('/client/api/v1/users/change-password').put(auth(PLATFORM.CLIENT),usersController.changePassword);
router.route('/client/api/v1/users/update-profile').put(auth(PLATFORM.CLIENT),usersController.updateProfile);

module.exports = router;
