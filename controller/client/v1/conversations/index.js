const conversationsDb = require('../../../../data-access/conversationsDb');
const reportsDb = require('../../../../data-access/reportsDb');

const conversationsSchema = require('../../../../validation/schema/conversations');

const createValidation = require('../../../../validation')(conversationsSchema.createSchema);
const updateValidation = require('../../../../validation')(conversationsSchema.updateSchema);
const filterValidation = require('../../../../validation')(conversationsSchema.filterValidationSchema);
const addConversationsUsecase = require('../../../../use-case/conversations/addConversations')({
  conversationsDb,
  createValidation 
});
const findAllConversationsUsecase = require('../../../../use-case/conversations/findAllConversations')({
  conversationsDb,
  filterValidation
});
const getConversationsCountUsecase = require('../../../../use-case/conversations/getConversationsCount')({
  conversationsDb,
  filterValidation
});
const getConversationsUsecase = require('../../../../use-case/conversations/getConversations')({
  conversationsDb,
  filterValidation
});
const updateConversationsUsecase = require('../../../../use-case/conversations/updateConversations')({
  conversationsDb,
  updateValidation 
});
const partialUpdateConversationsUsecase = require('../../../../use-case/conversations/partialUpdateConversations')({ conversationsDb });
const softDeleteConversationsUsecase = require('../../../../use-case/conversations/softDeleteConversations')({
  conversationsDb,
  reportsDb
});
const softDeleteManyConversationsUsecase = require('../../../../use-case/conversations/softDeleteManyConversations')({
  conversationsDb,
  reportsDb
});
const bulkInsertConversationsUsecase = require('../../../../use-case/conversations/bulkInsertConversations')({ conversationsDb });
const bulkUpdateConversationsUsecase = require('../../../../use-case/conversations/bulkUpdateConversations')({ conversationsDb });
const deleteConversationsUsecase = require('../../../../use-case/conversations/deleteConversations')({
  conversationsDb,
  reportsDb
});
const deleteManyConversationsUsecase = require('../../../../use-case/conversations/deleteManyConversations')({
  conversationsDb,
  reportsDb
});

const conversationsController = require('./conversations');

const addConversations = conversationsController.addConversations(addConversationsUsecase);
const findAllConversations = conversationsController.findAllConversations(findAllConversationsUsecase);
const getConversationsCount = conversationsController.getConversationsCount(getConversationsCountUsecase);
const getConversationsById = conversationsController.getConversations(getConversationsUsecase);
const updateConversations = conversationsController.updateConversations(updateConversationsUsecase);
const partialUpdateConversations = conversationsController.partialUpdateConversations(partialUpdateConversationsUsecase);
const softDeleteConversations = conversationsController.softDeleteConversations(softDeleteConversationsUsecase);
const softDeleteManyConversations = conversationsController.softDeleteManyConversations(softDeleteManyConversationsUsecase);
const bulkInsertConversations = conversationsController.bulkInsertConversations(bulkInsertConversationsUsecase);
const bulkUpdateConversations = conversationsController.bulkUpdateConversations(bulkUpdateConversationsUsecase);
const deleteConversations = conversationsController.deleteConversations(deleteConversationsUsecase);
const deleteManyConversations = conversationsController.deleteManyConversations(deleteManyConversationsUsecase);

module.exports = {
  addConversations,
  findAllConversations,
  getConversationsCount,
  getConversationsById,
  updateConversations,
  partialUpdateConversations,
  softDeleteConversations,
  softDeleteManyConversations,
  bulkInsertConversations,
  bulkUpdateConversations,
  deleteConversations,
  deleteManyConversations,
};