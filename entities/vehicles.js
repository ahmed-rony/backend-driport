module.exports = (vehicles) => {

  let newVehicles = { 
    brand: vehicles.brand,
    model: vehicles.model,
    year: vehicles.year,
    color: vehicles.color,
    plate: vehicles.plate,
    vin: vehicles.vin,
    stickerID: vehicles.stickerID,
    companyId: vehicles.companyId,
    driverId: vehicles.driverId,
    isDeleted: vehicles.isDeleted,
    isActive: vehicles.isActive,
    createdAt: vehicles.createdAt,
    updatedAt: vehicles.updatedAt,
    addedBy: vehicles.addedBy,
    updatedBy: vehicles.updatedBy,
  };

  // remove undefined values
  Object.keys(newVehicles).forEach(key => newVehicles[key] === undefined && delete newVehicles[key]);

  // To validate Entity uncomment this block
  /*
   * const validate = (newVehicles) => {
   *   if (!newVehicles.field) {
   *       throw new Error("this field is required");
   *   }
   * }
   * validate(newVehicles) 
   */

  return Object.freeze(newVehicles);
};
