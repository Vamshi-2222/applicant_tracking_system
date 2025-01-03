const db = require("../config/config");
const bcrypt = require("bcryptjs");
const role = require("../util/constant").SOURCE;
const {
  Op
} = require("sequelize");
var fs = require('fs');


exports.getUserLogin = (req, res, next) => {
  var userID = req.body.username;
  var password = req.body.password;
  var id, emailUser, passwordPromise, user;
  var userType = null, managerID = 0;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    totalEmployee = 0,
    totalGroupDiscussionReject = 0,
    totalTypingReject = 0,
    totalVersantReject = 0,
    totalGATReject = 0,
    totalAMCATReject = 0,
    totalInProcess = 0,
    totalHold = 0,
    totalNoShow = 0,
    totalOpsReject = 0,
    totalClientReject = 0,
    totalSelected = 0,
    totalOfferDrop = 0,
    totalGetFSRReject = 0,
    totalNonTenure = 0,
    totalTracking = 0,
    totalNeedToBilled = 0,
    totalBilled = 0,
    totalL1Reject = 0,
    totalL2Reject = 0,
    totalL2NoShow = 0,
    totalDocumentation = 0,
    totalTraining = 0,
    totalLevelTwoCount = 0
    totatLevelTwoWd = 0,
    totalLevelOneWd = 0,
    totalLevelOneDnd = 0,
    totalLevelTwoDnd = 0,
    totalInProcessI = 0,
    totalFinalFeedback = 0,
    totalSvvrClosed = 0,
    totalSvvrInProcess = 0,
    totalWrongNumber = 0,
    totalWrongNumberLevelTwo = 0,
    totalInternshipJoined = 0,
    totalInternshipDrop = 0,
    totalInternshipInProcess = 0,
    totalInterScheduleTelephonic = 0,
    totalFreshCandidateCount = 0,
    totalLOneInJob = 0,
    totalLOneExperienced = 0,
    totalLOneFresher = 0,
    totalLtwoInJob = 0,
    totalLtwoExperienced = 0,
    totalLTwoFresher = 0,
    totalTrainAndHired = 0,
    totalLOneBlackList = 0,
    totalLTwoBlackList = 0,
    totalRampdown = 0,
      totalExpelledCompany = 0,
      totalInProcessCompany = 0, 
      totalFutureCompany = 0, 
      totalNotInterestedCompany = 0, 
      totalNeedToApproachCompany = 0,
    totalAwaitJoin = 0;


  var passwordStatus = false;
  var dataCount = [0],
    finalDataCount = [];

  db.employeeRegistration
    .findOne({
      where: {
        [Op.or]: [{
          phoneNumberOne: userID,
        },
        {
          phoneNumberTwo: userID,
        },
        {
          phoneNumberthree: userID,
        },
        {
          phoneNumberfour: userID,
        },
        {
          emailOne: userID,
        },
        {
          emailTwo: userID,
        },
        {
          emailThree: userID,
        },
        {
          emailFour: userID,
        },
        ],
      },
    })
    .then(dataResult => {
      console.log(dataResult);
      if (dataResult) {
        user = dataResult;
        req.session.user = dataResult.dataValues.recruiterType;
        req.session.userId = dataResult.dataValues.id;
        req.session.accountAccess = dataResult.dataValues.accountAccess;
        req.session.name = dataResult.dataValues.fullName;
        userType = dataResult.dataValues.recruiterType;
        return db.password.findOne({
          where: {
            employeeId: dataResult.dataValues.id,
          },
          attributes: ["password"],
        });
      } else {
        res.redirect("/");
      }
    })
    .then((pass) => {
      if (!pass) {
        res.redirect("/");
      }
      return comparePassword(password, pass.dataValues.password);
    })
    .then((result) => {
      if (result) {
        req.session.isLoggedIn = true;
        if (userType === "ADMIN") {
          const data = getTaskforAdmin();
          return data;
        } else if (userType !== "ADMIN") {
          return getIdForRecruiter(req.session.userId);
        }
      } else {
        res.redirect("/");
      }
    })
    .then(result => {
      if (result) {
        if (userType === "ADMIN") {
          if (result instanceof Array) {
            for (let count of result) {
              if (dataCount.length === 0) {
                dataCount.push(count.dataValues.id)
              } else if (!dataCount.includes(count.dataValues.id)) {
                dataCount.push(count.dataValues.id)
              }
            }
            if (dataCount.length === 0)
              dataCount.push(0);
          } else {
            dataCount.push[0];
          }
        }
        else {
          if (result instanceof Array) {
            for (let count of result) {
              if (dataCount.length === 0) {
                dataCount.push(count.dataValues.AssignCandidate)
              } else if (!dataCount.includes(count.dataValues.AssignCandidate)) {
                dataCount.push(count.dataValues.AssignCandidate)
              }
            }
            if (dataCount.length === 0)
              dataCount.push(0);
          } else {
            dataCount.push[0];
          }
        }
      }

      return getTotalCandidate();
    })
    // .then((result) => {
    //   if (result) {
    //     totalCandidate = result;
    //   }
    //   return getTotalEmployee();
    // })
    // .then((result) => {
    //   if (result) {
    //     totalEmployee = result;
    //   }
    //   return getGroupDiscussionReject(dataCount);
    // })

    // .then((result) => {
    //   if (result) {
    //     totalGroupDiscussionReject = result;
    //   } else {
    //     totalGroupDiscussionReject = 0;
    //   }
    //   return getFSRReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalGetFSRReject = result;
    //   } else {
    //     totalGetFSRReject = 0;
    //   }
    //   return getTYPINGReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalTypingReject = result;
    //   } else {
    //     totalTypingReject = 0;
    //   }
    //   return getVERSANTReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalVersantReject = result;
    //   } else {
    //     totalVersantReject = 0;
    //   }
    //   return getGATReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalGATReject = result.count;
    //   } else {
    //     totalGATReject = 0;
    //   }
    //   return getOnTelInterviewSchedule(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalInterScheduleTelephonic = result;
    //   } else {
    //     totalInterScheduleTelephonic = 0;
    //   }
    //   return getAMCATReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalAMCATReject = result;
    //   } else {
    //     totalAMCATReject = 0;
    //   }
    //   return getIN_PROCESS(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalInProcess = result;
    //   } else {
    //     totalInProcess = 0;
    //   }
    //  return getTrainAndHired(dataCount);
    // })
    // .then(result => {
    //         if (result) {
    //           totalTrainAndHired = result;
    //         } else {
    //           totalTrainAndHired = 0;
    //         }
    //         return getHOLD(dataCount);  
    //     })
    // .then((result) => {
    //   if (result) {
    //     totalHold = result;
    //   } else {
    //     totalHold = 0;
    //   }
    //   return getNO_SHOW(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalNoShow = result;
    //   } else {
    //     totalNoShow = 0;
    //   }
    //   return getCLIENTReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalClientReject = result;
    //   } else {
    //     totalClientReject = 0;
    //   }
    //   return getOPSReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalOpsReject = result;
    //   } else {
    //     totalOpsReject = 0;
    //   }
    //   return getSELECTED(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalSelected = result;
    //   } else {
    //     totalSelected = 0;
    //   }
    //   return getOFFER_DROP(dataCount)
    // })
    .then(result => {
      if (result) {
        totalOfferDrop = result;
      } else {
        totalOfferDrop = 0;
      }
      return getLevelTwo(dataCount)
    })
    .then(result => {
      if (result) {
        for (let id of result) {
          totalLevelTwoCount++;
        }
      } else {
        totalLevelTwoCount = 0;
      }
      return getFinalAssessmentId(dataCount);

    }).then(result => {


      if (result) {
        if (result instanceof Array) {
          for (let count of result) {
            if (finalDataCount.length === 0) {
              finalDataCount.push(count.dataValues.id)
            } else if (!finalDataCount.includes(count.dataValues.id)) {
              finalDataCount.push(count.dataValues.id)
            }
          }
        } else if (result instanceof String) {
          finalDataCount.push[count.dataValues.id];
        } else { 
          finalDataCount.push[0];
        }

      } else {
        finalDataCount.push[0];
      }


      return getNonTenure(finalDataCount); 
    })
    // .then(result => {
    //   if (result) {
    //     totalNonTenure = result;
    //   } else {
    //     totalNonTenure = 0;
    //   }
    //   return getRampDown(finalDataCount);
    // }).then(result => { 
    //   if (result) {
    //     totalRampdown = result;
    //   } else {
    //     totalRampdown = 0;
    //   }
    //   return getTenure(finalDataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalTracking = result;
    //   } else {
    //     totalTracking = 0;
    //   }
    //   return getBilled(finalDataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalBilled = result;
    //   } else {
    //     totalBilled = 0;
    //   }
    //   return getNeedToBill(finalDataCount);
    // }).then(result => {
    //   if (result) {
    //     totalNeedToBilled = result;
    //   } else {
    //     totalNeedToBilled = 0;
    //   }
    //   return getLevelOneReject(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalL1Reject = result;
    //   } else {
    //     totalL1Reject = 0;
    //   }
    //   return getLevelTwoReject(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalL2Reject = result;
    //   } else {
    //     totalL2Reject = 0;
    //   }
    //   return getLevelOneInJob(dataCount);  //return getLevelTwoNoShow(dataCount);
    // })
    
    
    // .then(result => {
    //   if (result) {
    //     totalLOneInJob = result;
    //   } else {
    //     totalLOneInJob = 0;
    //   }
    //   return getLevelOneExperienced(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLOneExperienced = result;
    //   } else {
    //     totalLOneExperienced = 0;
    //   }
    //   return getLevelOneFresher(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLOneFresher = result;
    //   } else {
    //     totalLOneFresher = 0;
    //   }
    //   return getLevelTwoInJob(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLtwoInJob = result;
    //   } else {
    //     totalLtwoInJob = 0;
    //   }
    //   return getLevelTwoExperienced(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLtwoExperienced = result;
    //   } else {
    //     totalLtwoExperienced = 0;
    //   }
    //   return getLevelTwoFresher(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLTwoFresher = result;
    //   } else {
    //     totalLTwoFresher = 0;
    //   }
    //   return getLevelTwoNoShow(dataCount); //return getLevelTwoNoShow(dataCount);
    // })
    
    
    // .then(result => {
    //   if (result) {
    //     totalL2NoShow = result;
    //   } else {
    //     totalL2NoShow = 0;
    //   }
    //   return getDocumentaionCheck(dataCount)
    // }).then(result => {
    //   if (result) {
    //     totalDocumentation = result;
    //   } else {
    //     totalDocumentation = 0;
    //   }
    //   return getOnTrainingStatus(dataCount)
    // }).then(result => {
    //   if (result) {
    //     totalTraining = result;
    //   } else {
    //     totalTraining = 0;
    //   }
    //   return getLevelOneWithdrawn(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLevelOneWd = result;
    //   } else {
    //     totalLevelOneWd = 0;
    //   }
    //   return getLevelTwoWithdrawn(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totatLevelTwoWd = result;
    //   } else {
    //     totatLevelTwoWd = 0;
    //   }
    //   return getLevelOneDND(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLevelOneDnd = result;
    //   } else {
    //     totalLevelOneDnd = 0;
    //   }
    //   return getLevelTwoDND(dataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalLevelTwoDnd = result;
    //   } else {
    //     totalLevelTwoDnd = 0;
    //   }
    //   return getLevelTwoInProcessI(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalInProcessI = result;
    //   } else
    //     totalInProcessI = 0;

    //   return getWrongNumber(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalWrongNumber = result
    //   }
    //   else {
    //     totalWrongNumber = 0
    //   }

    //   return getWrongNumberLevelTwo(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalWrongNumberLevelTwo = result
    //   } else {
    //     totalWrongNumberLevelTwo = 0
    //   }
    //   return getInternshipJoined(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalInternshipJoined = result
    //   } else {
    //     totalInternshipJoined = 0
    //   }
    //   return getInternshipDrop(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalInternshipDrop = result
    //   } else {
    //     totalInternshipDrop = 0
    //   }
    //   return getInternshipInProcess(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalInternshipInProcess = result
    //   } else {
    //     totalInternshipInProcess = 0
    //   }
    //   return getL1BlackList(dataCount)
    // }).then(result => { 
    //   if (result) {
    //     totalLOneBlackList = result
    //   }
    //   else {
    //     totalLOneBlackList = 0
    //   }
    //   return getL2BlackList(dataCount);
    // }).then(result => { 
    //   if (result) {
    //     totalLTwoBlackList = result
    //   }
    //   else {
    //     totalLTwoBlackList = 0
    //   }
    //   return getLevelTwoFinalFeedback(dataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalFinalFeedback = result;
    //   } else
    //     totalFinalFeedback = 0;
    //   return getSVVR_CLOSED(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalSvvrClosed = result;
    //   } else
    //     totalSvvrClosed = 0;

    //   return getSVVR_IN_PROCESS(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalSvvrInProcess = result;
    //   } else
    //     totalSvvrInProcess = 0;

    //   if (userType === "ADMIN") {
    //     return getFreshCandidateCount()
    //   } else {
    //     return getFreshCandidateCountForAssignment(req.session.userId)
    //   }
    // }).then(result => {


    //   if (result) {
    //     if (result instanceof Array) {
    //       totalFreshCandidateCount = 0;
    //       for (let src of result) {
    //         totalFreshCandidateCount++;
    //       }
    //     }
    //     else if (result instanceof String)
    //       totalFreshCandidateCount = 1;
    //   }
    //   else
    //     totalFreshCandidateCount = 0;

    //   return getAwaitJoin(dataCount);

    // })
    // .then(result => {

    //   if (result) {
    //     if (result instanceof Array) {
    //       totalAwaitJoin = 0;
    //       for (let src of result) {
    //         totalAwaitJoin++;
    //       }
    //     }
    //     else
    //       totalAwaitJoin = 0;
    //   } else
    //     totalAwaitJoin = 0;
    //   return getExpanelled();
    // }).then(result => { 
    //   if (result)
    //     totalExpelledCompany = result;
    //   return getInApproach();
    // }).then(result => {
    //   if (result)
    //     totalNeedToApproachCompany = result;
    //   return inProcess();
    // }).then(result => {
    //   if (result)
    //     totalInProcessCompany = result;
    //   return inFuture();
    // })
    .then(result => {
      if (result)
        totalFutureCompany = result;
      return notInterested();
    }).then(result => {
      if (result)
        totalNotInterestedCompany = result;

      req.session.dataCount = dataCount;
      req.session.finalDataCount = finalDataCount;

      req.session.totalNotInterestedCompany = totalNotInterestedCompany;
      req.session.totalFutureCompany = totalFutureCompany;
      req.session.totalInProcessCompany = totalInProcessCompany;
      req.session.totalNeedToApproachCompany = totalNeedToApproachCompany;
      req.session.totalExpelledCompany = totalExpelledCompany;

      console.log("**************",finalDataCount, "*************************");


      if (userType === "ADMIN" || userType === "TEAM_LEADER" || userType === "SUPERVISIOR" || userType === "MANAGER") {

        res.render("includes/teamLeadIndex", {
          pageTitle: "Welcome to Dashboard",
          user: user.dataValues.recruiterType,
          userId: user.dataValues.id,
          path: "/includes/teamLeadIndex",
          assignTask: countValue,
          taskCompleted: taskCompleted,
          candidate: totalCandidate,
          employee: totalEmployee,
          groupReject: totalGroupDiscussionReject,
          totalTypingReject: totalTypingReject,
          totalVersantReject: totalVersantReject,
          totalGATReject: totalGATReject,
          totalAMCATReject: totalAMCATReject,
          totalInProcess: totalInProcess,
          totalHold: totalHold,
          totalNoShow: totalNoShow,
          totalOpsReject: totalOpsReject,
          totalClientReject: totalClientReject,
          totalSelected: totalSelected,
          totalInProcessI: totalInProcessI,
          totalFinalFeedback: totalFinalFeedback,
          totalOfferDrop: totalOfferDrop,
          totalNeedToBilled: totalNeedToBilled,
          totalBilled: totalBilled,
          totalTracking: totalTracking,
          totalGetFSRReject: totalGetFSRReject,
          totalNonTenure: totalNonTenure,
          totalL1Reject: totalL1Reject,
          totalL2Reject: totalL2Reject,
          totalL2NoShow: totalL2NoShow,
          totalDocumentation: totalDocumentation,
          totalTraining: totalTraining,
          totalLevelTwoCount: totalLevelTwoCount,
          totatLevelTwoWd: totatLevelTwoWd,
          totalLevelOneWd: totalLevelOneWd,
          totalLevelOneDnd: totalLevelOneDnd,
          totalLevelTwoDnd: totalLevelTwoDnd,
          totalAwaitJoin: totalAwaitJoin,
          totalSvvrInProcess: totalSvvrInProcess,
          totalSvvrClosed: totalSvvrClosed,
          dataCount: dataCount,
          finalDataCount: finalDataCount,
          totalWrongNumber: totalWrongNumber,
          totalWrongNumberLevelTwo: totalWrongNumberLevelTwo,
          totalInternshipJoined: totalInternshipJoined,
          totalInternshipDrop: totalInternshipDrop,
          totalInternshipInProcess: totalInternshipInProcess,
          totalInterScheduleTelephonic: totalInterScheduleTelephonic,
          totalFreshCandidateCount: totalFreshCandidateCount,
          totalLOneInJob: totalLOneInJob,
          totalLOneExperienced: totalLOneExperienced,
          totalLOneFresher: totalLOneFresher,
          totalLtwoInJob: totalLtwoInJob,
          totalLtwoExperienced: totalLtwoExperienced,
          totalLTwoFresher: totalLTwoFresher,
          totalTrainAndHired: totalTrainAndHired,
          totalLOneBlackList: totalLOneBlackList,
          totalLTwoBlackList: totalLTwoBlackList,
          totalRampdown: totalRampdown,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      } else {
        console.log(userType, res)
        res.render("includes/recruiter", {
          pageTitle: "Welcome to Dashboard",
          user: user.dataValues.recruiterType,
          userId: user.dataValues.id,
          path: "/includes/recruiter",
          assignTask: countValue,
          taskCompleted: taskCompleted,
          candidate: totalCandidate,
          employee: totalEmployee,
          groupReject: totalGroupDiscussionReject,
          totalTypingReject: totalTypingReject,
          totalVersantReject: totalVersantReject,
          totalGATReject: totalGATReject,
          totalAMCATReject: totalAMCATReject,
          totalInProcess: totalInProcess,
          totalHold: totalHold,
          totalNoShow: totalNoShow,
          totalInProcessI: totalInProcessI,
          totalFinalFeedback: totalFinalFeedback,
          totalOpsReject: totalOpsReject,
          totalClientReject: totalClientReject,
          totalSelected: totalSelected,
          totalOfferDrop: totalOfferDrop,
          totalNeedToBilled: totalNeedToBilled,
          totalBilled: totalBilled,
          totalTracking: totalTracking,
          totalGetFSRReject: totalGetFSRReject,
          totalNonTenure: totalNonTenure,
          totalL1Reject: totalL1Reject,
          totalL2Reject: totalL2Reject,
          totalL2NoShow: totalL2NoShow,
          totalDocumentation: totalDocumentation,
          totalTraining: totalTraining,
          totalLevelTwoCount: totalLevelTwoCount,
          totatLevelTwoWd: totatLevelTwoWd,
          totalLevelOneWd: totalLevelOneWd,
          totalLevelOneDnd: totalLevelOneDnd,
          totalLevelTwoDnd: totalLevelTwoDnd,
          totalAwaitJoin: totalAwaitJoin,
          totalSvvrInProcess: totalSvvrInProcess,
          totalSvvrClosed: totalSvvrClosed,
          dataCount: dataCount,
          finalDataCount: finalDataCount,
          totalWrongNumber: totalWrongNumber,
          totalWrongNumberLevelTwo: totalWrongNumberLevelTwo,
          totalInternshipJoined: totalInternshipJoined,
          totalInternshipDrop: totalInternshipDrop,
          totalInternshipInProcess: totalInternshipInProcess,
          totalInterScheduleTelephonic: totalInterScheduleTelephonic,
          totalFreshCandidateCount: totalFreshCandidateCount,
          totalLOneInJob: totalLOneInJob,
          totalLOneExperienced: totalLOneExperienced,
          totalLOneFresher: totalLOneFresher,
          totalLtwoInJob: totalLtwoInJob,
          totalLtwoExperienced: totalLtwoExperienced,
          totalLTwoFresher: totalLTwoFresher,
          totalTrainAndHired: totalTrainAndHired,
          totalLOneBlackList: totalLOneBlackList,
          totalLTwoBlackList: totalLTwoBlackList,
          totalRampdown: totalRampdown,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      }
    })
    .catch((err) => {
      fs.appendFile('login.txt', "Error: " + err, function (error) {
        if (error) throw error;
          res.redirect("/");
      });
    });
};

exports.getIndexPage = (req, res, next) => {
  let userType = req.session.user;
  let userId = req.session.userId;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    totalEmployee = 0,
    totalL2Reject = 0,
    totalL1Reject = 0,
    totalL2NoShow = 0,
    totalGroupDiscussionReject = 0,
    totalTypingReject = 0,
    totalVersantReject = 0,
    totalGATReject = 0,
    totalAMCATReject = 0,
    totalInProcess = 0,
    totalHold = 0,
    totalNoShow = 0,
    totalOpsReject = 0,
    totalClientReject = 0,
    totalSelected = 0,
    totalOfferDrop = 0,
    totalGetFSRReject = 0,
    totalNonTenure = 0,
    totalTracking = 0,
    totalNeedToBilled = 0,
    totalBilled = 0,
    totalTraining = 0,
    totalDocumentation = 0,
    totalLevelTwoCount = 0,
    totatLevelTwoWd = 0,
    totalLevelOneWd = 0,
    totalLevelOneDnd = 0,
    totalLevelTwoDnd = 0,
    totalInProcessI = 0,
    totalFinalFeedback = 0,
    totalSvvrInProcess = 0,
    totalSvvrClosed = 0,
    totalWrongNumber = 0,
    totalWrongNumberLevelTwo = 0,
    totalInternshipJoined = 0,
    totalInternshipDrop = 0,
    totalInternshipInProcess = 0,
    totalInterScheduleTelephonic = 0,
    totalFreshCandidateCount = 0,
    totalAwaitJoin = 0,
    totalLOneInJob = 0,
    totalLOneExperienced = 0,
    totalLOneFresher = 0,
    totalLtwoInJob = 0,
    totalLtwoExperienced = 0,
    totalTrainAndHired = 0,
    totalLTwoFresher = 0,
    totalLOneBlackList = 0,
    totalLTwoBlackList = 0,
    totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0,
    totalRampdown = 0;


  var data, dataIds = [];
  var dataCount = [0],
    finalDataCount = [];

  if (userType === "ADMIN") {
    data = getTaskforAdmin();
  } else if (userType !== "ADMIN") {
    data = getIdForRecruiter(req.session.userId);
  }


  data
    .then(result => {
      if (result) {
        if (userType === "ADMIN") {
          if (result instanceof Array) {
            for (let count of result) {
              if (dataCount.length === 0) {
                dataCount.push(count.dataValues.id)
              } else if (!dataCount.includes(count.dataValues.id)) {
                dataCount.push(count.dataValues.id)
              }
            }
          } else {
            dataCount.push[0];
          }
        } else {
          if (result instanceof Array) {
            for (let count of result) {
              if (dataCount.length === 0) {
                dataCount.push(count.dataValues.AssignCandidate)
              } else if (!dataCount.includes(count.dataValues.AssignCandidate)) {
                dataCount.push(count.dataValues.AssignCandidate)
              }
            }
          } else {
            dataCount.push[0];
          }
        }
      }
      return getTotalCandidate();
    }).then((result) => {
      if (result) {
        totalCandidate = result;
      } else {
        totalCandidate = 0;
      }
      return getTotalEmployee();

    })
    // .then((result) => {

    //   if (result) {
    //     totalEmployee = result;
    //   } else {
    //     totalEmployee = 0;
    //   }
    //   return getGroupDiscussionReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalGroupDiscussionReject = result;
    //   } else {
    //     totalGroupDiscussionReject = 0;
    //   }
    //   return getFSRReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalGetFSRReject = result;
    //   } else {
    //     totalGetFSRReject = 0;
    //   }
    //   return getTYPINGReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalTypingReject = result;
    //   } else {
    //     totalTypingReject = 0;
    //   }
    //   return getVERSANTReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalVersantReject = result;
    //   } else {
    //     totalVersantReject = 0;
    //   }
    //   return getGATReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalGATReject = result;
    //   } else {
    //     totalGATReject = 0;
    //   }
    //   return getOnTelInterviewSchedule(dataCount);
    // }).then(result => {
    //   console.log(result);
    //   if (result) {
    //     totalInterScheduleTelephonic = result;
    //   } else {
    //     totalInterScheduleTelephonic = 0;
    //   }
    //   return getAMCATReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalAMCATReject = result;
    //   } else {
    //     totalAMCATReject = 0;
    //   }
    //   return getIN_PROCESS(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalInProcess = result;
    //   } else {
    //     totalInProcess = 0;
    //   }
    //   return getTrainAndHired(dataCount);
    // }).then(result => {
    //       if (result) {
    //         totalTrainAndHired = result;
    //       } else {
    //         totalTrainAndHired = 0;
    //       }
    //      return getHOLD(dataCount); 
    // })
    // .then((result) => {
    //   if (result) {
    //     totalHold = result;
    //   } else {
    //     totalHold = 0;
    //   }
    //   return getNO_SHOW(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalNoShow = result;
    //   } else {
    //     totalNoShow = 0;
    //   }
    //   return getCLIENTReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalClientReject = result;
    //   } else {
    //     totalClientReject = 0;
    //   }
    //   return getOPSReject(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalOpsReject = result;
    //   } else {
    //     totalOpsReject = 0;
    //   }
    //   return getSELECTED(dataCount);
    // })
    // .then((result) => {
    //   if (result) {
    //     totalSelected = result;
    //   } else {
    //     totalSelected = 0;
    //   }
    //   return getOFFER_DROP(dataCount)
    // })
    // .then(result => {

    //   if (result) {
    //     totalOfferDrop = result;
    //   } else {
    //     totalOfferDrop = 0;
    //   }
    //   return getLevelTwo(dataCount)
    // })
    // .then(result => {
    //   if (result) {
    //     for (let id of result) {
    //       totalLevelTwoCount++;
    //     }
    //   } else {
    //     totalLevelTwoCount = 0;
    //   }
    //   return getFinalAssessmentId(dataCount);
    // })

    // .then(result => {

    //   if (result) {
    //     if (result instanceof Array) {
    //       for (let count of result) {
    //         if (finalDataCount.length === 0) {
    //           finalDataCount.push(count.dataValues.id)
    //         } else if (!finalDataCount.includes(count.dataValues.id)) {
    //           finalDataCount.push(count.dataValues.id)
    //         }
    //       }
    //     } else if (result instanceof String) {
    //       finalDataCount.push[count.dataValues.id];
    //     }

    //   } else {
    //     finalDataCount.push[0];
    //   }
    //   return getNonTenure(finalDataCount); //dataCount   //return getNonTenure()
    // })
    // .then(result => {
    //   if (result) {
    //     totalNonTenure = result;
    //   } else {
    //     totalNonTenure = 0;
    //   }
    //   return getRampDown(finalDataCount);// return getTenure(finalDataCount);
    // }).then(result => {
    //   if (result) {
    //     totalRampdown = result;
    //   } else {
    //     totalRampdown = 0;
    //   }
    //   return getTenure(finalDataCount);
    // }).then(result => {
    //   if (result) {
    //     totalTracking = result;
    //   } else {
    //     totalTracking = 0;
    //   }
    //   return getBilled(finalDataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalBilled = result;
    //   } else {
    //     totalBilled = 0;
    //   }
    //   return getNeedToBill(finalDataCount);
    // }).then(result => {
    //   if (result) {
    //     totalNeedToBilled = result;
    //   } else {
    //     totalNeedToBilled = 0;
    //   }
    //   return getLevelOneReject(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalL1Reject = result;
    //   } else {
    //     totalL1Reject = 0;
    //   }
    //   return getLevelTwoReject(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalL2Reject = result;
    //   } else {
    //     totalL2Reject = 0;
    //   }
    //   return getLevelOneInJob(dataCount);
    // })
    
    // .then(result => {
    //   if (result) {
    //     totalLOneInJob = result;
    //   } else {
    //     totalLOneInJob = 0;
    //   }
    //   return getLevelOneExperienced(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLOneExperienced = result;
    //   } else {
    //     totalLOneExperienced = 0;
    //   }
    //   return getLevelOneFresher(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLOneFresher = result;
    //   } else {
    //     totalLOneFresher = 0;
    //   }
    //   return getLevelTwoInJob(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLtwoInJob = result;
    //   } else {
    //     totalLtwoInJob = 0;
    //   }
    //   return getLevelTwoExperienced(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLtwoExperienced = result;
    //   } else {
    //     totalLtwoExperienced = 0;
    //   }
    //   return getLevelTwoFresher(dataCount);  //return getLevelTwoNoShow(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLTwoFresher = result;
    //   } else {
    //     totalLTwoFresher = 0;
    //   }
    //   return getLevelTwoNoShow(dataCount); //return getLevelTwoNoShow(dataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalL2NoShow = result;
    //   } else {
    //     totalL2NoShow = 0;
    //   }
    //   return getDocumentaionCheck(dataCount)
    // }).then(result => {
    //   if (result) {
    //     totalDocumentation = result;
    //   } else {
    //     totalDocumentation = 0;
    //   }
    //   return getOnTrainingStatus(dataCount)
    // }).then(result => {
    //   if (result) {
    //     totalTraining = result;
    //   } else {
    //     totalTraining = 0;
    //   }
    //   return getLevelOneWithdrawn(dataCount)
    // })
    // .then(result => {
    //   if (result) {
    //     totalLevelOneWd = result;
    //   } else {
    //     totalLevelOneWd = 0;
    //   }
    //   return getLevelTwoWithdrawn(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totatLevelTwoWd = result;
    //   } else {
    //     totatLevelTwoWd = 0;
    //   }
    //   return getLevelOneDND(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLevelOneDnd = result;
    //   } else {
    //     totalLevelOneDnd = 0;
    //   }
    //   return getLevelTwoDND(dataCount);
    // })
    // .then(result => {
    //   if (result) {
    //     totalLevelTwoDnd = result;
    //   } else {
    //     totalLevelTwoDnd = 0;
    //   }
    //   return getL1BlackList(dataCount)
    // }).then(result => {
    //   if (result) {
    //     totalLOneBlackList = result
    //   }
    //   else {
    //     totalLOneBlackList = 0
    //   }
    //   return getL2BlackList(dataCount);
    // }).then(result => {
    //   if (result) {
    //     totalLTwoBlackList = result
    //   }
    //   else {
    //     totalLTwoBlackList = 0
    //   }
    //   return getLevelTwoInProcessI(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalInProcessI = result;
    //   } else
    //     totalInProcessI = 0;

    //   return getWrongNumber(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalWrongNumber = result
    //   }
    //   else {
    //     totalWrongNumber = 0
    //   }
    //   return getWrongNumberLevelTwo(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalWrongNumberLevelTwo = result
    //   }
    //   else {
    //     totalWrongNumberLevelTwo = 0
    //   }
    //   return getInternshipJoined(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalInternshipJoined = result
    //   } else {
    //     totalInternshipJoined = 0
    //   }
    //   return getInternshipDrop(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalInternshipDrop = result
    //   } else {
    //     totalInternshipDrop = 0
    //   }
    //   return getInternshipInProcess(dataCount);

    // }).then(result => {

    //   if (result) {
    //     totalInternshipInProcess = result
    //   } else {
    //     totalInternshipInProcess = 0
    //   }
    //   return getLevelTwoFinalFeedback(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalFinalFeedback = result;

    //   } else
    //     totalFinalFeedback = 0;

    //   return getSVVR_CLOSED(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalSvvrClosed = result;
    //   } else
    //     totalSvvrClosed = 0;

    //   return getSVVR_IN_PROCESS(dataCount);
    // }).then(result => {

    //   if (result) {
    //     totalSvvrInProcess = result;
    //   } else
    //     totalSvvrInProcess = 0;
    //   if (userType === "ADMIN") {
    //     return getFreshCandidateCount()
    //   } else {
    //     return getFreshCandidateCountForAssignment(req.session.userId)
    //   }
    // })
    // .then(result => {
    //   if (result) {
    //     if (result instanceof Array) {
    //       totalFreshCandidateCount = 0;
    //       for (let src of result) {
    //         totalFreshCandidateCount++;
    //       }
    //     }
    //     else if (result instanceof String)
    //       totalFreshCandidateCount = 1;
    //   }
    //   else
    //     totalFreshCandidateCount = 0;
    //   return getAwaitJoin(dataCount);

    // })
    .then(result => {
      if (result) {
        if (result instanceof Array) {
          totalAwaitJoin = 0;
          for (let src of result) {
            totalAwaitJoin++;
          }
        }
        else if (result instanceof String)
          totalAwaitJoin = 1;
      }
      else
        totalAwaitJoin = 0;
      return getExpanelled();
    }).then(result => {
      if (result)
        totalExpelledCompany = result;
      return getInApproach();
    }).then(result => {
      if (result)
        totalNeedToApproachCompany = result;
      return inProcess();
    }).then(result => {
      if (result)
        totalInProcessCompany = result;
      return inFuture();
    }).then(result => {
      if (result)
        totalFutureCompany = result;
      return notInterested();
    }).then(result => {
      if (result)
        totalNotInterestedCompany = result;

      // req.session.dataCount = dataCount;
      // req.session.finalDataCount = finalDataCount;

      console.log("**************",finalDataCount, "*************************");


      if (userType === "ADMIN" || userType === "TEAM_LEADER" || userType === "SUPERVISIOR" || userType === "MANAGER") {

        res.render("includes/teamLeadIndex", {
          pageTitle: "Welcome to Dashboard",
          user: userType,
          userId: userId,
          path: "/includes/teamLeadIndex",
          assignTask: countValue,
          totalDocumentation: totalDocumentation,
          totalTraining: totalTraining,
          taskCompleted: taskCompleted,
          candidate: totalCandidate,
          totalSvvrInProcess: totalSvvrInProcess,
          totalSvvrClosed: totalSvvrClosed,
          employee: totalEmployee,
          totalL2NoShow: totalL2NoShow,
          groupReject: totalGroupDiscussionReject,
          totalTypingReject: totalTypingReject,
          totalVersantReject: totalVersantReject,
          totalGATReject: totalGATReject,
          totalAMCATReject: totalAMCATReject,
          totalInProcess: totalInProcess, //Nono of use
          totalHold: totalHold,
          totalInProcessI: totalInProcessI,
          totalFinalFeedback: totalFinalFeedback,
          totalNoShow: totalNoShow,
          totalOpsReject: totalOpsReject,
          totalClientReject: totalClientReject,
          totalNeedToBilled: totalNeedToBilled,
          totalBilled: totalBilled,
          totalTracking: totalTracking,
          totalSelected: totalSelected,
          totalOfferDrop: totalOfferDrop,
          totalGetFSRReject: totalGetFSRReject,
          totalNonTenure: totalNonTenure,
          totalL2Reject: totalL2Reject,
          totalL1Reject: totalL1Reject,
          totalLevelTwoCount: totalLevelTwoCount,
          totatLevelTwoWd: totatLevelTwoWd,
          totalLevelOneWd: totalLevelOneWd,
          totalLevelOneDnd: totalLevelOneDnd,
          totalLevelTwoDnd: totalLevelTwoDnd,
          totalAwaitJoin: totalAwaitJoin,
          totalWrongNumberLevelTwo: totalWrongNumberLevelTwo,
          totalInternshipJoined: totalInternshipJoined,
          totalInternshipDrop: totalInternshipDrop,
          totalInternshipInProcess: totalInternshipInProcess,
          dataCount: dataCount,
          finalDataCount: finalDataCount,
          totalWrongNumber: totalWrongNumber,
          totalInterScheduleTelephonic: totalInterScheduleTelephonic,
          totalFreshCandidateCount: totalFreshCandidateCount,
          totalLOneInJob: totalLOneInJob,
          totalLOneExperienced: totalLOneExperienced,
          totalLOneFresher: totalLOneFresher,
          totalLtwoInJob: totalLtwoInJob,
          totalLtwoExperienced: totalLtwoExperienced,
          totalLTwoFresher: totalLTwoFresher,
          totalTrainAndHired: totalTrainAndHired,
          totalLOneBlackList: totalLOneBlackList,
          totalLTwoBlackList: totalLTwoBlackList,
          totalRampdown: totalRampdown,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      }
      else {
        res.render("includes/recruiter", {
          pageTitle: "Welcome to Dashboard",
          user: userType,
          userId: userId,
          path: "/includes/recruiter",
          assignTask: countValue,
          totalDocumentation: totalDocumentation,
          totalTraining: totalTraining,
          taskCompleted: taskCompleted,
          candidate: totalCandidate,
          employee: totalEmployee,
          totalL2NoShow: totalL2NoShow,
          totalSvvrInProcess: totalSvvrInProcess,
          totalSvvrClosed: totalSvvrClosed,
          groupReject: totalGroupDiscussionReject,
          totalTypingReject: totalTypingReject,
          totalVersantReject: totalVersantReject,
          totalGATReject: totalGATReject,
          totalAMCATReject: totalAMCATReject,
          totalInProcess: totalInProcess, //Nono of use
          totalHold: totalHold,
          totalInProcessI: totalInProcessI,
          totalFinalFeedback: totalFinalFeedback,
          totalNoShow: totalNoShow,
          totalOpsReject: totalOpsReject,
          totalClientReject: totalClientReject,
          totalNeedToBilled: totalNeedToBilled,
          totalBilled: totalBilled,
          totalTracking: totalTracking,
          totalSelected: totalSelected,
          totalOfferDrop: totalOfferDrop,
          totalGetFSRReject: totalGetFSRReject,
          totalNonTenure: totalNonTenure,
          totalL2Reject: totalL2Reject,
          totalL1Reject: totalL1Reject,
          totalLevelTwoCount: totalLevelTwoCount,
          totatLevelTwoWd: totatLevelTwoWd,
          totalLevelOneWd: totalLevelOneWd,
          totalLevelOneDnd: totalLevelOneDnd,
          totalLevelTwoDnd: totalLevelTwoDnd,
          totalAwaitJoin: totalAwaitJoin,
          dataCount: dataCount,
          finalDataCount: finalDataCount,
          totalWrongNumber: totalWrongNumber,
          totalWrongNumberLevelTwo: totalWrongNumberLevelTwo,
          totalInternshipJoined: totalInternshipJoined,
          totalInternshipDrop: totalInternshipDrop,
          totalInternshipInProcess: totalInternshipInProcess,
          totalInterScheduleTelephonic: totalInterScheduleTelephonic,
          totalFreshCandidateCount: totalFreshCandidateCount,
          totalLOneInJob: totalLOneInJob,
          totalLOneExperienced: totalLOneExperienced,
          totalLOneFresher: totalLOneFresher,
          totalLtwoInJob: totalLtwoInJob,
          totalLtwoExperienced: totalLtwoExperienced,
          totalLTwoFresher: totalLTwoFresher,
          totalTrainAndHired: totalTrainAndHired,
          totalLOneBlackList: totalLOneBlackList,
          totalLTwoBlackList: totalLTwoBlackList,
          totalRampdown: totalRampdown,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      }

    })
    .catch((err) => {
      console.log(err, "LOGIN ERR");
      res.redirect("/");
    });
};

async function getLocationList() {
  const location = await db.locationCityData.findAll({
    attributes: ["locationCity"],
  });
  return location;
}

async function getGroupDiscussionReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "GROUP_DISCUSSION",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getFSRReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "FSR",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getTYPINGReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "TYPING",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getVERSANTReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "VERSANT",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getGATReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "GAT",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getOFFER_DROP(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "OFFER_DROP",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getDocumentaionCheck(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      documentCheck: "PENDING",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getOnTrainingStatus(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      trainingStatus: "PENDING",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getOnTelInterviewSchedule(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: ["AMCAT(TEL)", "TELEPHONIC"],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getAMCATReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: ["AMCAT", "AMCAT_COOLING"],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getIN_PROCESS(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
        "HR(P)", "AMCAT(P)", "GROUP_DISCUSSION(P)", "JAM(P)", "VERSANT(P)", "OPS(P)",
        "CLIENT(P)", "TYPING(P)", "GAT(P)", "ONLINE_TEST(P)", "MEDICAL(P)", "WRITTEN_TEST(P)",
        "CODING(P)", "TECHNICAL(P)"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}


async function getTrainAndHired(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
         "PRE_ASSESSMENT(P)", "MID_ASSESSMENT(P)", "POST_ASSESSMENT(P)"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getSVVR_CLOSED(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
        "SVVR:DONE", "SVVR:NI"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getSVVR_IN_PROCESS(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
        "SVVR:SEND EMAIL", "SVVR:MAIL CONFIRMATION", "SVVR:AWAITING ONBOARDING", "SVVR:L3 CHECK",
        "SVVR:TRAINING", "SVVR:ADD TO GROUP", "SVVR:LOGIN CREATION"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getHOLD(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "HOLD",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getNO_SHOW(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "NO_SHOW",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getCLIENTReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "CLIENT",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getOPSReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "OPS",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getSELECTED(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
        "CLIENT_VENUE", "TPP_VENUE"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getLevelTwo(dataCount) {
  return db.sequelize.query(`
  SELECT * FROM JobSeekerLevelOneAssessments
  LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
  ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId)
  where
  JobSeekerLevelOneAssessments.levelOneId IN (` + dataCount + `) AND 
  (JobSeekerLevelOneAssessments.Assessment = 'good'
  OR JobSeekerLevelOneAssessments.Assessment = 'tac')
  AND(JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'good'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'tac'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'other_client'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'number_not_reachable'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'did_not_pick'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'wrong_number'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'call_back'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'wd'

  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_in_job'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_experienced'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_convincing'

  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'no_show'
  OR JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL)
  `, {
    type: db.Sequelize.QueryTypes.SELECT
  });

}

async function getFreshCandidateCount() {
  return db.sequelize.query(`
  SELECT *
 FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments
 ON (JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id)
 LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
 ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
 where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
 JobSeekerLevelOneAssessments.Assessment IS NULL
  `, {
    type: db.Sequelize.QueryTypes.SELECT
  });
}


async function getFreshCandidateCountForAssignment(id) {
  return db.sequelize.query(`
  SELECT * from AssignCandidateTables WHERE AssignCandidateTables.QuestionerID = `+ id + `
  AND AssignCandidateTables.AssignCandidate IN (SELECT DISTINCT(JobSeekerEnrollmentPersonalData.id)
  FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments ON
  (JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id) LEFT JOIN
  JobSeekerLevelTwoAssessmentExpandLevels ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
   where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
   JobSeekerLevelOneAssessments.Assessment IS NULL)
  `, {
    type: db.Sequelize.QueryTypes.SELECT
  });
}


async function getIds(value, user) {

  if (user === 'ADMIN') {
    return;
  } else if (user === 'MANAGER') {
    return;
  } else {

    return db.managerCount.findOne({
      where: {
        managersId: +value,
      },
      attributes: ["managerID"],
    });
  }

}

async function getIdForRecruiter(id) {
  return await db.assignCandidate.findAll({
    where: {
      QuestionerID: id,
    },
    attributes: ["AssignCandidate"],
  });
}



async function getAwaitJoin(dataCount) {

  return db.sequelize.query(`
  SELECT * FROM JobSeekerLevelTwoAssessmentExpandLevels
  LEFT OUTER JOIN JobSeekerLevelFinalAssessments
  ON JobSeekerLevelTwoAssessmentExpandLevels.id = JobSeekerLevelFinalAssessments.FinalAssessmentId
  WHERE JobSeekerLevelTwoAssessmentExpandLevels.InterviewStatus IN ('SELECTED')
  AND JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId
  IN(` + dataCount + `)
  AND(JobSeekerLevelFinalAssessments.BilingStatus NOT IN('NON_TENURE', 'TRACKING','NEED_TO_BILL','BILLED','RAMPDOWN') 
  OR JobSeekerLevelFinalAssessments.BilingStatus IS NULL)`, {
    type: db.Sequelize.QueryTypes.SELECT
  });


}

async function getLevelTwoWithdrawn(dataCount) {

  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: ['wd'],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getLevelOneWithdrawn(dataCount) {

  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: ['wd'],
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}

async function getLevelTwoDND(dataCount) {

  return db.jobSeekerEnrollment.count({
    include: [
      {
        model: db.jobSeekerLeveloneAssesssment,
        where: {
          Assessment: {
          [db.Op.not]: ["other_client", "number_not_reachable", "did_not_pick", "call_back"]
          },
          levelOneId: {
            [db.Op.in]: dataCount
          }

        }
      },
      {
        model: db.jobSeekerLeveltwoExpandedAssesssment,
        where: {
          Assessment: ["number_not_reachable", "did_not_pick", "call_back"],
          leveltwoId: {
            [db.Op.in]: dataCount
          }
        }
      }],
  });
}

async function getLevelOneDND(dataCount) {

  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: ["number_not_reachable", "did_not_pick", "call_back"],
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}

async function getLevelTwoReject(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'other_client',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getLevelTwoNoShow(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: 'NO_SHOW_LINE_UP',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}


async function getLevelTwoInJob(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'ni_in_job',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}


async function getLevelTwoExperienced(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'ni_experienced',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}


async function getLevelTwoFresher(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'ni_convincing',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}




async function getLevelTwoFinalFeedback(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: 'FINAL_FEEDBACK',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getLevelTwoInProcessI(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: [
        "HR(P)", "AMCAT(P)", "GROUP_DISCUSSION(P)", "JAM(P)", "VERSANT(P)", "OPS(P)",
        "CLIENT(P)", "TYPING(P)", "GAT(P)", "ONLINE_TEST(P)", "MEDICAL(P)", "WRITTEN_TEST(P)",
        "CODING(P)", "TECHNICAL(P)"
        // , "PRE_ASSESSMENT(P)", "MID_ASSESSMENT(P)", "POST_ASSESSMENT(P)"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getLevelOneReject(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'other_client',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}


async function getLevelOneInJob(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'ni_in_job',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}


async function getLevelOneExperienced(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'ni_experienced',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}


async function getLevelOneFresher(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'ni_convincing',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["levelOneId"],
  });
}



async function getNonTenure(dataCount) {

  return db.jobSeekerLevelFinalAssesssment.count({
    where: {
      BilingStatus: 'NON_TENURE',
      FinalAssessmentId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["FinalAssessmentId"],
  });
}

async function getTenure(dataCount) {

  return db.jobSeekerLevelFinalAssesssment.count({
    where: {
      BilingStatus: 'TRACKING',
      FinalAssessmentId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["FinalAssessmentId"],
  });
}

async function getNeedToBill(dataCount) {

  return db.jobSeekerLevelFinalAssesssment.count({
    where: {
      BilingStatus: 'NEED_TO_BILL',
      FinalAssessmentId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["FinalAssessmentId"],
  });
}

async function getBilled(dataCount) {
  return db.jobSeekerLevelFinalAssesssment.count({
    where: {
      BilingStatus: 'BILLED',
      FinalAssessmentId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["FinalAssessmentId"],
  });
}

async function getTotalSelectedCandidateForFinalRound(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["id"],
  });
}

function getSource() {
  var Role = [];
  var keys = Object.keys(role);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

async function getAssignedTask(id) {
  return await db.assignCandidate.findAll({
    where: {
      QuestionerID: id,
      AssessmentStatus: "PENDING"
    },
    attributes: ["AssignCandidate"],
  });
}

async function getAssignedTaskforAdmin() {
  return await db.assignCandidate.findAll({
    where: {
      AssessmentStatus: "PENDING"
    },
    attributes: ["AssignCandidate"],
  });
}

async function getTaskforAdmin() {
  return await db.jobSeekerEnrollment.findAll({
    attributes: ["id"],
  });
}

async function comparePassword(password, pass) {
  return await bcrypt.compare(password, pass);
}

async function getTotalCandidate() {
  return await db.jobSeekerEnrollment.count();
}

async function getTotalEmployee() {
  return await db.employeeRegistration.count();
}

async function getFinalAssessmentId(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    include: [{
      model: db.jobSeekerLevelFinalAssesssment,
      required: true
    }],
    where: {
      leveltwoId: {
        [db.Op.in]: dataCount
      },
      InterviewStatus: 'SELECTED'

    },
    attributes: ["id", "leveltwoId"],
  });
}

async function getWrongNumber(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'wrong_number',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    }
  });
}

async function getWrongNumberLevelTwo(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'wrong_number',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    }
  });
}

async function getInternshipJoined(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "INTERNSHIP JOINED",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getInternshipDrop(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "INTERNSHIP DROP",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getInternshipInProcess(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      InterviewStatus: "INTERNSHIP IN PROCESS",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}

async function getRampDown(dataCount) {

  return db.jobSeekerLevelFinalAssesssment.count({
    where: {
      BilingStatus: 'RAMPDOWN',
      FinalAssessmentId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["FinalAssessmentId"],
  });
}

async function getL1BlackList(dataCount) {
  return db.jobSeekerLeveloneAssesssment.count({
    where: {
      Assessment: 'black_list',
      levelOneId: {
        [db.Op.in]: dataCount
      }
    }
  });
}

async function getL2BlackList(dataCount) {
  return db.jobSeekerLeveltwoExpandedAssesssment.count({
    where: {
      Assessment: 'black_list',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    // attributes: ["leveltwoId"],
  });
}


async function notInterested() {
  return db.companyName.count({
    where: {
      company_response: "NOT_INTERESTED",
    },
  });
}


async function inFuture() {
  return db.companyName.count({
    where: {
      company_response: "FUTURE",
    },
  });
}

async function inProcess() {
  return db.companyName.count({
    where: {
      company_response: "IN_PROCESS",
    },
  });
}

async function getInApproach() {
  return  db.companyName.count({
    where: {
      company_response: "NEED_TO_APPROACH",
    },
  });
}

async function getExpanelled() {
  return db.companyName.count({
    where: {
      company_response: "EMPANELLED",
    },
  });
}
