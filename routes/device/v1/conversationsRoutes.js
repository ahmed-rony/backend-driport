const express = require('express');
const router = express.Router();
const conversationsController = require('../../../controller/device/v1/conversations');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/conversations/create').post(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.addConversations);
router.route('/device/api/v1/conversations/addBulk').post(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.bulkInsertConversations);
router.route('/device/api/v1/conversations/list').post(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.findAllConversations);
router.route('/device/api/v1/conversations/count').post(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.getConversationsCount);
router.route('/device/api/v1/conversations/:id').get(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.getConversationsById);
router.route('/device/api/v1/conversations/update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.updateConversations);   
router.route('/device/api/v1/conversations/partial-update/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.partialUpdateConversations);   
router.route('/device/api/v1/conversations/updateBulk').put(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.bulkUpdateConversations); 
router.route('/device/api/v1/conversations/softDelete/:id').put(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.softDeleteConversations);
router.route('/device/api/v1/conversations/softDeleteMany').put(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.softDeleteManyConversations);
router.route('/device/api/v1/conversations/delete/:id').delete(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.deleteConversations);
router.route('/device/api/v1/conversations/deleteMany').post(auth(PLATFORM.DEVICE),checkRolePermission,conversationsController.deleteManyConversations);

module.exports = router;
