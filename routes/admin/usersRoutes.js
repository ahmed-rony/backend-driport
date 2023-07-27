const express = require('express');
const router = express.Router();
const usersController = require('../../controller/admin/users');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/users/me').get(auth(PLATFORM.ADMIN),usersController.getLoggedInUserInfo);
router.route('/admin/users/create').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.addUsers);
router.route('/admin/users/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.bulkInsertUsers);
router.route('/admin/users/list').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.findAllUsers);
router.route('/admin/users/count').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.getUsersCount);
router.route('/admin/users/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,usersController.getUsersById);
router.route('/admin/users/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.updateUsers);   
router.route('/admin/users/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.partialUpdateUsers);   
router.route('/admin/users/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.bulkUpdateUsers); 
router.route('/admin/users/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.softDeleteUsers);
router.route('/admin/users/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,usersController.softDeleteManyUsers);
router.route('/admin/users/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,usersController.deleteUsers);
router.route('/admin/users/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,usersController.deleteManyUsers);
router.route('/admin/users/change-password').put(auth(PLATFORM.ADMIN),usersController.changePassword);
router.route('/admin/users/update-profile').put(auth(PLATFORM.ADMIN),usersController.updateProfile);

module.exports = router;
