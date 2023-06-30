const express = require('express');
const router = express.Router();
const conversationsController = require('../../controller/admin/conversations');
const {
  auth,checkRolePermission,
} = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/conversations/list').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.findAllConversations);
router.route('/admin/conversations/count').post(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.getConversationsCount);
router.route('/admin/conversations/:id').get(auth(PLATFORM.ADMIN),checkRolePermission,conversationsController.getConversationsById);

module.exports = router;
