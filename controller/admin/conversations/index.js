const conversationsDb = require('../../../data-access/conversationsDb');
const reportsDb = require('../../../data-access/reportsDb');

const conversationsSchema = require('../../../validation/schema/conversations');

const createValidation = require('../../../validation')(conversationsSchema.createSchema);
const updateValidation = require('../../../validation')(conversationsSchema.updateSchema);
const filterValidation = require('../../../validation')(conversationsSchema.filterValidationSchema);
const findAllConversationsUsecase = require('../../../use-case/conversations/findAllConversations')({
  conversationsDb,
  filterValidation
});
const getConversationsCountUsecase = require('../../../use-case/conversations/getConversationsCount')({
  conversationsDb,
  filterValidation
});
const getConversationsUsecase = require('../../../use-case/conversations/getConversations')({
  conversationsDb,
  filterValidation
});

const conversationsController = require('./conversations');

const findAllConversations = conversationsController.findAllConversations(findAllConversationsUsecase);
const getConversationsCount = conversationsController.getConversationsCount(getConversationsCountUsecase);
const getConversationsById = conversationsController.getConversations(getConversationsUsecase);

module.exports = {
  findAllConversations,
  getConversationsCount,
  getConversationsById,
};