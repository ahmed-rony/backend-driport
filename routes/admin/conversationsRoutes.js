const express = require('express');
const router = express.Router();
const conversationsController = require('../../controller/admin/conversations');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

router.route('/admin/conversations/create').post(conversationsController.addConversations);
router.route('/admin/conversations/addBulk').post(conversationsController.bulkInsertConversations);
router.route('/admin/conversations/list').post(conversationsController.findAllConversations);
router.route('/admin/conversations/count').post(conversationsController.getConversationsCount);
router.route('/admin/conversations/:id').get(conversationsController.getConversationsById);
router.route('/admin/conversations/update/:id').put(conversationsController.updateConversations);  
router.route('/admin/conversations/partial-update/:id').put(conversationsController.partialUpdateConversations);  
router.route('/admin/conversations/updateBulk').put(conversationsController.bulkUpdateConversations);
router.route('/admin/conversations/softDelete/:id').put(conversationsController.softDeleteConversations);
router.route('/admin/conversations/softDeleteMany').put(conversationsController.softDeleteManyConversations);
router.route('/admin/conversations/delete/:id').delete(conversationsController.deleteConversations);
router.route('/admin/conversations/deleteMany').post(conversationsController.deleteManyConversations);

module.exports = router;
