module.exports = (drivers) => {

  let newDrivers = { 
    driverId: drivers.driverId,
    name: drivers.name,
    age: drivers.age,
    licenseNumber: drivers.licenseNumber,
    riskMatrix: drivers.riskMatrix,
    vehicleId: drivers.vehicleId,
    isDeleted: drivers.isDeleted,
    isActive: drivers.isActive,
    createdAt: drivers.createdAt,
    updatedAt: drivers.updatedAt,
    addedBy: drivers.addedBy,
    updatedBy: drivers.updatedBy,
  };

  // remove undefined values
  Object.keys(newDrivers).forEach(key => newDrivers[key] === undefined && delete newDrivers[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newDrivers) => {
   *   if (!newDrivers.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newDrivers) 
   */

  return Object.freeze(newDrivers);
};
