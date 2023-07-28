const express = require('express');
const router = express.Router();
const conversationsController = require('../../../controller/client/v1/conversations');
const {
  auth,checkRolePermission,
} = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/client/api/v1/conversations/list').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.findAllConversations);
router.route('/client/api/v1/conversations/count').post(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.getConversationsCount);
router.route('/client/api/v1/conversations/:id').get(auth(PLATFORM.CLIENT),checkRolePermission,conversationsController.getConversationsById);

module.exports = router;
