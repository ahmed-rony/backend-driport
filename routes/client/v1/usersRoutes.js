const express = require('express');
const router = express.Router();
const usersController = require('../../../controller/client/v1/users');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/users/me').get(auth(PLATFORM.CLIENT),usersController.getLoggedInUserInfo);
router.route('/client/api/v1/users/create').post(usersController.addUsers);
router.route('/client/api/v1/users/addBulk').post(usersController.bulkInsertUsers);
router.route('/client/api/v1/users/list').post(usersController.findAllUsers);
router.route('/client/api/v1/users/count').post(usersController.getUsersCount);
router.route('/client/api/v1/users/:id').get(usersController.getUsersById);
router.route('/client/api/v1/users/update/:id').put(usersController.updateUsers);  
router.route('/client/api/v1/users/partial-update/:id').put(usersController.partialUpdateUsers);  
router.route('/client/api/v1/users/updateBulk').put(usersController.bulkUpdateUsers);
router.route('/client/api/v1/users/softDelete/:id').put(usersController.softDeleteUsers);
router.route('/client/api/v1/users/softDeleteMany').put(usersController.softDeleteManyUsers);
router.route('/client/api/v1/users/delete/:id').delete(usersController.deleteUsers);
router.route('/client/api/v1/users/deleteMany').post(usersController.deleteManyUsers);
router.route('/client/api/v1/users/change-password').put(auth(PLATFORM.CLIENT),usersController.changePassword);
router.route('/client/api/v1/users/update-profile').put(auth(PLATFORM.CLIENT),usersController.updateProfile);

module.exports = router;
