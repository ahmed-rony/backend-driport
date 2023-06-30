const express = require('express');
const router = express.Router();
const conversationsController = require('../../../controller/client/v1/conversations');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/conversations/create').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.addConversations);
router.route('/client/api/v1/conversations/list').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.findAllConversations);
router.route('/client/api/v1/conversations/count').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.getConversationsCount);
router.route('/client/api/v1/conversations/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.getConversationsById);
router.route('/client/api/v1/conversations/update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.updateConversations);   
router.route('/client/api/v1/conversations/partial-update/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.partialUpdateConversations);   
router.route('/client/api/v1/conversations/softDelete/:id').put(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.softDeleteConversations);
router.route('/client/api/v1/conversations/softDeleteMany').put(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.softDeleteManyConversations);
router.route('/client/api/v1/conversations/addBulk').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.bulkInsertConversations);
router.route('/client/api/v1/conversations/updateBulk').put(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.bulkUpdateConversations); 
router.route('/client/api/v1/conversations/delete/:id').delete(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.deleteConversations);
router.route('/client/api/v1/conversations/deleteMany').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.deleteManyConversations);

module.exports = router;
