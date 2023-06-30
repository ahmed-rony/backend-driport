module.exports = (users) => {

  let newUsers = { 
    name: users.name,
    email: users.email,
    password: users.password,
    role: users.role,
    createdAt: users.createdAt,
    updatedAt: users.updatedAt,
    companyId: users.companyId,
    isDeleted: users.isDeleted,
    isActive: users.isActive,
    addedBy: users.addedBy,
    updatedBy: users.updatedBy,
    userType: users.userType,
    mobileNo: users.mobileNo,
    username: users.username,
    loginOTP: users.loginOTP,
    resetPasswordLink: users.resetPasswordLink,
    loginRetryLimit: users.loginRetryLimit,
    loginReactiveTime: users.loginReactiveTime,
  };

  // remove undefined values
  Object.keys(newUsers).forEach(key => newUsers[key] === undefined && delete newUsers[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newUsers) => {
   *   if (!newUsers.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newUsers) 
   */

  return Object.freeze(newUsers);
};
