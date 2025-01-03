const express = require("express");
const route = express.Router();
const isAuth = require("../middleware/is-auth");
const institute = require("../controllers/instituteController");

route.get("/add-institute", isAuth, institute.getInitialForm);

route.post("/new-institute-add", isAuth, institute.saveInstitute);

route.post("/update-institute-add", isAuth, institute.updateInstitute);

route.get("/dashboard", isAuth, institute.getDashboard);

route.get("/getAllCollege", isAuth, institute.getAllCollege);

route.get("/getAllInstitute", isAuth, institute.getAllInstitute);

route.get("/trainingCount", isAuth, institute.trainingCount);

route.get("/consultancyCount", isAuth, institute.consultancyCount);

route.get("/skillDevelopmentCount", isAuth, institute.skillDevelopmentCount);

route.get("/driveReportNo", isAuth, institute.driveReportNo);

route.get("/driveReportYes", isAuth, institute.driveReportYes);

route.get("/internshipYes", isAuth, institute.internshipYes);

route.get("/internshipNo", isAuth, institute.internshipNo);

route.get("/internshipN2a", isAuth, institute.internshipN2a);

route.get("/internshipFollowUp", isAuth, institute.internshipFollowUp);

route.get("/crtN2a", isAuth, institute.crtN2a);

route.get("/crtFollowUp", isAuth, institute.crtFollowUp);

route.get("/crtInProcess", isAuth, institute.crtInProcess);

route.get("/crtNotInterested", isAuth, institute.crtNotInterested);

route.get("/instituteStatusNI", isAuth, institute.instituteStatusNI);

route.get("/instituteStatusN2a", isAuth, institute.instituteStatusN2a);

route.get("/instituteStatusFollowUp", isAuth, institute.instituteStatusFollowUp);

route.get("/instituteStatusDriveDone", isAuth, institute.instituteStatusDriveDone);

route.get("/instituteStatusCallback", isAuth, institute.instituteStatusCallback);

route.get("/instituteStatusAwaitingDrive", isAuth, institute.instituteStatusAwaitingDrive);

route.get("/_detail/:instituteId", isAuth, institute.getInstituteViewEdit);

module.exports = route;
