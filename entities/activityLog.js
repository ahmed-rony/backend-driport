module.exports = (activityLog) => {

  let newActivityLog = { 
    details: activityLog.details,
    route: activityLog.route,
    module: activityLog.module,
    action: activityLog.action,
    referenceId: activityLog.referenceId,
    loggedInUser: activityLog.loggedInUser,
    method: activityLog.method,
    isDeleted: activityLog.isDeleted,
  };

  // remove undefined values
  Object.keys(newActivityLog).forEach(key => newActivityLog[key] === undefined && delete newActivityLog[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newActivityLog) => {
   *   if (!newActivityLog.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newActivityLog) 
   */

  return Object.freeze(newActivityLog);
};
