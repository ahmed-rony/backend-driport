const express = require('express');
const router = express.Router();
const conversationsController = require('../../controller/admin/conversations');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/conversations/create').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.addConversations);
router.route('/admin/conversations/addBulk').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.bulkInsertConversations);
router.route('/admin/conversations/list').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.findAllConversations);
router.route('/admin/conversations/count').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.getConversationsCount);
router.route('/admin/conversations/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.getConversationsById);
router.route('/admin/conversations/update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.updateConversations);   
router.route('/admin/conversations/partial-update/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.partialUpdateConversations);   
router.route('/admin/conversations/updateBulk').put(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.bulkUpdateConversations); 
router.route('/admin/conversations/softDelete/:id').put(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.softDeleteConversations);
router.route('/admin/conversations/softDeleteMany').put(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.softDeleteManyConversations);
router.route('/admin/conversations/delete/:id').delete(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.deleteConversations);
router.route('/admin/conversations/deleteMany').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.deleteManyConversations);

module.exports = router;
