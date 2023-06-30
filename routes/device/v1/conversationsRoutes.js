const express = require('express');
const router = express.Router();
const conversationsController = require('../../../controller/device/v1/conversations');
const { auth, } = require('../../../middleware');
const { PLATFORM } =  require('../../../constants/authConstant'); 

router.route('/device/api/v1/conversations/create').post(conversationsController.addConversations);
router.route('/device/api/v1/conversations/addBulk').post(conversationsController.bulkInsertConversations);
router.route('/device/api/v1/conversations/list').post(conversationsController.findAllConversations);
router.route('/device/api/v1/conversations/count').post(conversationsController.getConversationsCount);
router.route('/device/api/v1/conversations/:id').get(conversationsController.getConversationsById);
router.route('/device/api/v1/conversations/update/:id').put(conversationsController.updateConversations);  
router.route('/device/api/v1/conversations/partial-update/:id').put(conversationsController.partialUpdateConversations);  
router.route('/device/api/v1/conversations/updateBulk').put(conversationsController.bulkUpdateConversations);
router.route('/device/api/v1/conversations/softDelete/:id').put(conversationsController.softDeleteConversations);
router.route('/device/api/v1/conversations/softDeleteMany').put(conversationsController.softDeleteManyConversations);
router.route('/device/api/v1/conversations/delete/:id').delete(conversationsController.deleteConversations);
router.route('/device/api/v1/conversations/deleteMany').post(conversationsController.deleteManyConversations);

module.exports = router;
