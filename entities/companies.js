module.exports = (companies) => {

  let newCompanies = { 
    companyName: companies.companyName,
    registrationNumber: companies.registrationNumber,
    email: companies.email,
    phone: companies.phone,
    website: companies.website,
    address: companies.address,
    otherData: companies.otherData,
    isDeleted: companies.isDeleted,
    isActive: companies.isActive,
    createdAt: companies.createdAt,
    updatedAt: companies.updatedAt,
    addedBy: companies.addedBy,
    updatedBy: companies.updatedBy,
    userId: companies.userId,
  };

  // remove undefined values
  Object.keys(newCompanies).forEach(key => newCompanies[key] === undefined && delete newCompanies[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newCompanies) => {
   *   if (!newCompanies.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newCompanies) 
   */

  return Object.freeze(newCompanies);
};
