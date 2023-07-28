module.exports = (conversations) => {

  let newConversations = { 
    sender: conversations.sender,
    profileName: conversations.profileName,
    step: conversations.step,
    data: conversations.data,
    messages: conversations.messages,
    isCompleted: conversations.isCompleted,
    isDeleted: conversations.isDeleted,
    isActive: conversations.isActive,
    createdAt: conversations.createdAt,
    updatedAt: conversations.updatedAt,
    addedBy: conversations.addedBy,
    updatedBy: conversations.updatedBy,
    companyId: conversations.companyId,
  };

  // remove undefined values
  Object.keys(newConversations).forEach(key => newConversations[key] === undefined && delete newConversations[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newConversations) => {
   *   if (!newConversations.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newConversations) 
   */

  return Object.freeze(newConversations);
};
