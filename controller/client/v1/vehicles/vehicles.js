const response = require('../../../../utils/response'); 
const responseHandler = require('../../../../utils/response/responseHandler'); 
const getSelectObject = require('../../../../utils/getSelectObject'); 

const addVehicles = (addVehiclesUsecase) => async (req,res) => {
  try {
    let dataToCreate = { ...req.body || {} };
    let fileToCreate = { ...req.files || {} };
    dataToCreate.addedBy = req.user.id;
    let result = await addVehiclesUsecase(dataToCreate, fileToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkInsertVehicles = (bulkInsertVehiclesUsecase)=> async (req,res) => {
  try {
    let dataToCreate = [...req.body.data];
    for (let i = 0;i < dataToCreate.length;i++){
      dataToCreate[i] = {
        ...dataToCreate[i],
        addedBy:req.user.id,
      };
    }
    let result = await bulkInsertVehiclesUsecase(dataToCreate,req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const findAllVehicles = (findAllVehiclesUsecase) => async (req,res) => {
  try {
    let query = { ...req.body.query || {} };
    let options = { ...req.body.options || {} };
    let result = await findAllVehiclesUsecase({
      query,
      options,
      isCountOnly:req.body.isCountOnly || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    console.log(error);
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getVehicles = (getVehiclesUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest());
    }
    let query = { _id: req.params.id };
    let options = {};
    let result = await getVehiclesUsecase({
      query,
      options
    },req,res);
    return responseHandler(res,result);
  } catch (error) {
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getVehiclesCount = (getVehiclesCountUsecase) => async (req,res) => {
  try {
    let where = { ...req.body.where || {} };
    let result = await getVehiclesCountUsecase({ where },req,res);  
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const getTopVehicles = (getVehiclesCountUsecase) => async (req,res) => {
  try {
    let aggregate = [
      {
        $group: {
          _id: '$vehicle._id',
          totalReports: { $sum: 1 },
        },
      },
      { $sort: { totalReports: -1 }, },
      { $limit: 10, },
      {
        $lookup: {
          from: 'vehicles',
          localField: '_id', // Ajusta este campo si es diferente al campo "_id"
          foreignField: '_id',
          as: 'vehicleData',
        },
      },
      { $unwind: '$vehicleData', },
      {
        $project: {
          vehicleId: '$vehicleData._id',
          brand: '$vehicleData.brand',
          model: '$vehicleData.model',
          totalReports: 1,
        },
      },
    ];
    let result = await getVehiclesCountUsecase({ aggregate },req,res);  
    return responseHandler(res,result);
  } catch (error){
    console.log(error);
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const updateVehicles = (updateVehiclesUsecase) => async (req,res) =>{
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let dataToUpdate = { ...req.body || {} };
    let query = { _id: req.params.id };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await updateVehiclesUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const bulkUpdateVehicles = (bulkUpdateVehiclesUsecase) => async (req,res) => {
  try {
    let dataToUpdate = { ...req.body.data || {} };
    let query = { ...req.body.filter || {} };
    delete dataToUpdate.addedBy;
    dataToUpdate.updatedBy = req.user.id;
    let result = await bulkUpdateVehiclesUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const partialUpdateVehicles = (partialUpdateVehiclesUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let dataToUpdate = { ...req.body || {} };
    dataToUpdate.updatedBy = req.user.id;
    let result = await partialUpdateVehiclesUsecase({
      dataToUpdate,
      query
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteVehicles = (softDeleteVehiclesUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteVehiclesUsecase({
      query,
      dataToUpdate,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteVehicles = (deleteVehiclesUsecase) => async (req,res) => {
  try {
    if (!req.params.id){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let query = { _id: req.params.id };
    let result = await deleteVehiclesUsecase({
      query,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const deleteManyVehicles = (deleteManyVehiclesUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! ids field is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    let result = await deleteManyVehiclesUsecase({
      query,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

const softDeleteManyVehicles = (softDeleteManyVehiclesUsecase) => async (req,res) => {
  try {
    if (!req.body || !req.body.ids){
      return responseHandler(res,response.badRequest({ message : 'Insufficient request parameters! id is required.' }));
    }
    let ids = req.body.ids;
    let query = { _id : { $in:ids } };
    const dataToUpdate = {
      isDeleted: true,
      updatedBy: req.user.id,
    };
    let result = await softDeleteManyVehiclesUsecase({
      query,
      dataToUpdate,
      isWarning:req.body.isWarning || false
    },req,res);
    return responseHandler(res,result);
  } catch (error){
    return responseHandler(res,response.internalServerError({ message:error.message }));
  }
};

module.exports = {
  addVehicles,
  bulkInsertVehicles,
  findAllVehicles,
  getVehicles,
  getVehiclesCount,
  getTopVehicles,
  updateVehicles,
  bulkUpdateVehicles,
  partialUpdateVehicles,
  softDeleteVehicles,
  deleteVehicles,
  deleteManyVehicles,
  softDeleteManyVehicles
};
