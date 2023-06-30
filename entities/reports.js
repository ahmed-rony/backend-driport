module.exports = (reports) => {

  let newReports = { 
    conversationId: reports.conversationId,
    profileName: reports.profileName,
    userPhone: reports.userPhone,
    description: reports.description,
    reportType: reports.reportType,
    media: reports.media,
    evidenceID: reports.evidenceID,
    plate: reports.plate,
    date: reports.date,
    location: reports.location,
    riskMatrix: reports.riskMatrix,
    count: reports.count,
    driverId: reports.driverId,
    vehicleId: reports.vehicleId,
    companyId: reports.companyId,
    isDeleted: reports.isDeleted,
    isActive: reports.isActive,
    createdAt: reports.createdAt,
    updatedAt: reports.updatedAt,
    addedBy: reports.addedBy,
    updatedBy: reports.updatedBy,
  };

  // remove undefined values
  Object.keys(newReports).forEach(key => newReports[key] === undefined && delete newReports[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newReports) => {
   *   if (!newReports.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newReports) 
   */

  return Object.freeze(newReports);
};
