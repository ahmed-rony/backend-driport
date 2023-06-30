const express = require('express');
const router = express.Router();
const companiesController = require('../../controller/admin/companies');
const { auth, } = require('../../middleware');
const { PLATFORM } =  require('../../constants/authConstant'); 

module.exports = router;
