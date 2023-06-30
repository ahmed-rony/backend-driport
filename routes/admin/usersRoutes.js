const express = require('express');
const router = express.Router();
const usersController = require('../../controller/admin/users');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/users/me').get(auth(PLATFORM.ADMIN),usersController.getLoggedInUserInfo);
router.route('/admin/users/create').post(usersController.addUsers);
router.route('/admin/users/addBulk').post(usersController.bulkInsertUsers);
router.route('/admin/users/list').post(usersController.findAllUsers);
router.route('/admin/users/count').post(usersController.getUsersCount);
router.route('/admin/users/:id').get(usersController.getUsersById);
router.route('/admin/users/update/:id').put(usersController.updateUsers);  
router.route('/admin/users/partial-update/:id').put(usersController.partialUpdateUsers);  
router.route('/admin/users/updateBulk').put(usersController.bulkUpdateUsers);
router.route('/admin/users/softDelete/:id').put(usersController.softDeleteUsers);
router.route('/admin/users/softDeleteMany').put(usersController.softDeleteManyUsers);
router.route('/admin/users/delete/:id').delete(usersController.deleteUsers);
router.route('/admin/users/deleteMany').post(usersController.deleteManyUsers);
router.route('/admin/users/change-password').put(auth(PLATFORM.ADMIN),usersController.changePassword);
router.route('/admin/users/update-profile').put(auth(PLATFORM.ADMIN),usersController.updateProfile);

module.exports = router;
