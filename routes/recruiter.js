const express = require('express');
const route = express.Router();
const rootDir = require('../util/path');
const isAuth = require('../middleware/is-auth');
const recruiterController = require('../controllers/recruiterController');
const {
    check,
    validationResult,
    body
} = require("express-validator");
const db = require('../config/config');
const Op = db.Op;

route.get('/addRecruiter', isAuth, recruiterController.getAddRecruiter);

route.post('/addRecruiter', isAuth, recruiterController.getSaveRecruiter);

route.get('/getEmployeeList', isAuth, recruiterController.getEmployeeList);

route.get('/employeeId/:employeeID', isAuth, recruiterController.getEmployeeViewEdit);

route.get('/boardingemployeeId', isAuth, recruiterController.getOnBoardEmployeeList);

route.post('/passwordUpdate', isAuth, recruiterController.updatePassword);

route.post("/updateRecruiter", isAuth, recruiterController.updateEmployee);

route.get('/interview', isAuth, recruiterController.getInterview);

route.get('/getManager', isAuth, recruiterController.getManager);

route.get('/getTeamlead', isAuth, recruiterController.getTeamlead);

route.get('/getBusinessDevelopment', isAuth, recruiterController.getBusinessDevelopment);

route.get('/getSupervisior', isAuth, recruiterController.getSupervisior);

route.get('/getFulltime', isAuth, recruiterController.getFulltime);

route.get('/getFreelancer', isAuth, recruiterController.getFreelancer);

route.get('/getInternOff', isAuth, recruiterController.getInternOff);

route.get('/getInternOn', isAuth, recruiterController.getInternOn);

route.get('/getSubvendor', isAuth, recruiterController.getSubvendor);

route.get('/getEmployeeList', isAuth, recruiterController.getEmployeeList);


module.exports = route;