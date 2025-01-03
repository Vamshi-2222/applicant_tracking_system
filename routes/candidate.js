const express = require("express");
const route = express.Router();
const rootDir = require("../util/path");
const isAuth = require("../middleware/is-auth");
const upload = require("../middleware/upload");
const db = require("../config/config");
const Op = db.Op;

const { check, validationResult, body } = require("express-validator");
const candidate = require("../controllers/candidateController");

route.get("/registration", candidate.getInitialForm);

route.post(
  "/personal-info", isAuth, candidate.setPersonalInfo
);

route.post("/updatepersonal", isAuth, candidate.updatedCandidateByUser);

route.post("/update-education-info", isAuth, candidate.updateEducationByUser);

route.post("/update-experience-info", isAuth, candidate.getUpdateExperienceData);

route.post("/level-one-assessment-update", isAuth, candidate.updateLevelOneAssessment);

route.post("/level-two-assessment-update", isAuth, candidate.getLevelTwoAssessmentUpdate)

route.get("/addcandidate", isAuth, candidate.addNewCandidate); //candidate.getAddCandidateByUser);

route.post("/new-candidate-add", isAuth, candidate.newCandidateAdd);

route.post("/education-info", isAuth, candidate.setEducationInfo);

route.post("/experience-info", isAuth, candidate.saveExperienceInfo);

route.get("/getAllCandidate", isAuth, candidate.getCandidateList);

route.get("/callAssignCandidate", isAuth, candidate.getAssignCandidateList);

route.get("/assignCandidate", isAuth, candidate.assignCandidate);

// route.get("/candidate/:candidateId", isAuth, candidate.getCandidateViewEdit);

route.get(
  "/getAllCandidate/:candidateId",
  isAuth,
  candidate.getAssignCandidate
);

route.post("/assignment", isAuth, candidate.setAssignmentToRecruiter);

route.get("/filterCandidate", isAuth, candidate.getSearchFilter);

route.post("/getFilter", isAuth, candidate.getSearchList);

route.get("/ajax/:candidateId", isAuth, candidate.getAssigntrue);

route.get("/ajaxSecond/:candidateId", isAuth, candidate.getAssigntrue);

route.post("/level-one-assessment", isAuth, candidate.getLevelOneAssessment);

route.post("/level-oneassessment", isAuth, candidate.getLevelOneNewAssessment);

route.post("/level-two-assessment", isAuth, candidate.getLevelTwoAssessment);

route.get("/getRejectGroupDiscussion", isAuth, candidate.getRejectGroupDiscussion);

route.get('/getInterviewList', isAuth, candidate.getInterviewList);

route.get('/getInterview/:candidateId/:level', isAuth, candidate.getTakeInterview);

route.get("/candidate/:candidateId", isAuth, candidate.getCandidateViewEdit);

route.get('/candidate/levelTwoDelete/:candidateId', isAuth, candidate.deleteLeveltwo);

route.post('/final-assessment', isAuth, candidate.getFinalAssessment);

route.get('/getClientReject', isAuth, candidate.getRejectByClient);

route.get('/getRejectOPS', isAuth, candidate.getRejectOPS);

route.get('/getTypingReject', isAuth, candidate.getTypingReject);

route.get('/getTotalVersantReject', isAuth, candidate.getTotalVersantReject);

route.get('/getTotalGATReject', isAuth, candidate.getTotalGATReject);

route.get('/getTotalAMCATReject', isAuth, candidate.getTotalAMCATReject);

route.get('/totalInterScheduleTelephonic', isAuth, candidate.getTotalInterScheduleTelephonic);

route.get('/getFSRReject', isAuth, candidate.getFSRReject);

route.get('/getOfferDrop', isAuth, candidate.getOfferDrop);

route.get('/getTotalHold', isAuth, candidate.getTotalHold);

route.get('/getTotalNoShow', isAuth, candidate.getTotalNoShow);

route.get('/totalFinalFeedback', isAuth, candidate.getTotalFinalFeedback);

route.get('/totalInProcessI', isAuth, candidate.getTotalInProcessI);

route.get('/totalTrainAndHired', isAuth, candidate.getTotalTrainAndHired);

route.get('/getTotalTenureTracking', isAuth, candidate.getTotalTenureTracking);

route.get('/needToBill', isAuth, candidate.needToBill);

route.get('/totalBilled', isAuth, candidate.totalBilled);

route.get('/totalNonTenure', isAuth, candidate.totalNonTenure);

route.get('/totalTraining', isAuth, candidate.getTotalTraining);

route.get('/totalDocumentation', isAuth, candidate.totalDocumentation);

route.get('/totalL1Reject', isAuth, candidate.getTotalL1Reject);

route.get('/totalLOneInJob', isAuth, candidate.getTotalLOneinJob);

route.get('/totalLOneExperienced', isAuth, candidate.getTotalLOneExperienced);

route.get('/totalLOneFresher', isAuth, candidate.getTotalLOneFresher);

route.get('/totalL2Reject', isAuth, candidate.getTotalL2Reject);

route.get('/totalLtwoInJob', isAuth, candidate.getTotalL2InJob);

route.get('/totalLtwoExperienced', isAuth, candidate.getTotalL2Experienced);

route.get('/totalLTwoFresher', isAuth, candidate.getTotalL2Fresher);

route.get('/levelTwoSelect', isAuth, candidate.getLevelTwo);

route.get('/getNoShowLineUp', isAuth, candidate.getNoShowLineUp);

route.get('/getTotalLevelOneDnd', isAuth, candidate.getTotalLevelOneDnd);

route.get('/getTotalLevelOneWd', isAuth, candidate.getTotalLevelOneWd);

route.get('/getTotalLevelTwoDnd', isAuth, candidate.getTotalLevelTwoDnd);

route.get('/getTotatLevelTwoWd', isAuth, candidate.getTotatLevelTwoWd);

route.get('/getTotalAwaitJoin', isAuth, candidate.getTotalAwaitJoin);

route.get('/svvrProcess', isAuth, candidate.svvrProcess);

route.get('/svvrClosed', isAuth, candidate.svvrClosed);

route.get('/totalWrongNumber', isAuth, candidate.getWrongNumberLOne);

route.get('/totalWrongNumberLevelTwo', isAuth, candidate.getWrongNumberLTwo);

route.get('/totalInternshipJoined', isAuth, candidate.totalInternshipJoined);

route.get('/totalInternshipDrop', isAuth, candidate.totalInternshipDrop);

route.get('/totalInternshipInProcess', isAuth, candidate.totalInternshipInProcess );

route.post('/assignmentDone', isAuth, candidate.assignmentDone);

route.post("/upload", isAuth, upload.single("file"), candidate.upload);

route.get("/download", isAuth, candidate.download);

route.get("/deleteLevelOne/:candidateId", isAuth, candidate.deleteLevelOne);

route.get("/callFreshCandidate", isAuth, candidate.callFreshCandidate);

route.get("/recuiterSearchWindow", isAuth, candidate.recuiterSearchWindow);

route.post("/getRecruiterSearch", isAuth, candidate.getRecruiterSearchResult);

route.get("/totalLOneBlackList", isAuth, candidate.getTotalLOneBlackList);

route.get("/totalLTwoBlackList", isAuth, candidate.getTotalLTwoBlackList);

route.get("/totalRampdown", isAuth, candidate.getTotalRampdown);

module.exports = route;
