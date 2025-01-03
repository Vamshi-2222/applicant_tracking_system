const db = require("../config/config");
const Op = db.Op;
const readXlsxFile = require("read-excel-file/node");
var fs = require('fs');
const locationCityData = require("../config/config").locationCityData;
const jobSeekerPersonalInfo = require("../config/config").jobSeekerEnrollment;
const excel = require("exceljs");
const ITEM_PER_PAGE = 50;
var candidateID = 100000000;
var assignID = 1000000000;
const path = require("path");
const http = require('https');
const constant = require("../util/constant");
const {
  validationResult,
  matchedData
} = require("express-validator");
const {
  companyName,
  graduationCourse
} = require("../config/config");
const route = require("../routes/candidate");
const { json } = require("body-parser");
const { Blob } = require("buffer");
const { Console } = require("console");

exports.getFinalAssessment = (req, res, next) => {

  var dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(req.body, " ----- ", dataJson);

  var fortyfive_day_onboard, fifteen_day_onboard, thirty_day_onboard,
    sixty_day_onboard, seventyfive_day_onboard, ninety_day_onboard, onBoardingDate;

  var fortyfive_radio, fifteen_radio, thirty_radio,
    sixty_radio, seventyfive_radio, ninety_radio;

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  const userId = req.session.userId;
  const recruiter = req.body.recruiter;
  const candidateId = req.body.candidateId;
  const levelId = req.body.levelId;
  const courierremark = req.body.courierremark;
  const billremark = req.body.billremark;
  const billinStatus = req.body.billinStatus;
  const empid = req.body.empid;
  const remark = req.body.remark;
  const onBoardStatus = req.body.onBoardStatus;
  const finalId = req.body.finalId;

  if (onBoardStatus && onBoardStatus === 'DATE') {
    onBoardingDate = req.body.onBoardingDate;
    fifteen_day_onboard = req.body.fifteen_day_onboard;
    thirty_day_onboard = req.body.thirty_day_onboard;
    fortyfive_day_onboard = req.body.fortyfive_day_onboard;
    sixty_day_onboard = req.body.sixty_day_onboard;
    seventyfive_day_onboard = req.body.seventyfive_day_onboard;
    ninety_day_onboard = req.body.ninety_day_onboard;

    fortyfive_radio = req.body.fortyfive_radio;
    fifteen_radio = req.body.fifteen_radio;
    thirty_radio = req.body.thirty_radio;
    sixty_radio = req.body.sixty_radio;
    seventyfive_radio = req.body.seventyfive_radio;
    ninety_radio = req.body.ninety_radio;

  } else {
    onBoardingDate = new Date().toLocaleDateString();
    fifteen_day_onboard = new Date().toLocaleDateString();
    fortyfive_day_onboard = new Date().toLocaleDateString();
    sixty_day_onboard = new Date().toLocaleDateString();
    thirty_day_onboard = new Date().toLocaleDateString();
    seventyfive_day_onboard = new Date().toLocaleDateString();
    ninety_day_onboard = new Date().toLocaleDateString();

    fortyfive_radio = 'PENDING';
    fifteen_radio = "PENDING";
    thirty_radio = "PENDING";
    sixty_radio = "PENDING";
    seventyfive_radio = "PENDING";
    ninety_radio = "PENDING";

  }
  db.jobSeekerLevelFinalAssesssment.findByPk(finalId).then(result => { 
    if (result) {
      return db.jobSeekerLevelFinalAssesssment.update({
        Recruiter: recruiter,
        onBoardingSelect: onBoardingDate,
        onBoardingRemark: remark,
        EMPID: empid,
        BilingStatus: billinStatus,
        CourierDetail: courierremark,
        BillingRemark: billremark,
        addedBy: userId,
        FinalAssessmentId: levelId,
        onBoardingDateStatus: onBoardStatus,
        onFifteenBoardingDate: fifteen_day_onboard,
        onFifteenStatus: fifteen_radio,
        onThirtyBoardingDate: thirty_day_onboard,
        onThirtyStatus: thirty_radio,
        onFortyfiveBoardingDate: fortyfive_day_onboard,
        onFortyfiveStatus: fortyfive_radio,
        onSixtyBoardingDate: sixty_day_onboard,
        onSixtyStatus: sixty_radio,
        onSeventyFiveBoardingDate: seventyfive_day_onboard,
        onSeventyFiveStatus: seventyfive_radio,
        onNinetyBoardingDate: ninety_day_onboard,
        onNinetyStatus: ninety_radio

      }, {
        where: {
          id: finalId
        }
      })
    } else { 
      return db.jobSeekerLevelFinalAssesssment.create({
        Recruiter: recruiter,
        onBoardingSelect: onBoardingDate,
        onBoardingRemark: remark,
        EMPID: empid,
        BilingStatus: billinStatus,
        CourierDetail: courierremark,
        BillingRemark: billremark,
        addedBy: userId,
        FinalAssessmentId: levelId,
        onBoardingDateStatus: onBoardStatus,
        onFifteenBoardingDate: fifteen_day_onboard,
        onFifteenStatus: fifteen_radio,
        onThirtyBoardingDate: thirty_day_onboard,
        onThirtyStatus: thirty_radio,
        onFortyfiveBoardingDate: fortyfive_day_onboard,
        onFortyfiveStatus: fortyfive_radio,
        onSixtyBoardingDate: sixty_day_onboard,
        onSixtyStatus: sixty_radio,
        onSeventyFiveBoardingDate: seventyfive_day_onboard,
        onSeventyFiveStatus: seventyfive_radio,
        onNinetyBoardingDate: ninety_day_onboard,
        onNinetyStatus: ninety_radio

      })
    }
  }).then(result => {
      if (result) {
        console.log("INSERTED SUCCESSFULLY....");
        res.redirect('/candidate/getInterviewList/?page=1');
      }
  }).catch(error => {
      console.log(error);
      res.redirect('/login/index');
  })
  // if (finalId === '0') {
  //   db.jobSeekerLevelFinalAssesssment.create({
  //     Recruiter: recruiter,
  //     onBoardingSelect: onBoardingDate,
  //     onBoardingRemark: remark,
  //     EMPID: empid,
  //     BilingStatus: billinStatus,
  //     CourierDetail: courierremark,
  //     BillingRemark: billremark,
  //     addedBy: userId,
  //     FinalAssessmentId: levelId,
  //     onBoardingDateStatus: onBoardStatus,
  //     onFifteenBoardingDate: fifteen_day_onboard,
  //     onFifteenStatus: fifteen_radio,
  //     onThirtyBoardingDate: thirty_day_onboard,
  //     onThirtyStatus: thirty_radio,
  //     onFortyfiveBoardingDate: fortyfive_day_onboard,
  //     onFortyfiveStatus: fortyfive_radio,
  //     onSixtyBoardingDate: sixty_day_onboard,
  //     onSixtyStatus: sixty_radio,
  //     onSeventyFiveBoardingDate: seventyfive_day_onboard,
  //     onSeventyFiveStatus: seventyfive_radio,
  //     onNinetyBoardingDate: ninety_day_onboard,
  //     onNinetyStatus: ninety_radio

  //   }).then(result => {
  //     if (result) {
  //       console.log("INSERTED SUCCESSFULLY....");
  //       res.redirect('/candidate/getInterviewList/?page=1');
  //     }
  //   }).catch(error => {
  //     console.log(error);
  //     res.redirect('/login/index');
  //   })
  // } else {

  //   db.jobSeekerLevelFinalAssesssment.update({
  //     Recruiter: recruiter,
  //     onBoardingSelect: onBoardingDate,
  //     onBoardingRemark: remark,
  //     EMPID: empid,
  //     BilingStatus: billinStatus,
  //     CourierDetail: courierremark,
  //     BillingRemark: billremark,
  //     addedBy: userId,
  //     FinalAssessmentId: levelId,
  //     onBoardingDateStatus: onBoardStatus,
  //     onFifteenBoardingDate: fifteen_day_onboard,
  //     onFifteenStatus: fifteen_radio,
  //     onThirtyBoardingDate: thirty_day_onboard,
  //     onThirtyStatus: thirty_radio,
  //     onFortyfiveBoardingDate: fortyfive_day_onboard,
  //     onFortyfiveStatus: fortyfive_radio,
  //     onSixtyBoardingDate: sixty_day_onboard,
  //     onSixtyStatus: sixty_radio,
  //     onSeventyFiveBoardingDate: seventyfive_day_onboard,
  //     onSeventyFiveStatus: seventyfive_radio,
  //     onNinetyBoardingDate: ninety_day_onboard,
  //     onNinetyStatus: ninety_radio

  //   }, {
  //     where: {
  //       id: finalId
  //     }
  //   }).then(result => {
  //     if (result) {
  //       console.log("INSERTED SUCCESSFULLY....");
  //       res.redirect('/candidate/getInterviewList/?page=1');
  //     }
  //   }).catch(error => {
  //     console.log(error);
  //     res.redirect('/login/index');
  //   })

  // }

}

exports.newCandidateAdd = (req, res, next) => {

  var dataJson = JSON.parse(JSON.stringify(req.body));
  //console.log(req.body, " ---new-- ", dataJson);
  var dataTypes = "INTERNAL";

  var counter = 0;
  var mobiletwo = null,
    mobilethree = null,
    mobilefour = null,
    emailtwo = null,
    emailthree = null,
    emailfour = null;

  var skillSet = [];
  var newTableCandidateKey;

  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    languageCount = 0,
    totalEmployee = 0;

  var company1, companyIndustry1, companyRole1, startDate1, endDate1, salary1, companyCount;
  const experience = req.body.experiencestatus;
  var counter = 0;


  if (experience && experience === 'EXPERIENCE') {
    company1 = req.body.company1;
    companyIndustry1 = req.body.companyIndustry1;
    companyRole1 = req.body.companyRole1;
    startDate1 = (req.body.startDate1 && req.body.startDate1 !== '') ? req.body.startDate1 : null;
    endDate1 = (req.body.endDate1 && req.body.endDate1 !== '') ? req.body.endDate1 : null;
    salary1 = req.body.salary1;
    companyCount = (req.body.companyCount && req.body.companyCount !== '') ? req.body.companyCount : 0;
  } else {
    company1 = null;
    companyIndustry1 = null;
    companyRole1 = null;
    startDate1 = null;
    endDate1 = null;
    salary1 = null;
    companyCount = null;
  }
  const preferedIndustry1 = req.body.preferedIndustry1;
  const preferedIndustryJobRole1 = req.body.preferedIndustryJobRole1;
  const preferedJobType = req.body.preferedJobType;
  const preferedShift = req.body.preferedShift;
  const preferenceCount = (req.body.preferenceCount && req.body.preferenceCount !== '') ? req.body.preferenceCount : 0;

  const source = req.body.sourceData === '-1' ? null : req.body.sourceData;
  const reference = req.body.Reference ? req.body.Reference : null;
  const name = req.body.name ? req.body.name : null;
  const mobileone = req.body.mobileone;
  const emailone = req.body.emailone ? req.body.emailone : null;
  const homeLocation = req.body.homeLocation ? req.body.homeLocation : null;
  const currentLocation = req.body.currentLocation ? req.body.currentLocation : null;
  const birthday = req.body.birthday ? req.body.birthday : new Date().toISOString().substr(0, 10);
  const Address = req.body.Address ? req.body.Address : null;


  const class10 = req.body.class10 ? req.body.class10 : null;
  const class10Date = req.body.class10Date ? req.body.class10Date : null;
  const classP = req.body.classP ? req.body.classP : null;
  const classPDate = req.body.classPDate ? req.body.classPDate : null;
  const classG = req.body.classG ? req.body.classG : null;
  const classGDate = req.body.classGDate ? req.body.classGDate : null;
  const class12 = req.body.class12 ? req.body.class12 : null;
  const class12Date = req.body.class12Date ? req.body.class12Date : null;
  const certificateName = req.body.certificateName;
  const certificateNumber = req.body.certificateNumber;
  const typingspeed = req.body.typingspeed;
  //const candidateKey = req.body.candidateKey;
  const userData = req.session.user;
  const userID = req.session.userId;
  const accessLevel = req.session.accountAccess;



  var skillDataSet = req.body.preferedSkillset;
  skillSet = skillDataSet.split(",");

  for (var i = 0; i < skillSet.length; i++) {
    // Trim the excess whitespace.
    skillSet[i] = skillSet[i].replace(/^\s*/, "").replace(/\s*$/, "");
  }

  if (req.body.mobile2 && (req.body.mobile2 !== '' || req.body.mobile2 !== 'null'))
    mobiletwo = req.body.mobile2;


  if (req.body.mobile3 && (req.body.mobile3 !== '' || req.body.mobile3 !== 'null'))
    mobilethree = req.body.mobile3;


  if (req.body.mobile4 && (req.body.mobile1 !== '' || req.body.mobile1 !== 'null'))
    mobilefour = req.body.mobile1;


  if (req.body.email2 && (req.body.email2 !== '' || req.body.email2 !== 'null'))
    emailtwo = req.body.email2;


  if (req.body.email3 && (req.body.email3 !== '' || req.body.email3 !== 'null'))
    emailthree = req.body.email3;


  if (req.body.email4 && (req.body.email1 !== '' || req.body.email1 !== 'null'))
    emailfour = req.body.email1;


  const l1assessment = req.body.l1assessment;
  const client = !req.body.clients ? null : req.body.clients;
  const process = !req.body.processs ? null : req.body.processs;
  const startDate = !req.body.startDate ? null : req.body.startDate;
  const remarkDescription = !req.body.remarkDescription ?
    null :
    req.body.remarkDescription;


  const l2assessment = req.body.l2assessment;
  const clients = dataJson.client ? dataJson.client : null;
  const processs = dataJson.process ? dataJson.process : null;
  const startDates = dataJson.startDates ? dataJson.startDates : null;
  const remarkDescriptions = !req.body.remarkDescriptions ?
    null :
    req.body.remarkDescriptions;
  const docCheck = !req.body.docCheck ? null : req.body.docCheck;
  const trainingStatus = !req.body.trainingStatus ?
    null :
    req.body.trainingStatus;
  const InterviewStatus = !req.body.InterviewStatus ?
    null :
    req.body.InterviewStatus;
  const Interviewremark = !req.body.Interviewremark ?
    null :
    req.body.Interviewremark;

  var candidateKey, candidate;
  const candidateIdValue = getCandidateId();
  candidateIdValue
    .then((company) => {
      if (company === null || company.length === 0 || company === undefined) {
        candidateID++;
        candidate = "CAN" + candidateID;
      } else {
        var value = company[company.length - 1].dataValues.CandidateID;
        var valueCount = +value.replace("CAN", "");
        valueCount++;
        candidate = "CAN" + valueCount;
      }

      return jobSeekerPersonalInfo.create({
        source: source,
        reference: reference,
        fullName: name,
        datatype: dataTypes,
        CandidateID: candidate,
        phoneNumberOne: mobileone,
        phoneNumberTwo: mobiletwo,
        phoneNumberthree: mobilethree,
        phoneNumberfour: mobilefour,
        emailOne: emailone,
        emailTwo: emailtwo,
        emailThree: emailthree,
        emailFour: emailfour,
        dob: birthday,
        homeTown: homeLocation,
        currentLocation: currentLocation,
        Address: Address,
        employeeName: req.session.name,
        empID: userID
      });
    })
    .then((dataRes) => {

      candidateKey = dataRes.dataValues.id;
      var locationList = [];
      if (req.body.preferedLocation) {
        if (req.body.preferedLocation instanceof Array) {
          var place = req.body.preferedLocation;
          for (let i = 0; i < place.length; i++) {
            var locationObject = {
              location: place[i],
              candidateId: dataRes.dataValues.id,
            };
            locationList.push(locationObject);
          }
        } else if (typeof (req.body.preferedLocation) === 'string') {
          var locationObject = {
            location: req.body.preferedLocation,
            candidateId: dataRes.dataValues.id,
          };
          locationList.push(locationObject);
        }
        return insert(locationList);
      }
    })
    .then(result => {
      var languageList = [];
      if (req.body.language) {
        if (req.body.language instanceof Array) {
          var candidateLanguage = req.body.language;
          for (var i = 0; i < candidateLanguage.length; i++) {
            let langTwo = null;
            if (accessLevel === 'ALL' || accessLevel === 'L2_ASSESSMENT' || accessLevel === 'L2 ASSESSMENT') {
              langTwo = dataJson["languageTwoLevel" + i];
            } else {
              langTwo = null;
            }
            var languageObject = {
              LanguageTitle: candidateLanguage[i],
              levelone: dataJson["languageOneLevel" + i],
              leveltwo: langTwo,
              langugeId: candidateKey,
            };
            languageList.push(languageObject);
          }
        } else if (typeof (req.body.language) === 'string') {

          let langTwo = null, langOne = null;
          langOne = req.body.languageOneLevel0 ? req.body.languageOneLevel0 : null;

          if (accessLevel === 'ALL' || accessLevel === 'L2_ASSESSMENT' || accessLevel === 'L2 ASSESSMENT') {
            langTwo = req.body.languageTwoLevel0 ? req.body.languageTwoLevel0 : null;
          } else {
            langTwo = null;
          }


          var languageObject = {
            LanguageTitle: req.body.language,
            levelone: langOne,
            leveltwo: langTwo,
            langugeId: candidateKey,
          };
          languageList.push(languageObject);
        }
        return insertLanguage(languageList);

      }
    }).then(result => {

      return db.jobSeekerEducationEnrollment.create({
        highscool: class10,
        highscoolDate: class10Date,
        Intermediate: class12,
        IntermediateDate: class12Date,
        graduation: classG,
        graduationDate: classGDate,
        postGraduation: classP,
        postGraduationDate: classPDate,
        typingSpeed: typingspeed,
        addedBy: userData,
        candidateId: candidateKey,
      })

    }).then((dataRes) => {
      newTableCandidateKey = dataRes.dataValues.id;
      var skillList = [];
      for (let i = 0; i < skillSet.length; i++) {
        var skillObject = {
          skill: skillSet[i]+"".toUpperCase(),
          candidateId: dataRes.dataValues.id,
        };
        skillList.push(skillObject);
      }

      if (skillList.length > 0) {
        insertSkill(skillList).then((result) => {
          return result;
        });
      }
    })
    .then((dataSet) => {
      var certificateList = [];

      var certificateObject = {
        certificateName: certificateName,
        certificateNumber: certificateNumber,
        candidateId: newTableCandidateKey,
      };
      certificateList.push(certificateObject);

      return insertCertificate(certificateList);
    }).then(result => {
      return db.jobSeekerExperienceData
        .create({
          preferedJobType: preferedJobType,
          preferedShift: preferedShift,
          addedBy: userData,
          candidateId: candidateKey,
          experience: experience
        })
    })
    .then((dataRes) => {
      newTableCandidateKey = dataRes.dataValues.id;
      var companyList = [];

      if (companyCount > 1) {

        for (var i = 1; i <= companyCount; i++) {
          var companyObject = {
            name: dataJson["company" + i],
            companyIndustry: dataJson["companyIndustry" + i],
            companyRole: dataJson["companyRole" + i],
            startDate: dataJson["startDate" + i] ? dataJson["startDate" + i] : null,
            endDate: dataJson["endDate" + i] ? dataJson["endDate" + i] : null,
            Salary: dataJson["salary" + i],
            candidateId: dataRes.dataValues.id,
          };
          companyList.push(companyObject);

        }
        return insertCompany(companyList)

      } else {
        var companyObject = {
          name: company1,
          companyIndustry: companyIndustry1,
          companyRole: companyRole1,
          startDate: startDate1,
          endDate: endDate1,
          Salary: salary1,
          candidateId: dataRes.dataValues.id,
        };
        companyList.push(companyObject);
        return insertCompany(companyList)
      }
    })
    .then((dataSet) => {
      var preferedIndustry = [];

      if (preferenceCount > 1) {
        for (var i = 1; i <= preferenceCount; i++) {

          var preferedObject = {
            preferedIndustry: dataJson["preferedIndustry" + i],
            preferedJobRole: dataJson["preferedIndustryJobRole" + i],
            candidateId: newTableCandidateKey,
          };
          preferedIndustry.push(preferedObject);
        }

      } else {
        var preferedObject = {
          preferedIndustry: preferedIndustry1,
          preferedJobRole: preferedIndustryJobRole1,
          candidateId: newTableCandidateKey,
        };
        preferedIndustry.push(preferedObject);
      }

      return insertPreferedIndustry(preferedIndustry)
    }).then(result => {

      return db.jobSeekerLeveloneAssesssment
        .create({
          Assessment: l1assessment,
          client: client,
          process: process,
          interview: startDate,
          remark: remarkDescription,
          questionerId: userID,
          takenBy: userData,
          levelOneId: candidateKey,
        })
    }).then(result => {
      if (accessLevel === 'ALL' || accessLevel === 'L2_ASSESSMENT' || accessLevel === 'L2 ASSESSMENT') {
        return db.jobSeekerLeveltwoExpandedAssesssment
          .create({
            Assessment: l2assessment,
            Client: clients,
            process: processs,
            date: startDates,
            remark: remarkDescriptions,
            documentCheck: docCheck,
            trainingStatus: trainingStatus,
            InterviewStatus: InterviewStatus,
            InterviewRemark: Interviewremark,
            addedBy: userData,
            leveltwoId: candidateKey,
            questionerId: userID
          })

      }
    }).then(result => {
      return db.employeeRegistration
        .findOne({
          where: {
            id: userID,
          }
        })
    }).then(data => {
      if (data) {
        var type = data.dataValues.recruiterType;
        if (type === 'ADMIN' || type === 'MANAGER')
          return null;
        else if (type === 'TEAM_LEADER' || type === 'SUPERVISIOR') {
          counter = 1;
          return db.managerCount.findAll({
            where: {
              managersId: req.session.userId
            }
          })
        } else {
          counter = 2;
          return db.managerCount.findAll({
            where: {
              managersId: req.session.userId
            }
          })
        }
      } else {
        return null;
      }
    }).then(result => {
      if (result && result.length > 0) {
        if (counter === 0)
          return null;
        else {
          var managerIdList = [];
          if (Array.isArray(result) && result.length > 0) {
            for (let rec of result) {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: rec.dataValues.managerID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              managerIdList.push(dataItem);

            }
            return db.assignCandidate.bulkCreate(managerIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          } else {

            var dataItem = {
              AssignBy: userData,
              QuestionerID: result.dataValues.managerID,
              AssignCandidate: +candidateKey,
              AssignerID: req.session.userId
            };
            managerIdList.push(dataItem);

            return db.assignCandidate.bulkCreate(managerIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          }
        }
      } else {
        return null;
      }
    }).then(result => {
      if (result) {
        if (counter === 0)
          return null;
        else if (counter === 1)
          return null;
        else {
          return db.teamLeadCount.findAll({
            where: {
              teamLeadsId: req.session.userId
            }
          })
        }
      } else {
        return null;
      }
    }).then(result => {
      if (result && result.length > 0) {
        if (counter === 0)
          return null;
        else if (counter === 1)
          return null;
        else {
          var teamLeadIdList = [];
          if (Array.isArray(result) && result.length > 0) {
            for (let rec of result) {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: rec.dataValues.teamLeadID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              teamLeadIdList.push(dataItem);

            }
            return db.assignCandidate.bulkCreate(teamLeadIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          } else {

            var dataItem = {
              AssignBy: userData,
              QuestionerID: result.dataValues.teamLeadID,
              AssignCandidate: +candidateKey,
              AssignerID: req.session.userId
            };
            teamLeadIdList.push(dataItem);

            return db.assignCandidate.bulkCreate(teamLeadIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          }
        }
      } else {
        return null;
      }
    }).then(result => {
      //if (result) {
      if (counter === 0)
        return null;
      else if (counter === 1)
        return null;
      else {
        return db.supervisiorCount.findAll({
          where: {
            supervisiorsId: req.session.userId
          }
        })
      }

      //} else

    }).then(result => {

      if (result && result.length > 0) {
        if (counter === 0)
          return null;
        else if (counter === 1)
          return null;
        else {
          var supervisiorIdList = [];
          if (Array.isArray(result) && result.length > 0) {
            for (let rec of result) {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: rec.dataValues.superVisiorID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              supervisiorIdList.push(dataItem);

            }
            return db.assignCandidate.bulkCreate(supervisiorIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          } else {

            var dataItem = {
              AssignBy: userData,
              QuestionerID: result.dataValues.superVisiorID,
              AssignCandidate: +candidateKey,
              AssignerID: req.session.userId
            };
            supervisiorIdList.push(dataItem);

            return db.assignCandidate.bulkCreate(supervisiorIdList, {
              updateOnDuplicate: ["AssignCandidate"]
            });
          }
        }
      } else {
        return null;
      }
    })
    .then((data) => {
      var dataList = [];
      var dataItem = {
        AssignBy: userData,
        QuestionerID: req.session.userId,
        AssignCandidate: +candidateKey,
        AssignerID: req.session.userId,
        AssessmentStatus: "DONE"
      };
      dataList.push(dataItem);
      return db.assignCandidate.bulkCreate(dataList, {
        updateOnDuplicate: ["AssignCandidate"]
      });
      //return insertAssignment(dataList);
    }).then(result => {


      if (userData === "ADMIN") {
        const data = getAssignedTaskforAdmin();
        return data;
      } else if (userData !== "ADMIN") {
        return getAssignedTask(userID);
      } else {
        res.redirect("/login/index");
      }
    })
    .then((result) => {
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    }).then((result) => {
      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }

      res.redirect('/login/index');
    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log(err);
        res.redirect("/login/index");
      });
    });

}

exports.addNewCandidate = (req, res, next) => {

  let userData = req.session.user;
  let accountAccess = req.session.accountAccess;

  var location = [],
    skillSet = [],
    companyJobData = [],
    certificate = [],
    preferedIndustryData = [],
    graduationData = [],
    postGraduationData = [],
    roleTypeData = [],
    industryData = [],
    locationData = [], locationStateData = [];

  var listLanguage = [],
    sourceValue = [];

  sourceValue = getSource();

  getLanguage()
    .then(result => {
      if (result) {
        for (let src of result) {
          var datas = {
            name: src.dataValues.LanguageTitle,
          }
          listLanguage.push(datas);
        }
      }
      return db.graduationCourse.findAll();
    }).then((result) => {
      if (result) {
        for (let src of result) {
          graduationData.push(
            src.dataValues.course + "-" + src.dataValues.subject
          );
        }
        graduationData.push("NONE");
      }
      return db.postGraduationCourse.findAll();
    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          postGraduationData.push(
            src.dataValues.PGCourse + "-" + src.dataValues.PGSubject
          );
        }
        postGraduationData.push("NONE");
      }
      let PreferedIndustry = getPreferedIndustry();
      return PreferedIndustry;

    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          industryData.push(src.dataValues.IndustryName);
        }
      }
      return getPreferedJob();
    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          roleTypeData.push(src.dataValues.JobTitle);
        }
      }
      return db.locationCityData.findAll();
    })
    .then((result) => {
      //console.log("Location_Data", result);
      if (result) {
        for (let src of result) {
          locationData.push(src.dataValues.locationCity);
          locationStateData.push(src.dataValues.locationCity + "~" + src.dataValues.locationState);
        }
      }
      //console.log("Location_City_Data", locationData, location);
      return getAllComapanyName();
    }).then(result => {
      var companyData = [];
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }
      }

      res.render("candidate/add-new-candidate", {
        location: location,
        skillSet: skillSet,
        companyData: companyData,
        languageList: listLanguage,
        certificate: certificate,
        locationData: locationData,
        accountAccess: accountAccess,
        graduation: graduationData,
        pGraduation: postGraduationData,
        preferedJob: roleTypeData,
        preferedIndustry: industryData,
        locationStateData: locationStateData,
        sourceValue: sourceValue,
        user: userData,
        levelOneAssesssment: true,
        table: false,
        formView: true,
        type: "can"
      });
    })
    .catch((err) => {
      console.log("View level error ", err);
      res.redirect("/");
    });

}
exports.deleteLeveltwo = (req, res, next) => {

  var candidateId = req.params.candidateId ? +req.params.candidateId : 0;
  console.log("Inside L2 Delete Section!!!! ", candidateId);
  db.jobSeekerLeveltwoExpandedAssesssment.destroy({
    where: {
      id: candidateId
    }
  }).then(res => {
    console.log("Deleted successfully!!!!");
    res.redirect("candidate/getOfferDrop/?page=1");
    next();
  }).catch((err) => {
    fs.appendFile('l2Delete.txt', "Error: " + err, function (error) {
      if (error) throw error;
      res.redirect("/login/index");
    });
  });

}

exports.getTakeInterview = (req, res, next) => {

  var candidateId = +req.params.candidateId;
  const view = req.query.view;
  const edit = req.query.edit;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  const userId = req.session.userId;
  const levelId = +req.params.level;
  var counter = 0,
    data, recruiterList = [],
    take = false;

  var educationId, experienceId;
  var location = [],
    skillSet = [],
    companyData = [],
    companyJobData = [],
    certificate = [],
    preferedIndustryData = [],
    l1AssessmentList = [],
    l2AssessmentList = [],
    l2AssessmentListData = [],
    graduationData = [],
    postGraduationData = [],
    roleTypeData = [],
    industryData = [],
    languageData = [],
    locationData = [],
    locationCityData = [];

  var companyValue = [];
  var personalData,
    educationData,
    experienceData,
    levelOneAssesssment,
    leveltwoAssessment;

  l1AssessmentList = getAssessmentOne();
  l2AssessmentList = getAssessmentTwo();

  if (edit) {
    if (accountAccess === "ALL") {
      db.jobSeekerLevelFinalAssesssment.findOne({
        where: {
          FinalAssessmentId: levelId
        }
      }).then(result => {
        if (result) {
          console.log('FINAL ASSESSMENT IS ALREADY DONE!');
        }
        res.render("admin/interview", {
          data: result,
          take: true, //else true to take final Assessment
          levelId: levelId,
          candidateId: candidateId,
          user: userData
        })
      }).catch(err => {
          console.log(err)
          res.redirect("/login/index");
        })
    } else {
      console.log("NO PERMISSION")
      // res.redirect("/login/index");
      const candidate = findCandidateByID(candidateId);
      var languageList = [],
        listLanguage = [], companyValues, sourceValue = [];

      sourceValue = getSource();
      candidate
        .then((result) => {
          if (result === null) {
            res.redirect("/company/searchadd");
          } else {
            personalData = result;
            return findCandidatePreferedLocationByID(candidateId);
          }
        })
        .then((result) => {
          if (result) {
            for (let src of result) location.push(src.dataValues.location);
          }
          return getLanguageById(candidateId);

        }).then(result => {
          if (result) {
            if (result instanceof Array && result.length > 0) {
              for (let src of result) {
                var datas = {
                  name: src.dataValues.LanguageTitle,
                  levelone: src.dataValues.levelone,
                  leveltwo: src.dataValues.leveltwo
                }
                languageList.push(datas);
              }
            }
          }
          return getLanguage();
        }).then(result => {
          if (result) {
            for (let src of result) {
              var datas = {
                name: src.dataValues.LanguageTitle,
              }
              listLanguage.push(datas);
            }
          }

          return findCandidateEducationByID(candidateId);
        })
        .then((data) => {
          if (!data) {
            educationData = null;
            educationId = null;
          } else {
            educationData = data;
            educationId = data.dataValues.id;
          }
          if (educationId) return getSkillByCandidateID(data.dataValues.id);
          else return getSkillByCandidateID(0);
        })
        .then((result) => {
          if (result) {
            for (let src of result) skillSet.push(src.dataValues.skill);
          }
          if (educationId) return getCertificateByCandidateID(educationId);
          else return getCertificateByCandidateID(0);
        })
        .then((result) => {
          if (result) {
            for (let src of result) {
              var data = {
                certificateName: src.dataValues.certificateName,
                certificateNumber: src.dataValues.certificateNumber,
              };
              skillSet.push(data);
            }
          }
          return findCandidateExperienceByID(candidateId);
        })
        .then((data) => {
          if (data === null) {
            experienceData = null;
            experienceId = null;
          } else {
            experienceData = data;
            experienceId = data.dataValues.id;
          }
          if (experienceId) return findCandidateCompanyByID(data.dataValues.id);
          else return findCandidateCompanyByID(0);
        })
        .then((result) => {
          //companyData = result;
          if (result) {
            //companyData = result;
            for (let src of result) {
              var data = {
                name: src.dataValues.name,
                companyIndustry: src.dataValues.companyIndustry,
                companyRole: src.dataValues.companyRole,
                startDate: src.dataValues.startDate,
                endDate: src.dataValues.endDate,
                Salary: src.dataValues.Salary,
              };
              companyJobData.push(data);
            }
          }

          if (experienceId) return getPreferedJobByCandidateID(experienceId);
          else return getPreferedJobByCandidateID(0);
        })
        .then((result) => {
          if (result) {
            for (let src of result) {
              var data = {
                preferedIndustry: src.dataValues.preferedIndustry,
                preferedJobRole: src.dataValues.preferedJobRole,
              };
              preferedIndustryData.push(data);
            }
          }

          return findCandidateLevelOne(candidateId);
        })
        .then((result) => {
          if (result) {
            // console.log("L1 ==> ", result);
            levelOneAssesssment = result;
            companyValues = result.dataValues.client;
          } else {
            levelOneAssesssment = null;
          }
          return findCandidateLevelTwo(candidateId);
        })
        .then((result) => {
          if (result) {
            for (let src of result) {
              var data = {
                id: src.dataValues.id,
                Assessment: src.dataValues.Assessment,
                Client: src.dataValues.Client,
                process: src.dataValues.process,
                date: src.dataValues.date,
                remark: src.dataValues.remark,
                documentCheck: src.dataValues.documentCheck,
                trainingStatus: src.dataValues.trainingStatus,
                InterviewStatus: src.dataValues.InterviewStatus,
                InterviewRemark: src.dataValues.InterviewRemark,
                addedBy: src.dataValues.addedBy,
                leveltwoId: src.dataValues.leveltwoId
              };
              l2AssessmentListData.push(data);
            }
          }
          return db.graduationCourse.findAll();
        })
        .then((result) => {
          if (result) {
            graduationData.push("--Select--");
            for (let src of result) {
              graduationData.push(
                src.dataValues.course + "-" + src.dataValues.subject
              );
            }
          }
          return db.postGraduationCourse.findAll();
        })
        .then((result) => {
          if (result) {
            postGraduationData.push("--Select--");
            for (let src of result) {
              postGraduationData.push(
                src.dataValues.PGCourse + "-" + src.dataValues.PGSubject
              );
            }
          }
          let PreferedIndustry = getPreferedIndustry();
          return PreferedIndustry;

        })
        .then((result) => {
          if (result) {
            industryData.push("--Select--");
            for (let src of result) {
              industryData.push(src.dataValues.IndustryName);
            }
          }
          return getPreferedJob();
        })
        .then((result) => {
          if (result) {
            roleTypeData.push("--Select--");
            for (let src of result) {
              roleTypeData.push(src.dataValues.JobTitle);
            }
          }
          return db.locationCityData.findAll();
        })
        .then((result) => {
          //console.log("Location_Data", result);
          if (result) {
            locationData.push("--Select--");
            for (let src of result) {
              locationData.push(src.dataValues.locationCity);
              locationCityData.push(src.dataValues.locationCity + "~" + src.dataValues.locationState);
            }
          }
          //console.log("Location_City_Data", locationData, location);
          return getAllCompanyName();
        }).then(result => {
          var companyData = [];
          if (result) {
            for (let src of result) {
              var companyRole = [];
              for (let data of src.dataValues.CompanyJobs) {
                var dt = {
                  id: data.id,
                  role: data.role,
                  pseudoName: data.pseudoName
                }
                companyRole.push(dt);
              }
              var resData = {
                id: src.dataValues.id,
                name: src.dataValues.company_name,
                roleData: companyRole
              }
              companyData.push(resData);
            }
          }
          var candidateLanguauge = [];
          //console.log('COMPANY +++++>  ', companyData);

          if (languageList.length > 0) {
            for (let sr of languageList) {
              candidateLanguauge.push(sr);
            }

            for (var i = 0; i < candidateLanguauge.length; i++) {
              for (var j = 0; j < listLanguage.length; j++) {
                if (listLanguage[j].name === candidateLanguauge[i].name) {
                  listLanguage.splice(j, 1);
                }
              }
            }
          }

          var locData = []
          if (location.length > 0) {
            candidateLanguauge = [];
            for (let sr of location) {
              candidateLanguauge.push(sr);
            }

            for (var i = 0; i < candidateLanguauge.length; i++) {
              for (var j = 0; j < locationData.length; j++) {
                if (locationData[j].locationCity === candidateLanguauge[i].location) {
                  locationData.splice(j, 1);
                }
              }
            }
            locData = locationData;
          }
          res.render("candidate/editCandidate", {
            personalData: !personalData ? null : personalData.dataValues,
            educationData: !educationData ? null : educationData.dataValues,
            experienceData: !experienceData ? null : experienceData.dataValues,
            location: location,
            skillSet: skillSet,
            locData: locData,
            companyData: companyData,
            languageList: languageList,
            locationCityData: locationCityData,
            listLanguage: listLanguage,
            certificate: certificate,
            locationData: locationData,
            accountAccess: accountAccess,
            companyJobData: companyJobData,
            graduationData: graduationData,
            postGraduationData: postGraduationData,
            roleTypeData: roleTypeData,
            industryData: industryData,
            preferedIndustryData: !preferedIndustryData ?
              null : preferedIndustryData,
            user: userData,
            candidateId: candidateId,
            companyAssessment: companyData,
            levelOneAssesssment: !levelOneAssesssment ?
              null : levelOneAssesssment,
            l2AssessmentListData: l2AssessmentListData,
            sourceValue: sourceValue,
            table: false,
            formView: true,
            type: "can"
          });
        })
        .catch((err) => {
          res.redirect("/");
        });
    }
  }

  if (view) {
    if (accountAccess === "ALL") {
      db.jobSeekerLevelFinalAssesssment.findOne({
        where: {
          FinalAssessmentId: levelId
        }
      }).then(result => {
        if (result) {
          take = false
          console.log('FINAL ASSESSMENT IS ALREADY DONE!');
        } else {
          take = true;
        }
        res.render("admin/interview", {
          data: result,
          take: take, //else true to take final Assessment
          levelId: levelId,
          candidateId: candidateId,
          user: userData
        })

      })
        .catch(err => {
          console.log(err)
          res.redirect("/login/index");
        })
    } else {

      const candidate = findCandidateByID(candidateId);
      candidate
        .then((result) => {
          if (result === null) {
            res.redirect("/company/searchadd");
          } else {
            personalData = result;
            return findCandidatePreferedLocationByID(candidateId);
          }
        })
        .then((result) => {
          if (result) {
            for (let src of result) location.push(src.dataValues.location);
          } else {
            location.push("");
          }
          return findCandidateEducationByID(candidateId);
        })
        .then((data) => {
          if (!data) {
            //res.redirect("/");
            educationData = null;
            educationId = 0;
          } else {
            educationData = data;
            educationId = data.dataValues.id;
            return getSkillByCandidateID(data.dataValues.id);
          }
        })
        .then((result) => {
          if (result) {
            for (let src of result) skillSet.push(src.dataValues.skill);
          } else {
            skillSet.push("");
          }
          return getCertificateByCandidateID(educationId);
        })
        .then((result) => {
          if (result) {
            for (let src of result) {
              var data = {
                certificateName: src.dataValues.certificateName,
                certificateNumber: src.dataValues.certificateNumber,
              };
              certificate.push(data);
            }
          } else {
            var dataValue = {
              certificateName: "",
              certificateNumber: "",
            };
            certificate.push(dataValue);
          }

          return findCandidateExperienceByID(candidateId);
        })
        .then((data) => {
          if (!data) {
            //res.redirect("/");
            experienceData = null;
            experienceId = 0;
          } else {
            experienceData = data;
            experienceId = data.dataValues.id;
            return findCandidateCompanyByID(data.dataValues.id);
          }
        })
        .then((result) => {
          if (result) {
            //companyData = result;
            for (let src of result) {
              var data = {
                name: src.dataValues.name,
                companyIndustry: src.dataValues.companyIndustry,
                companyRole: src.dataValues.companyRole,
                startDate: src.dataValues.startDate,
                endDate: src.dataValues.endDate,
                Salary: src.dataValues.Salary,
              };
              companyData.push(data);
            }
          }

          return getPreferedJobByCandidateID(experienceId);
        })
        .then((result) => {
          if (result) {
            for (let src of result) {
              var data = {
                preferedIndustry: src.dataValues.preferedIndustry,
                preferedJobRole: src.dataValues.preferedJobRole,
              };
              preferedIndustryData.push(data);
            }
          }
          return findCandidateLevelOne(candidateId);
        })
        .then((result) => {
          if (result) {
            levelOneAssesssment = result;
          } else {
            levelOneAssesssment = null;
          }
          return findCandidateLevelTwo(candidateId);
        })
        .then((result) => {

          if (result) {
            for (let src of result) {
              var data = {
                Assessment: src.dataValues.Assessment,
                Client: src.dataValues.Client,
                process: src.dataValues.process,
                date: src.dataValues.date,
                remark: src.dataValues.remark,
                documentCheck: src.dataValues.documentCheck,
                trainingStatus: src.dataValues.trainingStatus,
                InterviewStatus: src.dataValues.InterviewStatus,
                InterviewRemark: src.dataValues.InterviewRemark,
                addedBy: src.dataValues.addedBy,
              };
              l2AssessmentListData.push(data);
            }
          }
          return getAllCompanyName();
        }).then((result) => {
          if (result) {
            for (let src of result) {
              var companyRole = [];
              for (let data of src.dataValues.CompanyJobs) {
                var dt = {
                  id: data.id,
                  role: data.role,
                  pseudoName: data.pseudoName
                }
                companyRole.push(dt);
              }
              var resData = {
                id: src.dataValues.id,
                name: src.dataValues.company_name,
                roleData: companyRole
              }
              companyValue.push(resData);
            }
          }
          return getLanguageById(candidateId);
        }).then((result) => {
          if (result) {
            if (result instanceof Array && result.length > 0) {
              for (let src of result) {
                var datas = {
                  name: src.dataValues.LanguageTitle,
                  levelone: src.dataValues.levelone,
                  leveltwo: src.dataValues.leveltwo
                }
                languageData.push(datas);
              }
            }
          }
          return getAllCompanyName();
        }).then(result => {

          var companyList = [];
          if (result) {
            for (let src of result) {
              var companyRole = [];
              for (let data of src.dataValues.CompanyJobs) {
                var dt = {
                  id: data.id,
                  role: data.role,
                  pseudoName: data.pseudoName
                }
                companyRole.push(dt);
              }
              var resData = {
                id: src.dataValues.id,
                name: src.dataValues.company_name,
                roleData: companyRole
              }
              companyList.push(resData);
            }
          }
          res.render("candidate/view-candidate", {
            personalData: !personalData ? null : personalData.dataValues,
            educationData: educationData === null ? null : educationData.dataValues,
            experienceData: experienceData === null ? null : experienceData.dataValues,
            locationData: location,
            skillSet: skillSet,
            companyJobData: companyData,
            certificate: certificate,
            preferedIndustryData: preferedIndustryData,
            user: userData,
            accountAccess: accountAccess,
            candidateId: candidateId,
            companyName: companyList,
            languageList: languageData,
            levelOneAssesssment: levelOneAssesssment,
            levelOneTake: levelOneAssesssment ? true : false,
            levelOneTakeFullBody: levelOneAssesssment ? true : false,
            levelTwoTake: l2AssessmentListData.length === 0 ? false : true, //l2AssessmentListData === null || 
            levelTwoTakeFullBody: l2AssessmentListData.length + 1,
            leveltwoAssessment: l2AssessmentListData.length === 0 ? false : true, //l2AssessmentListData === null || 
            l2AssessmentListData: l2AssessmentListData,
            table: false,
            formView: true,
            type: "can",
            companyValue: companyValue
          });
        })
        .catch((err) => {
          console.log("View error ", err);
          res.redirect("/");
        });
    }
  }
}

exports.getInterviewList = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];

  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    candidateID = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: [
        "CLIENT_VENUE", "TPP_VENUE"
      ], //'SELECTED'
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  })
    .then((result) => {
      if (result) {
        for (let src of result)
          candidateID.push(src.dataValues.leveltwoId);
        getAllCandidate(candidateID, result, page, res, userData, access, 'IN_PROCESS', dataCount)

      }
      else {
        res.redirect("/login/index");
      }

    })
    .catch((err) => {
      console.log("Crash", err);
      fs.appendFile('mynewfile1.txt', err, function (err) {
        if (err) throw err;
        res.redirect("/");
      });

    });

}

exports.getLevelTwoAssessmentUpdate = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  var counter = req.body.counter;
  const userData = req.session.user;
  const userID = req.session.userId;
  const assessment = req.body.assessment;
  const l2assessment = dataJson["l2assessment" + counter];
  const candidateId = req.body.candidateId;
  var client;
  var process;
  var startDate;
  var remarkDescription;
  var docCheck;
  var trainingStatus;
  var InterviewStatus;
  var Interviewremark;
  var countValue = 0,
    taskCompleted = 0,
    languageCount = 0,
    totalCandidate = 0,
    totalEmployee = 0;
  var languageList = [];
  var i = +assessment - 1;

  var temp1, temp2;

  client = dataJson["client" + counter] ? dataJson["client" + counter] : null,
    process = dataJson["process" + counter] ? dataJson["process" + counter] : null,
    remarkDescription = dataJson["remarkDescription" + counter] ? dataJson["remarkDescription" + counter] : null,
    startDate = dataJson["startDate" + counter] ? dataJson["startDate" + counter] : null,
    docCheck = dataJson["docCheck" + counter] ? dataJson["docCheck" + counter] : null,
    trainingStatus = dataJson["trainingStatus" + counter] ? dataJson["trainingStatus" + counter] : null,
    InterviewStatus = dataJson["InterviewStatus" + counter] ? dataJson["InterviewStatus" + counter] : null,
    Interviewremark = dataJson["Interviewremark" + counter] ? dataJson["Interviewremark" + counter] : null,
    console.log(client, process, remarkDescription, startDate, InterviewStatus, Interviewremark);



  getLanguageById(candidateId).then(result => {

    if (result) {
      if (result instanceof Array && result.length > 0)
        languageCount = result.length;
    }
    if (languageCount > 0) {
      for (var i = 1; i <= languageCount; i++) {
        var languageObject = {
          LanguageTitle: dataJson["language" + i],
          levelone: dataJson["languageOneLevel" + i],
          leveltwo: dataJson["languageTwolevel" + i],
          langugeId: candidateId,
        };
        languageList.push(languageObject);
      }
      return db.job_language.destroy({
        where: {
          langugeId: candidateId
        }
      });

    }
  }).then(result => {
    if (languageList.length > 0)
      return insertLanguage(languageList);
  }).then(result => { 
    return db.jobSeekerLevelFinalAssesssment.findAll({
      where: {
        FinalAssessmentId: +assessment
      }
    })
  }).then(result => { 
    console.log(result, "FInal", dataJson)
    if (result) { 
      if ((l2assessment !== 'good' && l2assessment !== 'tac') ||
        ((l2assessment === 'good' || l2assessment === 'tac') && InterviewStatus !== 'SELECTED')) {
        var finalAssId = 0;
        for (let r of result) { 
          finalAssId = r.dataValues.FinalAssessmentId;
          break;
        }
        return db.jobSeekerLevelFinalAssesssment.destroy({
          where: {
            FinalAssessmentId: +finalAssId
          }
        })
      }
    }
    return null;
  }).then(result => {
    console.log(result, "FInal-Deleted")
    return db.jobSeekerLeveltwoExpandedAssesssment.findByPk(+assessment)
  }).then(result => {
    console.log("Can", result);
    if (result) {
      return db.jobSeekerLeveltwoExpandedAssesssment
        .update({
          Assessment: l2assessment,
          Client: client,
          process: process,
          date: startDate,
          remark: remarkDescription,
          documentCheck: docCheck,
          trainingStatus: trainingStatus,
          InterviewStatus: InterviewStatus,
          InterviewRemark: Interviewremark,
          addedBy: userData,
          questionerId: userID
        }, {
          where: {
            id: assessment,
            leveltwoId: candidateId
          }
        })
    }
    else
      return false;
  }
  ).then(result => {
    console.log("update", result);
    if (result) {
      if (userData === "ADMIN") {
        const data = getAssignedTaskforAdmin();
        return data;
      } else if (userData !== "ADMIN") {
        return getAssignedTask(userID);
      } else {
        res.redirect("/");
      }
    } else {
      return null;
    }
  })
    .then((result) => {
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    })

    .then((result) => {

      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }
      res.redirect("/candidate/candidate/"+candidateId+"/?edit=true");
      // res.redirect(
      //   "/login/index"
      // );
    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log(err, "DESTRoY");
        res.redirect("/");
      });
    });
};


exports.getLevelTwoAssessment = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  const userData = req.session.user;
  const userID = req.session.userId;
  const l2assessment = req.body.l2assessment;
  const candidateId = req.body.candidateId;
  const client = dataJson.client ? dataJson.client : null;
  const process = dataJson.process ? dataJson.process : null;
  const startDate = dataJson.startDate ? dataJson.startDate : null;
  const remarkDescription = !req.body.remarkDescription ?
    null :
    req.body.remarkDescription;
  const docCheck = !req.body.docCheck ? null : req.body.docCheck;
  const trainingStatus = !req.body.trainingStatus ?
    null :
    req.body.trainingStatus;
  const InterviewStatus = !req.body.InterviewStatus ?
    null :
    req.body.InterviewStatus;
  const Interviewremark = !req.body.Interviewremark ?
    null :
    req.body.Interviewremark;

  const assessmentListDataLength = req.body.assessmentListDataLength;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    languageCount = 0,
    totalEmployee = 0;

  var languageList = [];

  getLanguageById(candidateId).then(result => {

    if (result) {
      if (result instanceof Array && result.length > 0) {
        languageCount = result.length;

        if (languageCount > 0 && assessmentListDataLength == 0) {
          for (var i = 1; i <= languageCount; i++) {
            var languageObject = {
              LanguageTitle: dataJson["language" + i] ? dataJson["language" + i] : null,
              levelone: dataJson["languageOnelevel" + i] ? dataJson["languageOnelevel" + i] : null,
              leveltwo: dataJson["languageTwolevel" + i] ? dataJson["languageTwolevel" + i] : null,
              langugeId: candidateId,
            };
            languageList.push(languageObject);
          }
          return db.job_language.destroy({
            where: {
              langugeId: candidateId
            }
          });

        }
      } else if (result instanceof String) {
        var languageObject = {
          LanguageTitle: dataJson["language1"], //0
          levelone: dataJson["languageOnelevel1"],//0
          leveltwo: dataJson["languageTwolevel1"], //0
          langugeId: candidateId,
        };
        languageList.push(languageObject);
        return db.job_language.destroy({
          where: {
            langugeId: candidateId
          }
        });
      }
    }
  }).then(result => {
    if (languageList.length > 0 && assessmentListDataLength == 0)
      return insertLanguage(languageList);
  }).then(result => {
    return db.jobSeekerLeveltwoExpandedAssesssment
      .create({
        Assessment: l2assessment,
        Client: client,
        process: process,
        date: startDate,
        remark: remarkDescription,
        documentCheck: docCheck,
        trainingStatus: trainingStatus,
        InterviewStatus: InterviewStatus,
        InterviewRemark: Interviewremark,
        addedBy: userData,
        leveltwoId: candidateId,
        questionerId: userID
      })
  }).then(result => {
    if (result) {
      console.log("ASSIGN", result, "ASSIGNED");
      if (userData === "ADMIN") {
        const data = getAssignedTaskforAdmin();
        return data;
      } else if (userData !== "ADMIN") {
        return getAssignedTask(userID);
      } else {
        res.redirect("/");
      }
    } else {
      return null;
    }
  })
    .then((result) => {
      console.log(result, "ANOTHER RESULT");
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      console.log(result.count);
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    })

    .then((result) => {
      console.log(result, "ANOTHER RESULT");

      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }

      res.redirect('/candidate/candidate/' + candidateId + '/?view=true');

    })
    .catch((err) => {
      console.log('ERROR', err);
      req.session.destroy((err) => {
        console.log(err, "DESTRoY");
        res.redirect("/");
      });
    });
};

exports.updateLevelOneAssessment = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  const userData = req.session.user;
  const userID = req.session.userId;
  const l1assessment = req.body.l1assessment;
  var candidateId, client, process, startDate, remarkDescription;
  candidateId = req.body.candidateId;
  var temp = 1;
  if (l1assessment === 'wd' || l1assessment === 'tac' || l1assessment === 'good') {

    client = !req.body.clients ? null : req.body.clients;
    process = !req.body.processs ? null : req.body.processs;
    startDate = !req.body.startDate ? null : req.body.startDate;
    remarkDescription = !req.body.remarkDescription ?
      null :
      req.body.remarkDescription;
  } else {
    client = null;
    process = null;
    startDate = null;
    remarkDescription = !req.body.remarkDescription ?
      null :
      req.body.remarkDescription;
    temp = 0;
  }
  const assessmentId = req.body.assessmentId;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    languageCount = 0,
    totalEmployee = 0;
  var languageList = [];
  console.log("1");

 getLanguageById(candidateId)
    .then(result => {
      if (result) {
        if (result instanceof Array && result.length > 0)
          languageCount = result.length;
      }
    console.log("2", languageCount);
    if (languageCount > 0) {
      for (var i = 1; i <= languageCount; i++) {
        var languageObject = {
          LanguageTitle: dataJson["language" + i],
          levelone: dataJson["languageOneLevel" + i],
          leveltwo: dataJson["languageTwolevel" + i],
          langugeId: candidateId,
        };
        languageList.push(languageObject);
      }
      return db.job_language.destroy({
        where: {
          langugeId: candidateId
        }
      });

    }
  }).then(result => {
    if (languageList.length > 0)
      return insertLanguage(languageList);
  }).then(result => {
    return db.jobSeekerLeveloneAssesssment
      .update({
        Assessment: l1assessment,
        client: client,
        process: process,
        interview: startDate,
        remark: remarkDescription,
        questionerId: userID,
        takenBy: userData,

      }, {
        where: {
          levelOneId: +candidateId,
          // id: +assessmentId
        }
      })
  }).then(result => {
    console.log("6", result);
    if (userData === "ADMIN") {
      const data = getAssignedTaskforAdmin();
      return data;
    } else if (userData !== "MANAGER") {
      return getAssignedTask(userID);
    } else {
      res.redirect("/");
    }
  })
    .then((result) => {
      console.log(result, "ANOTHER RESULT");
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      console.log(result.count);
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    })
    .then((result) => {
      console.log(result.count);
      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }
      if(temp === 0){
        db.jobSeekerLeveltwoExpandedAssesssment.findAll({
          where: {
            leveltwoId: candidateId,
          }
        }).then( result => { 
          let _ids = [];
          if (result) { 
            if(Array.isArray(result)){
              for(let r of result){
                _ids.push(r.dataValues.id);
              }
            }else{
              _ids.push(r.dataValues.id);
            }
            return db.jobSeekerLevelFinalAssesssment.destroy({
              where: {
                FinalAssessmentId: {
                  [db.Op.in]: _ids
                }
              }
            })
          }
        }).then(result => {
          
           return db.jobSeekerLeveltwoExpandedAssesssment.destroy({
              where: {
                leveltwoId: candidateId
              }
            });
        })
      } 
      res.redirect("/candidate/candidate/"+candidateId+"/?edit=true");
      // res.redirect(
      //   "/login/index"
      // );
    })
    .catch((error) => {
      req.session.destroy((err) => {
        res.redirect("/");
      });
    });
};

exports.getLevelOneNewAssessment = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  const userData = req.session.user;
  const userID = req.session.userId;
  const l1assessment = req.body.l1assessment;
  const candidateId = req.body.candidateId;
  const client = !req.body.clients ? null : req.body.clients;
  const processs = !req.body.processs ? null : req.body.processs;
  const startDate = !req.body.startDate ? null : req.body.startDate;
  const remarkDescription = !req.body.remarkDescription ?
    null :
    req.body.remarkDescription;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    languageCount = 0,
    totalEmployee = 0;
  var languageList = [];

  getLanguageById(candidateId).then(result => {

    if (result) {
      if (result instanceof Array && result.length > 0)
        languageCount = result.length;
    }
    if (languageCount > 0) {
      for (var i = 1; i <= languageCount; i++) {
        var languageObject = {
          LanguageTitle: dataJson["language" + i],
          levelone: dataJson["languageOneLevel" + i],
          leveltwo: dataJson["languageTwolevel" + i],
          langugeId: candidateId,
        };
        languageList.push(languageObject);
      }
      return db.job_language.destroy({
        where: {
          langugeId: candidateId
        }
      });

    }
  }).then(result => {
    if (languageList.length > 0)
      return insertLanguage(languageList);
  }).then(res => {
    return db.jobSeekerLeveloneAssesssment.findOne({ where: { levelOneId: candidateId } })
  }).then(result => {
    if (!result) {
      return db.jobSeekerLeveloneAssesssment
        .create({
          Assessment: l1assessment,
          client: client,
          process: processs,
          interview: startDate,
          remark: remarkDescription,
          questionerId: userID,
          takenBy: userData,
          levelOneId: candidateId,
        })
    } else {

      return db.jobSeekerLeveloneAssesssment
        .update({
          Assessment: l1assessment,
          client: client,
          process: processs,
          interview: startDate,
          remark: remarkDescription,
          questionerId: userID,
          takenBy: userData,
          levelOneId: candidateId,
        }, {
          where: {
            levelOneId: candidateId
          }
        });

    }
  }).then(result => {

    if (userData === "ADMIN") {
      const data = getAssignedTaskforAdmin();
      return data;
    } else if (userData !== "ADMIN") {
      return getAssignedTask(userID);
    } else {
      res.redirect("/");
    }
  })
    .then((result) => {
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    })

    .then((result) => {
      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }
      res.redirect("/candidate/candidate/"+candidateId+"/?edit=true");
      // res.redirect("/candidate/getAllCandidate");
    })
    .catch((err) => {
      req.session.destroy((err) => {
        res.redirect("/");
      });
    });
};


exports.getLevelOneAssessment = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  const userData = req.session.user;
  const userID = req.session.userId;
  const l1assessment = req.body.l1assessment;
  const candidateId = req.body.candidateId;
  const client = !req.body.client ? null : req.body.client;
  const process = !req.body.process ? null : req.body.process;
  const startDate = !req.body.startDate ? null : req.body.startDate;
  const remarkDescription = !req.body.remarkDescription ?
    null :
    req.body.remarkDescription;
  var countValue = 0,
    taskCompleted = 0,
    totalCandidate = 0,
    languageCount = 0,
    totalEmployee = 0;
  var languageList = [];

  getLanguageById(candidateId).then(result => {

    if (result) {
      if (result instanceof Array && result.length > 0)
        languageCount = result.length;
    }
    if (languageCount > 0) {
      for (var i = 1; i <= languageCount; i++) {
        var languageObject = {
          LanguageTitle: dataJson["language" + i],
          levelone: dataJson["languagelevel" + i],
          langugeId: candidateId,
        };
        languageList.push(languageObject);
      }
      return db.job_language.destroy({
        where: {
          langugeId: candidateId
        }
      });

    }
  }).then(result => {
    if (languageList.length > 0)
      return insertLanguage(languageList);
  }).then(res => {
    return db.jobSeekerLeveloneAssesssment.findOne({ where: { levelOneId: candidateId } })
  }).then(result => {
    if (!result) {
      return db.jobSeekerLeveloneAssesssment
        .create({
          Assessment: l1assessment,
          client: client,
          process: process,
          interview: startDate,
          remark: remarkDescription,
          questionerId: userID,
          takenBy: userData,
          levelOneId: candidateId,
        })
    }
    else {
      return db.jobSeekerLeveloneAssesssment
        .update({
          Assessment: l1assessment,
          client: client,
          process: process,
          interview: startDate,
          remark: remarkDescription,
          questionerId: userID,
          takenBy: userData,
          levelOneId: candidateId,
        }, {
          where: {
            levelOneId: candidateId
          }
        })
    }
  }).then(result => {

    if (userData === "ADMIN") {
      const data = getAssignedTaskforAdmin();
      return data;
    } else if (userData !== "ADMIN") {
      return getAssignedTask(userID);
    } else {
      res.redirect("/");
    }
  })
    .then((result) => {
      if (result) {
        for (let count of result) {
          countValue++;
        }
      }
      return getTotalCandidate();
    })
    .then((result) => {
      if (result) {
        totalCandidate = result.count;
      }
      return getTotalEmployee();
    })

    .then((result) => {
      if (result) {
        totalEmployee = result.count;
      } else {
        totalEmployee = 0;
      }
      res.redirect("/candidate/candidate/"+candidateId+"/?edit=true");
      // res.redirect('/login/index');

    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log(err);
        res.redirect("/");
      });
    });
};

exports.getAddCandidateByUser = (req, res, next) => {

  let dataList = getLocationList();
  let language = getLanguage();
  let Role = getSource();
  let userData = req.session.user;
  let access = req.session.accountAccess;
  let languageList = [];



  language.then(result => {
    if (result) {
      var data = {
        name: '--Select--',
        id: '-1'
      }
      languageList.push(data);
      for (let src of result) {
        var datas = {
          name: src.dataValues.LanguageTitle,
          id: src.dataValues.id
        }
        languageList.push(datas);
      }
    } else {
      var data = {
        name: 'NONE',
        id: 'NONE'
      }
      languageList.push(data);
    }
    return dataList;
  }).then((result) => {
    res.render("candidate/add-candidate", {
      pageTitle: "Add Candidate",
      path: "/candidate/add-candidate",
      source: Role,
      list: result,
      page: 1,
      errors: null,
      inputData: null,
      user: userData,
      accountAccess: access,
      languageList: languageList
    });
  })
    .catch((err) => {
      console.log(err);
    });
};

exports.updateEducationByUser = (req, res, next) => {
  console.log('UPDATE EXPERIENCE +++++', req.body);
  var skillSet = [],
    cerficateSet = [];
  var skillDataSet = null,
    newTableCandidateKey = null,
    class10 = null,
    class10Date = null,
    classP = null,
    classPDate = null,
    classG = null,
    classGDate = null,
    class12Date = null,
    class12 = null,
    certificateName = null,
    certificateNumber = null,
    typingspeed = null;
  const userData = req.session.user;
  const candidateKey = req.body.candidateKey;
  const educationKey = req.body.educationKey;
  var count = 0;
  class10 = req.body.class10;
  class10Date = req.body.class10Date === '' ? formatDate(new Date()) : req.body.class10Date;
  console.log(class10Date)
  classP = req.body.classP;
  classPDate = req.body.classPDate === '' ? formatDate(new Date()) : req.body.classPDate;
  console.log(classPDate)
  classG = req.body.classG;
  classGDate = req.body.classGDate === '' ? formatDate(new Date()) : req.body.classGDate;
  console.log(classGDate)
  class12Date = req.body.class12Date === '' ? formatDate(new Date()) : req.body.class12Date;
  console.log(class12Date)
  class12 = req.body.class12;
  certificateName = req.body.certificateName;
  certificateNumber = req.body.certificateNumber;
  typingspeed = req.body.typingspeed;
  skillDataSet = req.body.preferedSkillset;
  skillSet = skillDataSet.split(",");
  if (educationKey) {
    findCandidateEducationByEducationId(educationKey).then(result => {
      if (result) {
        count = 1;
        return db.jobSeekerEducationEnrollment
          .update({
            highscool: class10,
            highscoolDate: class10Date,
            Intermediate: class12,
            IntermediateDate: class12Date,
            graduation: classG,
            graduationDate: classGDate,
            postGraduation: classP,
            postGraduationDate: classPDate,
            typingSpeed: typingspeed,
            addedBy: userData
          }, {
            where: {
              candidateId: candidateKey,
              id: educationKey
            }
          })
      } else {
        count = 2;
        return db.jobSeekerEducationEnrollment
          .create({
            highscool: class10,
            highscoolDate: class10Date,
            Intermediate: class12,
            IntermediateDate: class12Date,
            graduation: classG,
            graduationDate: classGDate,
            postGraduation: classP,
            postGraduationDate: classPDate,
            typingSpeed: typingspeed,
            addedBy: userData,
            candidateId: candidateKey,
          })
      }
    }).then(dataRes => {
      if (dataRes) {
        if (count == 2)
          newTableCandidateKey = dataRes.dataValues.id;
        else
          newTableCandidateKey = educationKey;

        return deleteSkillByCandidateID(newTableCandidateKey);
      }
      return null;
    }).then(result => { 
      console.log("Deleted successfully : ", result)
      var skillList = [];
      for (let i = 0; i < skillSet.length; i++) {
        var skillObject = {
          skill: skillSet[i]+"".toUpperCase(),
          candidateId: newTableCandidateKey,
        };
        skillList.push(skillObject);
      }
      return insertSkill(skillList);
    }).then(dataSet => { 
      console.log("Update Skill : ", dataSet)
      return deleteCertificateByCandidateID(newTableCandidateKey)
    }).then((dataSet) => {
      console.log("Deleted Certificate : ", dataSet)
      var certificateList = [];
      var certificateObject = {
        certificateName: certificateName,
        certificateNumber: certificateNumber,
        candidateId: newTableCandidateKey,
      };
      certificateList.push(certificateObject);
      return insertCertificate(certificateList);
    }).then(result => {
      console.log("Update certificate : ", result)
      res.redirect(
        "/candidate/candidate/" + candidateKey + "/?edit=true"
      );
    }).catch(error => {
      console.log(error);
      res.redirect('/');
    })
  } else {
    db.jobSeekerEducationEnrollment
      .create({
        highscool: class10,
        highscoolDate: class10Date,
        Intermediate: class12,
        IntermediateDate: class12Date,
        graduation: classG,
        graduationDate: classGDate,
        postGraduation: classP,
        postGraduationDate: classPDate,
        typingSpeed: typingspeed,
        addedBy: userData,
        candidateId: candidateKey,
      })
      .then(dataRes => {
        if (dataRes) {
          newTableCandidateKey = dataRes.dataValues.id;
          var skillList = [];
          for (let i = 0; i < skillSet.length; i++) {
            var skillObject = {
              skill: skillSet[i]+"".toUpperCase(),
              candidateId: newTableCandidateKey,
            };
            skillList.push(skillObject);
          }
          return insertSkill(skillList);
        }
        return null;
      }).then((dataSet) => {
        var certificateList = [];
        var certificateObject = {
          certificateName: certificateName,
          certificateNumber: certificateNumber,
          candidateId: newTableCandidateKey,
        };
        certificateList.push(certificateObject);
        return insertCertificate(certificateList);
      }).then(result => {
        res.redirect(
          "/candidate/candidate/" + candidateKey + "/?edit=true"
        );
      })
      .catch(error => {
        console.log(error);
      })
  }
}

exports.setEducationInfo = (req, res, next) => {
  console.log(req);
  const class10 = req.body.class10;
  const class10Date = req.body.class10Date === null ? formatDate(new Date()) : req.body.class10Date;
  const classP = req.body.classP;
  const classPDate = req.body.classPDate === null ? formatDate(new Date()) : req.body.classPDate;
  const classG = req.body.classG;
  const classGDate = req.body.classGDate === null ? formatDate(new Date()) : req.body.classGDate;
  const class12Date = req.body.class12Date === null ? formatDate(new Date()) : req.body.class12Date;
  const class12 = req.body.class12;
  const certificateName = req.body.certificateName;
  const certificateNumber = req.body.certificateNumber;
  const typingspeed = req.body.typingspeed;
  const candidateKey = req.body.candidateKey;
  const userData = req.session.user;
  var skillSet = [],
    cerficateSet = [];
  var skillDataSet = req.body.preferedSkillset;
  skillSet = skillDataSet.split(",");

  for (var i = 0; i < skillSet.length; i++) {
    // Trim the excess whitespace.
    skillSet[i] = skillSet[i].replace(/^\s*/, "").replace(/\s*$/, "");
    console.log(skillSet[i]);
  }
  console.log(classPDate, classGDate, class12Date, class10Date)

  var newTableCandidateKey;
  var industry = [],
    roleType = [];

  db.jobSeekerEducationEnrollment
    .create({
      highscool: class10,
      highscoolDate: class10Date,
      Intermediate: class12,
      IntermediateDate: class12Date,
      graduation: classG,
      graduationDate: classGDate,
      postGraduation: classP,
      postGraduationDate: classPDate,
      typingSpeed: typingspeed,
      addedBy: userData,
      candidateId: candidateKey,
    })
    .then((dataRes) => {
      newTableCandidateKey = dataRes.dataValues.id;
      var skillList = [];
      for (let i = 0; i < skillSet.length; i++) {
        var skillObject = {
          skill: skillSet[i]+"".toUpperCase(),
          candidateId: dataRes.dataValues.id,
        };
        skillList.push(skillObject);
      }

      insertSkill(skillList).then((result) => {
        return result;
      });
    })
    .then((dataSet) => {
      var certificateList = [];

      var certificateObject = {
        certificateName: certificateName,
        certificateNumber: certificateNumber,
        candidateId: newTableCandidateKey,
      };
      certificateList.push(certificateObject);

      return insertCertificate(certificateList);
    })
    .then((result) => {
      let PreferedIndustry = getPreferedIndustry();
      return PreferedIndustry;
    })
    .then((result) => {
      if (result !== null) {
        for (let src of result) {
          industry.push(src.dataValues.IndustryName);
        }
      }
      return getPreferedJob();
    })
    .then((result) => {
      if (result !== null) {
        for (let src of result) {
          roleType.push(src.dataValues.JobTitle);
        }
      }
    })

    .then((result) => {
      res.render("candidate/add-candidate", {
        pageTitle: "Add candidate",
        page: 3,
        user: userData,
        candidateKey: candidateKey,
        preferedIndustry: industry,
        preferedJob: roleType,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getUpdateExperienceData = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));

  var experienceKey = req.body.experienceKey;
  var company1, companyIndustry1, companyRole1, startDate1, endDate1, salary1, companyCount;
  const experience = req.body.experiencestatus;
  var counter = 0;

  if (experience && experience === 'EXPERIENCE') {
    company1 = req.body.company1;
    companyIndustry1 = req.body.companyIndustry1;
    companyRole1 = req.body.companyRole1;
    startDate1 = req.body.startDate1;
    endDate1 = req.body.endDate1;
    salary1 = req.body.salary1;
    companyCount = req.body.companyCount;
  } else {
    company1 = null;
    companyIndustry1 = null;
    companyRole1 = null;
    startDate1 = null;
    endDate1 = null;
    salary1 = null;
    companyCount = null;
  }

  const preferedIndustry1 = req.body.preferedIndustry1;
  const preferedIndustryJobRole1 = req.body.preferedIndustryJobRole1;
  const preferedJobType = req.body.preferedJobType;
  const preferedShift = req.body.preferedShift;
  const candidateKey = req.body.candidateKey;
  const userData = req.session.user;
  const preferenceCount = req.body.preferenceCount;

  if (experienceKey) {
    console.log("KEY1");
    var newTableCandidateKey;

    db.jobSeekerExperienceData.findByPk(experienceKey).then(result => {
      console.log("K1", result);
      if (result) {
        counter = 1;
        console.log("KEY1", counter);
        return db.jobSeekerExperienceData
          .update({
            preferedJobType: preferedJobType,
            preferedShift: preferedShift,
            addedBy: userData,
            experience: experience ? experience : 'FRESHER'
          }, {
            where: {
              id: experienceKey,
              candidateId: candidateKey,
            }
          })

      } else {
        counter = 2;
        console.log("KEY1", counter);
        return db.jobSeekerExperienceData
          .create({
            preferedJobType: preferedJobType,
            preferedShift: preferedShift,
            addedBy: userData,
            candidateId: candidateKey,
            experience: experience ? experience : 'FRESHER'
          })
      }
    }).then(dataRes => {
      console.log("1", dataRes, "SAVE");
      if (dataRes) {
        console.log("KEY1", dataRes, "SAVE");
        if (counter === 1) {
          newTableCandidateKey = experienceKey;
        } else {
          newTableCandidateKey = dataRes.dataValues.id;
        }

        return db.jobSeekerCompanyData.destroy({
          where: {
            candidateId: newTableCandidateKey
          },
          truncate: true /* this will ignore where and truncate the table instead */
        });

      } else
        return null

    }).then(dataRes => {

      var companyList = [];

      if (companyCount > 1) {

        for (var i = 1; i <= companyCount; i++) {
          var companyObject = {
            name: dataJson["company" + i],
            companyIndustry: dataJson["companyIndustry" + i],
            companyRole: dataJson["companyRole" + i],
            startDate: dataJson["startDate" + i],
            endDate: dataJson["endDate" + i],
            Salary: dataJson["salary" + i],
            candidateId: newTableCandidateKey,
          };
          companyList.push(companyObject);

        }
        return insertCompany(companyList)

      } else if (companyCount == 1) {
        var companyObject = {
          name: company1,
          companyIndustry: companyIndustry1,
          companyRole: companyRole1,
          startDate: startDate1,
          endDate: endDate1,
          Salary: salary1,
          candidateId: newTableCandidateKey,
        };
        companyList.push(companyObject);
        return insertCompany(companyList)
      } else {
        return null;
      }

    }).then(result => {
      return db.jobSeekerPreferedIndustry.destroy({
        where: {
          candidateId: newTableCandidateKey
        },
        truncate: true /* this will ignore where and truncate the table instead */
      });

    }).then(result => {

      console.log("KEY1", result, "RESULT_SAVE");
      var preferedIndustry = [];

      if (preferenceCount > 1) {
        for (var i = 1; i <= preferenceCount; i++) {

          var preferedObject = {
            preferedIndustry: dataJson["preferedIndustry" + i],
            preferedJobRole: dataJson["preferedIndustryJobRole" + i],
            candidateId: newTableCandidateKey,
          };
          preferedIndustry.push(preferedObject);
        }

      } else {
        var preferedObject = {
          preferedIndustry: preferedIndustry1,
          preferedJobRole: preferedIndustryJobRole1,
          candidateId: newTableCandidateKey,
        };
        preferedIndustry.push(preferedObject);
      }

      return insertPreferedIndustry(preferedIndustry)

    }).then(result => {
      console.log(result)
      res.redirect("/candidate/candidate/"+newTableCandidateKey+"/?edit=true");
      // res.redirect(
      //   "/login/index"
      // );

    }).catch(err => {
      console.log(err);
      res.redirect("/");
    })

  } else {

    var newTableCandidateKey;

    db.jobSeekerExperienceData
      .create({
        preferedJobType: preferedJobType,
        preferedShift: preferedShift,
        addedBy: userData,
        candidateId: candidateKey,
        experience: experience ? experience : 'FRESHER'
      })
      .then((dataRes) => {
        console.log("KEY_NOT", dataRes, "SAVE");
        newTableCandidateKey = dataRes.dataValues.id;
        var companyList = [];

        if (companyCount > 1) {

          for (var i = 1; i <= companyCount; i++) {
            var companyObject = {
              name: dataJson["company" + i],
              companyIndustry: dataJson["companyIndustry" + i],
              companyRole: dataJson["companyRole" + i],
              startDate: dataJson["startDate" + i],
              endDate: dataJson["endDate" + i],
              Salary: dataJson["salary" + i],
              candidateId: dataRes.dataValues.id,
            };
            companyList.push(companyObject);

          }
          return insertCompany(companyList)

        } else if (companyCount == 1) {
          var companyObject = {
            name: company1,
            companyIndustry: companyIndustry1,
            companyRole: companyRole1,
            startDate: startDate1,
            endDate: endDate1,
            Salary: salary1,
            candidateId: dataRes.dataValues.id,
          };
          companyList.push(companyObject);
          return insertCompany(companyList)
        } else {
          return null;
        }


      })
      .then((dataSet) => {
        console.log("KEY_NOT", dataSet, "SAVE");
        var preferedIndustry = [];

        if (preferenceCount > 1) {
          for (var i = 1; i <= preferenceCount; i++) {

            var preferedObject = {
              preferedIndustry: dataJson["preferedIndustry" + i],
              preferedJobRole: dataJson["preferedIndustryJobRole" + i],
              candidateId: newTableCandidateKey,
            };
            preferedIndustry.push(preferedObject);
          }

        }
        return insertPreferedIndustry(preferedIndustry)
      })
      .then((result) => {
        // res.redirect("/candidate/getAllCandidate");
        res.redirect("/candidate/candidate/"+newTableCandidateKey+"/?edit=true");
        // res.redirect("/candidate/candidate/" + candidateKey + "/?edit=true");
      })
      .catch((err) => {
        console.log(err);
        res.redirect("/");
      });
  }
}

exports.saveExperienceInfo = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);
  var company1, companyIndustry1, companyRole1, startDate1, endDate1, salary1, companyCount;
  const experience = req.body.experiencestatus;
  var counter = 0;

  if (experience && experience === 'EXPERIENCE') {
    company1 = req.body.company1;
    companyIndustry1 = req.body.companyIndustry1;
    companyRole1 = req.body.companyRole1;
    startDate1 = req.body.startDate1;
    endDate1 = req.body.endDate1;
    salary1 = req.body.salary1;
    companyCount = req.body.companyCount;
  } else {
    company1 = null;
    companyIndustry1 = null;
    companyRole1 = null;
    startDate1 = null;
    endDate1 = null;
    salary1 = null;
    companyCount = null;
  }
  const preferedIndustry1 = req.body.preferedIndustry1;
  const preferedIndustryJobRole1 = req.body.preferedIndustryJobRole1;
  const preferedJobType = req.body.preferedJobType;
  const preferedShift = req.body.preferedShift;
  const candidateKey = req.body.candidateKey;
  const userData = req.session.user;

  const preferenceCount = req.body.preferenceCount;
  var newTableCandidateKey;

  db.jobSeekerExperienceData
    .create({
      preferedJobType: preferedJobType,
      preferedShift: preferedShift,
      addedBy: userData,
      candidateId: candidateKey,
      experience: experience
    })
    .then((dataRes) => {
      newTableCandidateKey = dataRes.dataValues.id;
      var companyList = [];

      if (companyCount > 1) {

        for (var i = 1; i <= companyCount; i++) {
          var companyObject = {
            name: dataJson["company" + i],
            companyIndustry: dataJson["companyIndustry" + i],
            companyRole: dataJson["companyRole" + i],
            startDate: dataJson["startDate" + i],
            endDate: dataJson["endDate" + i],
            Salary: dataJson["salary" + i],
            candidateId: dataRes.dataValues.id,
          };
          companyList.push(companyObject);

        }
        return insertCompany(companyList)

      } else { //if (companyCount == 1)
        var companyObject = {
          name: company1,
          companyIndustry: companyIndustry1,
          companyRole: companyRole1,
          startDate: startDate1,
          endDate: endDate1,
          Salary: salary1,
          candidateId: dataRes.dataValues.id,
        };
        companyList.push(companyObject);
        return insertCompany(companyList)
      }
      // else {
      //   return null;
      // }


    })
    .then((dataSet) => {
      var preferedIndustry = [];

      if (preferenceCount > 1) {
        for (var i = 1; i <= preferenceCount; i++) {

          var preferedObject = {
            preferedIndustry: dataJson["preferedIndustry" + i],
            preferedJobRole: dataJson["preferedIndustryJobRole" + i],
            candidateId: newTableCandidateKey,
          };
          preferedIndustry.push(preferedObject);
        }

      } else {
        var preferedObject = {
          preferedIndustry: preferedIndustry1,
          preferedJobRole: preferedIndustryJobRole1,
          candidateId: newTableCandidateKey,
        };
        preferedIndustry.push(preferedObject);
      }

      return insertPreferedIndustry(preferedIndustry)
    })
    .then((result) => {
      console.log("Result", result, "---------My_Id-------", req.session.userId);
      res.render("candidate/add-candidate", {
        pageTitle: "Add candidate",
        page: 4,
        user: userData,
        candidateKey: candidateKey,
      });

    })
    .catch((err) => {
      console.log(err);
      res.redirect("/login/index");
    });
};

exports.updatedCandidateByUser = (req, res, next) => {

  var dataJson = JSON.parse(JSON.stringify(req.body));
  const candidateId = req.body.candidateId;
  const source = req.body.sourceData;
  const reference = req.body.Reference;
  const name = req.body.name;
  const mobileone = req.body.mobileone;
  const mobiletwo = req.body.mobiletwo;
  const mobilethree = req.body.mobilethree;
  const mobilefour = req.body.mobilefour;
  const emailone = req.body.emailone;
  const emailtwo = req.body.emailtwo;
  const emailthree = req.body.emailthree;
  const emailfour = req.body.emailfour;
  const homeLocation = req.body.homeLocation;
  const currentLocation = req.body.currentLocation;
  const birthday = req.body.birthday;
  const Address = req.body.Address;
  const languageCount = req.body.languageCount;
  const languageData = req.body.language;
  const onelevel1 = req.body.onelevel1;
  const twolevel1 = req.body.twolevel1;
  var counter = 0;

  var place = [],
    graduation = [],
    languageList = [],
    pGraduation = [];
  var locationList = [];

  place = dataJson.preferedLocation; //req.body.preferedLocation;
  if (place instanceof Array) {
    console.log(true, place);
  }
  else {
    console.log(false, place)
  }
  var candidateKey, candidate;

  findCandidateByID(candidateId)
    .then((result) => {
      if (result)
        return jobSeekerPersonalInfo.update({
          source: source,
          reference: reference,
          fullName: name,
          phoneNumberOne: mobileone ? mobileone : result.dataValues.phoneNumberOne,
          phoneNumberTwo: mobiletwo ? mobiletwo : null,
          phoneNumberthree: mobilethree ? mobilethree : null,
          phoneNumberfour: mobilefour ? mobilefour : null,
          emailOne: emailone ? emailone : result.dataValues.emailOne,
          emailTwo: emailtwo ? emailtwo : null,
          emailThree: emailthree ? emailthree : null,
          emailFour: emailfour ? emailfour : null,
          dob: birthday ? birthday : result.dataValues.dob,
          homeTown: homeLocation && homeLocation !== '--Select--' ? homeLocation : null,
          currentLocation: currentLocation && currentLocation !== '--Select--' ? currentLocation : null,
          Address: Address,
        }, {
          where: {
            id: candidateId
          }
        });
    })
    .then((dataRes) => {

      //var locationList = [];
      if (dataJson.preferedLocation) {
        if (dataJson.preferedLocation instanceof Array) {
          var place = dataJson.preferedLocation;
          console.log("ARRAY_LOC", place)
          for (let i = 0; i < place.length; i++) {
            var locationObject = {
              location: place[i],
              candidateId: candidateId,
            };
            locationList.push(locationObject);
          }
          console.log("ARRAY_LOC_LIST", locationList)
        } else if (typeof (dataJson.preferedLocation) === 'string') {
          var locationObject = {
            location: dataJson.preferedLocation,
            candidateId: candidateId,
          };
          locationList.push(locationObject);
          console.log("STRING_LOC", locationList)
        }
        return db.jobSeekerPreferedLocation.destroy({
          where: {
            candidateId: candidateId
          },
        });
      }


    })
    .then((result) => {
      console.log("Truncate", result);
      return insert(locationList);
    }).then(result => {


      if (req.body.language) {
        if (req.body.language instanceof Array) {
          var candidateLanguage = req.body.language;
          console.log("ARRAY_LANG", candidateLanguage)
          for (var i = 0; i < candidateLanguage.length; i++) {
            var languageObject = {
              LanguageTitle: candidateLanguage[i],
              langugeId: candidateId,
            };
            languageList.push(languageObject);
            console.log("ARRAY_LANG_LIST", languageList)
          }
        } else if (typeof (req.body.language) === 'string') {
          var languageObject = {
            LanguageTitle: req.body.language,
            langugeId: candidateId,
          };
          languageList.push(languageObject);
          console.log("STRING_LANG", languageList)
        }
        //return insertLanguage(languageList);
        return db.job_language.destroy({
          where: {
            langugeId: candidateId
          }
        });
      }
    }).then(result => {
      if (result == 1) {
        console.log('Truncate Result Successfull...');
      }
      if (languageList.length > 0)
        return insertLanguage(languageList);

    })
    .then((result) => {
      res.redirect("/candidate/candidate/"+candidateId+"/?edit=true");
      // res.redirect(
      //   "/login/index"
      // );

    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });


}

exports.download = (req, res, next) => {
  try {
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet("Candidate");
    worksheet.columns = [
      { header: "SNo", key: "s_no", width: 5 },
      { header: "Employee", key: "emp_id", width: 25 },
      { header: "Assigned", key: "assign", width: 25 },
      { header: "Candidate Name", key: "candidate", width: 25 },
      { header: "Mobile1", key: "mobile_1", width: 15 },
      { header: "Mobile2", key: "Mobile_2", width: 15 },
      { header: "Created", key: "created", width: 10 },
      { header: "L1 Status", key: "l1_Status", width: 10 },
      { header: "L1 Client", key: "l1_Client", width: 10 },
      { header: "L1 Process", key: "l1_Process", width: 10 },
      { header: "L2 Status", key: "l2_Status", width: 10 },
      { header: "L2 Client", key: "l2_Client", width: 10 },
      { header: "L2 Process", key: "l2_Process", width: 10 },
      { header: "L2 Date", key: "l2_Date", width: 10 },
      { header: "Interview Status", key: "interviewStatus", width: 15 },
      { header: "Skill", key: "skill", width: 20 },
    ];
    var empList = [], candidateIDList = [], emp_can_list = [];
    let candidate = [];
    let candidateList = req.session.candidateList;
    var l2_process, l2_Client, assigned;
    var l1_process, l1_Client;
    const skill = new Map();

    for (let src of candidateList)
      candidateIDList.push(src.id);
    
    console.log(candidateIDList);
    getSkillByCandidateIdList(candidateIDList)
      .then(result => { 
        if (result) { 
          for (let r of result) { 
            var _d = r.dataValues.JobSeekerEnrollmentEducationalDatum
            var _s = _d.dataValues.JobSeekerEnrollmentSkillsets;
            for (let _sk of _s) {
              var _id = r.dataValues.id;
              if (skill.has(_id)) {
                var data = skill.get(_id);
                data = data + ", " + _sk.dataValues.skill;
                skill.set(_id, data);
              } else {
                skill.set(_id, _sk.dataValues.skill);
              }
            }
          
          }
        }
        console.log("--SKILL--", skill);
        return getEmployeeList();
    }).then((result) => {
      if (result) {
        empList = result;
      }
      return getAssignerList(candidateIDList);
    }).then(result => {
      if (result) {
        for (let em of empList) {
          for (let rs of result) {
            if (em.dataValues.id === rs.dataValues.QuestionerID) {
              var data = {
                empName: em.dataValues.fullName,
                canId: rs.dataValues.AssignCandidate
              }
              emp_can_list.push(data);
            }
          }
        }
      }
      return getAllCompanyName();
    }).then((result) => {
      var companyData = [];
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }

      }
      if (companyData.length !== 0 && candidateList.length !== 0) {
        var count = 1;
        for (let i = 0; i < candidateList.length; i++) {
          for (let j = 0; j < companyData.length; j++) {
            if (candidateList[i].l_one_assessment_client !== null && candidateList[i].l_one_assessment_client == companyData[j].id) {
              l1_Client = companyData[j].name;
              let role = companyData[j].roleData;
              for (let k = 0; k < role.length; k++) {
                if (candidateList[i].l_one_assessment_process !== null && candidateList[i].l_one_assessment_process == role[k].id) {
                  l1_process = role[k].pseudoName;
                  break;
                }
              }
              break;
            }
          }
          for (let j = 0; j < companyData.length; j++) {
            if (candidateList[i].l_two_client !== null && candidateList[i].l_two_client == companyData[j].id) {
              l2_Client = companyData[j].name;
              let role = companyData[j].roleData;
              for (let k = 0; k < role.length; k++) {
                if (candidateList[i].l_two_process !== null && candidateList[i].l_two_process == role[k].id) {
                  l2_process = role[k].pseudoName;
                  break;
                }
              }
              break;
            }
          }
          for (let x = 0; x < emp_can_list.length; x++) { 
            if (emp_can_list[x].canId == candidateList[i].id) { 
              assigned = emp_can_list[x].empName;
            }
          }
          candidate.push({
            s_no: count++,
            emp_id: candidateList[i].eName,
            assign: assigned,
            candidate: candidateList[i].name,
            mobile_1: candidateList[i].mobone,
            Mobile_2: candidateList[i].mobtwo,
            created: candidateList[i].createdDate,
            l1_Status: candidateList[i].l_one_assessment,
            l1_Client: l1_Client,
            l1_Process: l1_process,
            l2_Status: candidateList[i].l_two_status,
            l2_Client: l2_Client,
            l2_Process: l2_process,
            l2_Date: candidateList[i].l_two_interviewDate,
            interviewStatus: candidateList[i].l_two_InterviewStatus,
            skill: skill.has(candidateList[i].id) ? skill.get(candidateList[i].id) : ""
          });

        }

      }
      worksheet.addRows(candidate);
      res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      );
      let fileName = "Candidate" + ".xlsx"; //new Date().getTime()  or pass user name for particular user to get only that person data 
      res.setHeader(
        "Content-Disposition",
        "attachment; filename=" + fileName
      );
      let exportPath = path.resolve(__dirname, "../public/uploads/"+fileName);
      return workbook.xlsx.writeFile(exportPath)
        .then(() => {
          res.send("/uploads/" + fileName);
        });
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not download the file! ",
    });
  }

}


exports.upload = (req, res, next) => {


  try {
    if (req.file === undefined) {
      return res.status(400).send("Please upload an excel file!");
    }

    let path =
      "./public/uploads/" + req.file.filename;

    let fileName = req.file.filename.split("-bezkoder-")[1].split(".")[0]

    var candidate;
    var valueCount;
    var graduationData = [], CandidateIdArray = [];

    const candidateIdValue = getCandidateId();
    db.jobSeekerEnrollment.findAll()
      .then(result => {
        if (result) {
          for (let rs of result) {
            let dta = {
              datatype: null,
              source: "OTHER",
              reference: null,
              fullName: rs.dataValues.fullName,
              CandidateID: rs.dataValues.CandidateID,
              phoneNumberOne: rs.dataValues.phoneNumberOne,
              phoneNumberTwo: rs.dataValues.phoneNumberTwo,
              phoneNumberthree: null,
              phoneNumberfour: null,
              emailOne: null,
              emailTwo: null,
              emailThree: null,
              emailFour: null,
              dob: new Date().toISOString().substr(0, 10),
              homeTown: null,
              currentLocation: null,
              Address: null,
            }
            graduationData.push(dta);
          }
        }
        return candidateIdValue;
      }).then((company) => {
        if (company === null || company.length === 0 || company === undefined) {
          candidateID++;
        } else {
          var value = company[company.length - 1].dataValues.CandidateID;
          valueCount = +value.replace("CAN", "");
          valueCount++;
        }
        return readXlsxFile(path);
      }).then((rows) => {
        rows.shift();
        let candidates = [];

        rows.forEach((row) => {
          if (candidateID == 100000001) {
            candidate = "CAN" + candidateID;
            candidateID++;
          } else if (valueCount > 100000001) {
            candidate = "CAN" + valueCount;
            valueCount++;
          } else if (candidateID > 100000001) {
            candidate = "CAN" + candidateID;
            candidateID++;
            console.log('Error in candidate ID creation...');
          }
          let dataValue = new Date().toISOString().substr(0, 10);
          var name = row[0] ? row[0] + "" : "";
          name.replace(/[^a-zA-Z]/g, "")
          let tutorial = {

            datatype: fileName,
            source: "OTHER",
            reference: null,
            fullName: name,
            CandidateID: candidate,
            phoneNumberOne: row[1],
            phoneNumberTwo: row[2] ? row[2] : null,
            phoneNumberthree: null,
            phoneNumberfour: null,
            emailOne: null,
            emailTwo: null,
            emailThree: null,
            emailFour: null,
            dob: dataValue,
            homeTown: null,
            currentLocation: null,
            Address: row[3] ? row[3] : null,

          };

          candidates.push(tutorial);

        });


        let del_List = [];
        for (let o1 of candidates) {
          for (let o2 of graduationData) {
            if ((o1.phoneNumberOne && o2.phoneNumberOne && o1.phoneNumberOne == o2.phoneNumberOne) ||
              (o1.phoneNumberTwo && o2.phoneNumberTwo && o1.phoneNumberTwo == o2.phoneNumberTwo)) {
              del_List.push(o1);
            }
          }
        }

        for (let o1 of del_List) {
          var index = candidates.indexOf(o1);
          candidates.splice(index, 1);
        }

        for (let src of candidates) {
          CandidateIdArray.push(src.phoneNumberOne);
        }


        db.jobSeekerEnrollment.bulkCreate(candidates)
          .then(() => {

            return db.jobSeekerEnrollment.findAll({
              where: {
                phoneNumberOne: CandidateIdArray
              }
            })
          })

          .then((response) => {
            if (response) {
              res.status(200).send({
                message: "Uploaded the file successfully: " + req.file.originalname,
              });
            } else {
              res.redirect("/login/index");
            }
          })
          .catch((error) => {
            res.status(500).send({
              message: "Fail to import data into database!",
              error: error
            });
          });
      });


  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Could not upload the file: " + req.file.originalname,
    });
  }

}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;

  return [year, month, day].join('-');
}

exports.setPersonalInfo = (req, res, next) => {

  var dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);

  const errors = validationResult(req);

  let data = getLocationList();
  let Role = getSource();
  let userData = req.session.user;
  var languageList = [], locationList = [];
  let access = req.session.accountAccess;
  var counter = 0;
  let language = getLanguage();

  if (!errors.isEmpty()) {
    var invalidData = errors.mapped();
    var inputData = matchedData(req);
    console.log(invalidData, "  -->  ", inputData);

    data.then(result => {
      if (result)
        locationList = result;
      return language;
    }).then(result => {
      if (result) {
        var data = {
          name: '--Select--',
          id: '-1'
        }
        languageList.push(data);
        for (let src of result) {
          var datas = {
            name: src.dataValues.LanguageTitle,
            id: src.dataValues.id
          }
          languageList.push(datas);
        }
      } else {
        var data = {
          name: 'NONE',
          id: 'NONE'
        }
        languageList.push(data);
      }
      return languageList;
    })
      .then((result) => {
        res.render("candidate/add-candidate", {
          pageTitle: "Add-Candidate",
          source: Role,
          list: locationList,
          page: 1,
          errors: invalidData,
          inputData: inputData,
          user: userData,
          languageList: languageList,
          accountAccess: access
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    var inputData = matchedData(req);
    // insert query will be written here
    var mobiletwo = null,
      mobilethree = null,
      mobilefour = null,
      emailtwo = null,
      emailthree = null,
      emailfour = null;

    const source = req.body.sourceData;
    const reference = req.body.Reference;
    const name = req.body.name;
    const mobileone = req.body.mobileone;
    const emailone = req.body.emailone;
    const homeLocation = req.body.homeLocation;
    const currentLocation = req.body.currentLocation;
    const birthday = req.body.birthday;
    const Address = req.body.Address;

    if (req.body.mobile2 && (req.body.mobile2 !== '' || req.body.mobile2 !== 'null'))
      mobiletwo = req.body.mobile2;


    if (req.body.mobile3 && (req.body.mobile3 !== '' || req.body.mobile3 !== 'null'))
      mobilethree = req.body.mobile3;


    if (req.body.mobile4 && (req.body.mobile1 !== '' || req.body.mobile1 !== 'null'))
      mobilefour = req.body.mobile1;


    if (req.body.email2 && (req.body.email2 !== '' || req.body.email2 !== 'null'))
      emailtwo = req.body.email2;


    if (req.body.email3 && (req.body.email3 !== '' || req.body.email3 !== 'null'))
      emailthree = req.body.email3;


    if (req.body.email4 && (req.body.email1 !== '' || req.body.email1 !== 'null'))
      emailfour = req.body.email1;

    console.log(mobiletwo, mobilethree, mobilefour, emailtwo, emailthree, emailfour);

    var graduation = [],
      pGraduation = [];
    var candidateKey, candidate;
    const candidateIdValue = getCandidateId();
    candidateIdValue
      .then((company) => {
        if (company === null || company.length === 0 || company === undefined) {
          candidateID++;
          candidate = "CAN" + candidateID;
        } else {
          var value = company[company.length - 1].dataValues.CandidateID;
          var valueCount = +value.replace("CAN", "");
          valueCount++;
          candidate = "CAN" + valueCount;
        }

        return jobSeekerPersonalInfo.create({
          source: source,
          reference: reference,
          fullName: name,
          CandidateID: candidate,
          phoneNumberOne: mobileone,
          phoneNumberTwo: mobiletwo,
          phoneNumberthree: mobilethree,
          phoneNumberfour: mobilefour,
          emailOne: emailone,
          emailTwo: emailtwo,
          emailThree: emailthree,
          emailFour: emailfour,
          dob: birthday,
          homeTown: homeLocation,
          currentLocation: currentLocation,
          Address: Address,
        });
      })
      .then((dataRes) => {
        console.log(typeof req.body.preferedLocation)
        candidateKey = dataRes.dataValues.id;
        var locationList = [];
        if (req.body.preferedLocation) {
          if (req.body.preferedLocation instanceof Array) {
            var place = req.body.preferedLocation;
            console.log("ARRAY_LOC", place)
            for (let i = 0; i < place.length; i++) {
              var locationObject = {
                location: place[i],
                candidateId: dataRes.dataValues.id,
              };
              locationList.push(locationObject);
            }
            console.log("ARRAY_LOC_LIST", locationList)
          } else if (typeof (req.body.preferedLocation) === 'string') {
            var locationObject = {
              location: req.body.preferedLocation,
              candidateId: dataRes.dataValues.id,
            };
            locationList.push(locationObject);
            console.log("STRING_LOC", locationList)
          }
          return insert(locationList);
        }
      }).then(result => {
        console.log(typeof req.body.language)
        if (req.body.language) {
          if (req.body.language instanceof Array) {
            var candidateLanguage = req.body.language;
            console.log("ARRAY_LANG", candidateLanguage)
            for (var i = 0; i < candidateLanguage.length; i++) {
              var languageObject = {
                LanguageTitle: candidateLanguage[i],
                langugeId: candidateKey,
              };
              languageList.push(languageObject);
              console.log("ARRAY_LANG_LIST", languageList)
            }
          } else if (typeof (req.body.language) === 'string') {
            var languageObject = {
              LanguageTitle: req.body.language,
              langugeId: candidateKey,
            };
            languageList.push(languageObject);
            console.log("STRING_LANG", languageList)
          }
          return insertLanguage(languageList);
        }
      })
      .then((result) => {
        return db.graduationCourse.findAll();
      })
      .then((result) => {
        if (result) {
          for (let data of result) {
            graduation.push(
              data.dataValues.course + "-" + data.dataValues.subject
            );
          }
          graduation.push("NONE");
        }
        return db.postGraduationCourse.findAll();
      })
      .then((result) => {
        if (result) {
          for (let data of result) {
            pGraduation.push(
              data.dataValues.PGCourse + "-" + data.dataValues.PGSubject
            );
          }
          pGraduation.push("NONE");
        }

        return db.employeeRegistration
          .findOne({
            where: {
              id: req.session.userId,
            }
          })

      })
      .then(data => {
        console.log('FIND_USER', data)
        if (data) {
          var type = data.dataValues.recruiterType;
          if (type === 'ADMIN' || type === 'MANAGER')
            return null;
          else if (type === 'TEAM_LEADER' || type === 'SUPERVISIOR') {
            counter = 1;
            return db.managerCount.findAll({
              where: {
                managersId: req.session.userId
              }
            })
          } else {
            counter = 2;
            return db.managerCount.findAll({
              where: {
                managersId: req.session.userId
              }
            })
          }
        } else {
          return null;
        }
      }).then(result => {
        console.log("MANAGER_USER", result);
        if (result && result.length > 0) {
          if (counter === 0)
            return null;
          else {
            var managerIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let rec of result) {

                var dataItem = {
                  AssignBy: userData,
                  QuestionerID: rec.dataValues.managerID,
                  AssignCandidate: +candidateKey,
                  AssignerID: req.session.userId
                };
                managerIdList.push(dataItem);

              }
              console.log("MANAGER_USER", managerIdList);
              return db.assignCandidate.bulkCreate(managerIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            } else {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: result.dataValues.managerID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              managerIdList.push(dataItem);

              console.log("MANAGER_USER", managerIdList);
              return db.assignCandidate.bulkCreate(managerIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            }
          }
        } else {
          return null;
        }
      }).then(result => {
        console.log("MANAGER_USER2", result);
        if (result) {
          if (counter === 0)
            return null;
          else if (counter === 1)
            return null;
          else {
            return db.teamLeadCount.findAll({
              where: {
                teamLeadsId: req.session.userId
              }
            })
          }
        } else {
          return null;
        }
      }).then(result => {
        console.log('TEAMLEAD', result);
        if (result && result.length > 0) {
          console.log('TEAMLEAD2', result);
          if (counter === 0)
            return null;
          else if (counter === 1)
            return null;
          else {
            console.log('TEAMLEAD3', result);
            var teamLeadIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let rec of result) {

                var dataItem = {
                  AssignBy: userData,
                  QuestionerID: rec.dataValues.teamLeadID,
                  AssignCandidate: +candidateKey,
                  AssignerID: req.session.userId
                };
                teamLeadIdList.push(dataItem);

              }
              return db.assignCandidate.bulkCreate(teamLeadIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            } else {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: result.dataValues.teamLeadID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              teamLeadIdList.push(dataItem);

              return db.assignCandidate.bulkCreate(teamLeadIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            }
          }
        } else {
          return null;
        }
      }).then(result => {
        console.log('SUPEVISIOR', result);
        //if (result) {
        if (counter === 0)
          return null;
        else if (counter === 1)
          return null;
        else {
          return db.supervisiorCount.findAll({
            where: {
              supervisiorsId: req.session.userId
            }
          })
        }

        //} else

      }).then(result => {
        console.log('SUPEVISIOR2', result);

        if (result && result.length > 0) {
          if (counter === 0)
            return null;
          else if (counter === 1)
            return null;
          else {
            var supervisiorIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let rec of result) {

                var dataItem = {
                  AssignBy: userData,
                  QuestionerID: rec.dataValues.superVisiorID,
                  AssignCandidate: +candidateKey,
                  AssignerID: req.session.userId
                };
                supervisiorIdList.push(dataItem);

              }
              return db.assignCandidate.bulkCreate(supervisiorIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            } else {

              var dataItem = {
                AssignBy: userData,
                QuestionerID: result.dataValues.superVisiorID,
                AssignCandidate: +candidateKey,
                AssignerID: req.session.userId
              };
              supervisiorIdList.push(dataItem);

              return db.assignCandidate.bulkCreate(supervisiorIdList, {
                updateOnDuplicate: ["AssignCandidate"]
              });
            }
          }
        } else {
          return null;
        }
      })
      .then((data) => {
        console.log("RECRUITER ==> ", data);
        var dataList = [];
        var dataItem = {
          AssignBy: userData,
          QuestionerID: req.session.userId,
          AssignCandidate: +candidateKey,
          AssignerID: req.session.userId
        };
        dataList.push(dataItem);
        console.log(dataList);
        return db.assignCandidate.bulkCreate(dataList, {
          updateOnDuplicate: ["AssignCandidate"]
        });
        //return insertAssignment(dataList);
      })
      .then((dataInsert) => {
        console.log(dataInsert);
        res.render("candidate/add-candidate", {
          pageTitle: "Add candidate",
          source: Role,
          //list: result,
          graduation: graduation,
          pGraduation: pGraduation,
          page: 2,
          user: userData,
          candidateKey: candidateKey,
        });

        //res.redirect("/candidate/addcandidate");
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getInitialForm = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    var invalidData = errors.mapped();
    var inputData = matchedData(req);

    let data = getLocationList();
    let Role = getSource();
    data
      .then((result) => {
        res.render("home", {
          pageTitle: "Home",
          path: "/home",
          source: Role,
          list: result,
          page: 1,
          errors: invalidData,
          inputData: inputData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    var inputData = matchedData(req);

    let data = getLocationList();
    let Role = getSource();
    data
      .then((result) => {
        res.render("home", {
          pageTitle: "Home",
          path: "/home",
          source: Role,
          list: result,
          page: 1,
          errors: "",
          inputData: inputData,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

exports.getCandidateList = (req, res, next) => {
  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  const countData = candidateCount();
  let totalCandidateCount;
  let candidateData = [];

  countData
    .then((count) => {
      totalCandidateCount = count;
      return db.jobSeekerEnrollment.findAll({
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((candidate) => {
      for (let src of candidate) candidateData.push(src);

      res.render("candidate/edit-view-candidate", {
        candidateData: candidate,
        pageTitle: "Candidate",
        path: "/candidate/edit-view-candidate",
        user: userData,
        accountAccess: accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCandidate: totalCandidateCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
        formView: false,
        table: true,
        type: "can"
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
};

exports.getAssignCandidateList = (req, res, next) => {
  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var countData = 0;
  let totalCandidateCount;
  let candidateData = [];
  var dataCount = [];

  if (userData === "ADMIN") {
    getAssignedTaskforAdmin().
      then(result => {
        if (result) {
          console.log(result.length);
          for (let count of result) {
            if (dataCount.length === 0) {
              dataCount.push(count.dataValues.AssignCandidate)
              countData++;
            } else if (!dataCount.includes(count.dataValues.AssignCandidate)) {
              dataCount.push(count.dataValues.AssignCandidate)
              countData++;
            }
          }
          return countData;
        }
      })
      .then((count) => {
        if (count) {
          totalCandidateCount = count;
          return db.jobSeekerEnrollment.findAll({
            where: {
              id: dataCount
            },
            // offset: ITEM_PER_PAGE * (page - 1),
            // limit: ITEM_PER_PAGE,

          });
        }
      })
      .then((candidate) => {
        if (candidate) {
          for (let src of candidate) candidateData.push(src);

          res.render("candidate/edit-view-candidate", {
            candidateData: candidate,
            pageTitle: "Candidate",
            path: "/candidate/edit-view-candidate",
            user: userData,
            accountAccess: accountAccess,
            currentPage: page,
            showingItem: ITEM_PER_PAGE,
            totalCandidate: totalCandidateCount,
            hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
            formView: false,
            table: true,
            type: "asn"
          });
        } else
          res.redirect('/login/index');
      })
      .catch((err) => {
        res.redirect("/login/index");
      });

  } else if (userData !== "ADMIN") {

    getAssignedTask(req.session.userId)
      .then(result => {
        if (result) {

          for (let count of result) {
            if (dataCount.length == 0) {
              dataCount.push(count.dataValues.AssignCandidate)
              countData++;
            } else if (!dataCount.includes(count.dataValues.AssignCandidate)) {
              dataCount.push(count.dataValues.AssignCandidate)
              countData++;
            }
          }
          return countData;
        }
      })
      .then((count) => {
        if (count) {
          totalCandidateCount = count;
          return db.jobSeekerEnrollment.findAll({
            where: {
              id: dataCount
            },
            //offset: ITEM_PER_PAGE * (page - 1),
            //limit: ITEM_PER_PAGE,

          });
        }
      })
      .then((candidate) => {
        if (candidate) {
          for (let src of candidate)
            candidateData.push(src);

          console.log(candidateData, " ---> ", totalCandidateCount);
          res.render("candidate/edit-view-candidate", {
            candidateData: candidate,
            pageTitle: "Candidate",
            path: "/candidate/edit-view-candidate",
            user: userData,
            accountAccess: accountAccess,
            currentPage: page,
            showingItem: ITEM_PER_PAGE,
            totalCandidate: totalCandidateCount,
            hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
            formView: false,
            table: true,
            type: "asn"
          });
        }
        else
          res.redirect('/login/index');
      })
      .catch((err) => {
        console.log("Crash", err);
        res.redirect("/login/index");
      });

  } else {
    res.redirect("/login/index");
  }

};


exports.assignCandidate = (req, res, next) => {
  var page,
    candidateList = [];
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const userData = req.session.user;
  const countData = candidateCount();
  let totalCandidateCount;
  var companyData = [], recruiterList = [];

  countData
    .then((count) => {
      totalCandidateCount = count;
      return db.jobSeekerEnrollment.findAll({
        //offset: ITEM_PER_PAGE * (page - 1),
        //limit: ITEM_PER_PAGE,
      });
    })
    .then((candidate) => {
      candidateList = candidate;
      return db.employeeRegistration.findAll({
        where: {
          [Op.or]: [{
            recruiterType: "FULLTIME_RECRUITER",
          },
          {
            recruiterType: "INTERN_OFF",
          },
          {
            recruiterType: "INTERN_ON",
          },
          {
            recruiterType: "FREELANCER",
          },
          {
            recruiterType: "SUB_VENDOR",
          },
          ],
        },
        attributes: ["id", "fullName"],
      });

    }).then((recruiterList) => {
      recruiterList = recruiterList
      return getAllCompanyName();
    })
    .then(result => {
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }
      }

      res.render("candidate/assign-candidate", {
        candidateData: candidateList,
        recruiter: recruiterList,
        pageTitle: "Candidate",
        path: "/candidate/assign-candidate",
        user: userData,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCandidate: totalCandidateCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
        formView: false,
        table: true,
        companyValue: companyData

      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
};

exports.assignmentDone = (req, res, next) => {

  const userData = req.session.userId;
  const userType = req.session.user;
  const assignCheck = req.body.assignCheck;
  var dataList = [],
    candidateList = [];
  var counter = 0;
  if (assignCheck instanceof Array) {
    for (let src of assignCheck) {
      candidateList.push(+src);
    }
  } else {
    candidateList.push(+assignCheck);
  }

  if (userType === "ADMIN") {
    db.assignCandidate.update({
      AssessmentStatus: "DONE"
    }, {
      where: {
        AssignCandidate: candidateList,
        AssessmentStatus: "PENDING"
      }
    }).then(result => {

      if (result) {
        console.log(result, "Updated successfully...");
        res.redirect("/candidate/callAssignCandidate");
      } else {
        console.log("Updated unsuccessfully...");
        res.redirect("/login/index");
      }

    }).catch(error => {
      console.log("Assign update error", error);
      res.redirect("/login/index");
    })
  }
  else {

    db.assignCandidate.update({
      AssessmentStatus: "DONE"
    }, {
      where: {
        AssignCandidate: candidateList,
        //QuestionerID: userData,
        AssessmentStatus: "PENDING"
      }
    }).then(result => {

      if (result) {
        console.log(result, "Updated successfully...");
        res.redirect("/candidate/callAssignCandidate");
      }
      else {
        console.log("Updated unsuccessfully...");
        res.redirect("/login/index");
      }

    }).catch(error => {
      console.log("Assign update error", error);
      res.redirect("/login/index");
    })
  }

}

exports.setAssignmentToRecruiter = (req, res, next) => {
  console.log(req.body);
  const userData = req.session.user;
  var recruiterId = req.body.recruiter;
  var assignCheck = req.body.assignCheck;
  const freshCandidate = req.body.freshCandidate;
  var dataList = [], candidateList = [];
  var counter = 0;
  var type = null;
  var dataAssign = new Set();
  if(recruiterId){
    recruiterId = recruiterId.split("(")[1].split(")")[0];
  }
  if (assignCheck) {
    if (assignCheck instanceof Array) {
      for (let src of assignCheck) {
        dataAssign.add(src);
        // candidateList.push(src);
      }
      candidateList  = [...dataAssign]
    } else {
      candidateList.push(assignCheck);
    }
  }
  db.assignCandidate.destroy({
    where: {
      AssignCandidate: candidateList,
      //AssignerID: req.session.userId,
    }
  }).then(result => {
    if (result) {
      console.log("Deleted successfully...");
    }
    return db.employeeRegistration
      .findOne({
        where: {
          id: recruiterId,
        }
      })
  }).then(data => {
    console.log('FIND_USER', data)
    if (data) {
      type = data.dataValues.recruiterType;
      if (type === 'MANAGER')
        return null;
      else if (type === 'TEAM_LEADER' || type === 'SUPERVISIOR') {
        counter = 1;
      } else {
        counter = 2;
      }
      return db.managerCount.findAll({
        where: {
          managersId: recruiterId
        }
      })
    } else {
      return null;
    }
  }).then(result => {
    console.log("MANAGER_USER", result);
    if (result && counter !== 0) {
      var managerIdList = [];
      if (Array.isArray(result)) {
        for (let rec of result) {
          for (let src of candidateList) {
            var dataItem = {
              AssignBy: userData,
              QuestionerID: rec.dataValues.managerID,
              AssignCandidate: src,
              AssignerID: req.session.userId
            };
            managerIdList.push(dataItem);
          }
        }
      } else {
        for (let src of candidateList) {
          var dataItem = {
            AssignBy: userData,
            QuestionerID: result.dataValues.managerID,
            AssignCandidate: src,
            AssignerID: req.session.userId
          };
          managerIdList.push(dataItem);
        }
      }
      console.log("MANAGER_USER", managerIdList);
      return db.assignCandidate.bulkCreate(managerIdList, {
        updateOnDuplicate: ["AssignCandidate"]
      });
    } else {
      return null;
    }
  }).then(result => {
    console.log("MANAGER_USER2", result);
    if (result && counter !== 0 && counter !== 1 ) {
      return db.teamLeadCount.findAll({
        where: {
          teamLeadsId: recruiterId
        }
      })
    } else {
      return null;
    }
  }).then(result => {
    console.log('TEAMLEAD', result);
    if (result && counter !== 0 && counter !== 1 ) {
        var teamLeadIdList = [];
        if (Array.isArray(result)) {
          for (let rec of result) {
              for (let src of candidateList) {
                var dataItem = {
                  AssignBy: userData,
                  QuestionerID: rec.dataValues.teamLeadID,
                  AssignCandidate: src,
                  AssignerID: req.session.userId
                };
                teamLeadIdList.push(dataItem);
              }
          }
        } else {
            for (let src of candidateList) {
              var dataItem = {
                AssignBy: userData,
                QuestionerID: result.dataValues.teamLeadID,
                AssignCandidate: src,
                AssignerID: req.session.userId
              };
              teamLeadIdList.push(dataItem);
            }
        }
        return db.assignCandidate.bulkCreate(teamLeadIdList, {
          updateOnDuplicate: ["AssignCandidate"]
        });
    } else {
      return null;
    }
  }).then(result => {
    console.log('SUPEVISIOR', result);
    if (result && counter !== 0 && counter !== 1 ) {
        return db.supervisiorCount.findAll({
          where: {
            supervisiorsId: recruiterId
          }
        })
    } else
      return null;
  }).then(result => {
    console.log('SUPEVISIOR2', result);
    if (result && counter !== 0 && counter !== 1 ) {
        var supervisiorIdList = [];
        if (Array.isArray(result)) {
          for (let rec of result) {
              for (let src of candidateList) {
                var dataItem = {
                  AssignBy: userData,
                  QuestionerID: rec.dataValues.superVisiorID,
                  AssignCandidate: src,
                  AssignerID: req.session.userId
                };
                supervisiorIdList.push(dataItem);
              }
          }
        } else {
          for (let src of candidateList) {
            var dataItem = {
              AssignBy: userData,
              QuestionerID: result.dataValues.superVisiorID,
              AssignCandidate: src,
              AssignerID: req.session.userId
            };
            supervisiorIdList.push(dataItem);
          }
        }
        return db.assignCandidate.bulkCreate(supervisiorIdList, {
          updateOnDuplicate: ["AssignCandidate"]
        });
    } else {
      return null;
    }
  }).then((data) => {
      console.log("RECRUITER ==> ", data);
      for (let src of candidateList) {
        var dataItem = {
          AssignBy: userData,
          QuestionerID: recruiterId,
          AssignCandidate: src,
          AssignerID: req.session.userId
        };
        dataList.push(dataItem);
      }
      return db.assignCandidate.bulkCreate(dataList, {
        updateOnDuplicate: ["AssignCandidate"]
      });
    }).then(result => {
      console.log("Assessment: ", result, ">>>>",assignCheck, ">>>>>>>>",freshCandidate);
      var candidate_list = [];
      if (freshCandidate === 'true') {
        for (let src of candidateList) {
          var dataItem = {
            Assessment: 'none',
            client: null,
            process: null,
            interview: null,
            remark: null,
            questionerId: recruiterId,
            takenBy: type,
            levelOneId: src,
          };
          candidate_list.push(dataItem);
        }
        return db.jobSeekerLeveloneAssesssment.bulkCreate(candidate_list, {
          updateOnDuplicate: ["levelOneId"]
        });
      }
      return null;
    })
    .then((result) => {
      console.log("Level1: ", result);
      console.log(req.body);
      res.redirect("/candidate/filterCandidate");
    })
    .catch((err) => {
      console.log("Err => ", err);
      res.redirect("/");
    });
};

exports.getCandidateViewEdit = (req, res, next) => {
  const candidateId = +req.params.candidateId;
  const view = req.query.view;
  const edit = req.query.edit;
  const deletes = req.query.delete;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;

  var educationId, experienceId;
  var location = [],
    skillSet = [],
    companyData = [],
    companyJobData = [],
    certificate = [],
    preferedIndustryData = [],
    l1AssessmentList = [],
    l2AssessmentList = [],
    l2AssessmentListData = [],
    graduationData = [],
    postGraduationData = [],
    roleTypeData = [],
    industryData = [],
    languageData = [],
    locationData = [],
    locationCityData = [];

  var companyValue = [];
  var personalData,
    educationData,
    experienceData,
    levelOneAssesssment,
    leveltwoAssessment;

  l1AssessmentList = getAssessmentOne();
  l2AssessmentList = getAssessmentTwo();

  if (view) {
    const candidate = findCandidateByID(candidateId);

    candidate
      .then((result) => {
        if (result === null) {
          res.redirect("/company/searchadd");
        } else {
          personalData = result;
          return findCandidatePreferedLocationByID(candidateId);
        }
      })
      .then((result) => {
        if (result) {
          for (let src of result) location.push(src.dataValues.location);
        } else {
          location.push("");
        }
        return findCandidateEducationByID(candidateId);
      })
      .then((data) => {
        if (!data) {
          educationData = null;
          educationId = 0;
        } else {
          educationData = data;
          educationId = data.dataValues.id;
          return getSkillByCandidateID(data.dataValues.id);
        }
      })
      .then((result) => {
        if (result) {
          for (let src of result) skillSet.push(src.dataValues.skill);
        } else {
          skillSet.push("");
        }
        console.log("Edu_Id", educationId);
        return getCertificateByCandidateID(educationId);
      })
      .then((result) => {
        console.log("Edu_Id", educationId, result);
        if (result) {
          for (let src of result) {
            var data = {
              certificateName: src.dataValues.certificateName,
              certificateNumber: src.dataValues.certificateNumber,
            };
            certificate.push(data);
          }
        } else {
          var dataValue = {
            certificateName: "",
            certificateNumber: "",
          };
          certificate.push(dataValue);
        }

        return findCandidateExperienceByID(candidateId);
      })
      .then((data) => {
        if (!data) {
          //res.redirect("/");
          experienceData = null;
          experienceId = 0;
        } else {
          experienceData = data;
          experienceId = data.dataValues.id;
          return findCandidateCompanyByID(data.dataValues.id);
        }
      })
      .then((result) => {
        if (result) {
          //companyData = result;
          for (let src of result) {
            var data = {
              name: src.dataValues.name,
              companyIndustry: src.dataValues.companyIndustry,
              companyRole: src.dataValues.companyRole,
              startDate: src.dataValues.startDate,
              endDate: src.dataValues.endDate,
              Salary: src.dataValues.Salary,
            };
            companyData.push(data);
          }
        }

        return getPreferedJobByCandidateID(experienceId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              preferedIndustry: src.dataValues.preferedIndustry,
              preferedJobRole: src.dataValues.preferedJobRole,
            };
            preferedIndustryData.push(data);
          }
        }
        return findCandidateLevelOne(candidateId);
      })
      .then((result) => {
        if (result) {
          levelOneAssesssment = result;
        } else {
          levelOneAssesssment = null;
        }
        return findCandidateLevelTwo(candidateId);
      })
      .then((result) => {

        if (result) {
          for (let src of result) {
            var data = {
              Assessment: src.dataValues.Assessment,
              Client: src.dataValues.Client,
              process: src.dataValues.process,
              date: src.dataValues.date,
              remark: src.dataValues.remark,
              documentCheck: src.dataValues.documentCheck,
              trainingStatus: src.dataValues.trainingStatus,
              InterviewStatus: src.dataValues.InterviewStatus,
              InterviewRemark: src.dataValues.InterviewRemark,
              addedBy: src.dataValues.addedBy,
            };
            l2AssessmentListData.push(data);
          }
        }

        return getAllCompanyName();

      }).then((result) => {



        if (result) {
          for (let src of result) {
            var companyRole = [];
            for (let data of src.dataValues.CompanyJobs) {
              var dt = {
                id: data.id,
                role: data.role,
                pseudoName: data.pseudoName
              }
              companyRole.push(dt);
            }
            var resData = {
              id: src.dataValues.id,
              name: src.dataValues.company_name,
              roleData: companyRole
            }
            companyValue.push(resData);
          }
        }

        return getLanguageById(candidateId);
      }).then((result) => {

        if (result) {
          if (result instanceof Array && result.length > 0) {
            for (let src of result) {
              var datas = {
                name: src.dataValues.LanguageTitle,
                levelone: src.dataValues.levelone,
                leveltwo: src.dataValues.leveltwo
              }
              languageData.push(datas);
            }
          }
        }

        return getAllCompanyName();
      }).then(result => {

        var companyList = [];
        if (result) {
          for (let src of result) {
            var companyRole = [];
            for (let data of src.dataValues.CompanyJobs) {
              var dt = {
                id: data.id,
                role: data.role,
                pseudoName: data.pseudoName
              }
              companyRole.push(dt);
            }
            var resData = {
              id: src.dataValues.id,
              name: src.dataValues.company_name,
              roleData: companyRole
            }

            companyList.push(resData);
          }
        }

        res.render("candidate/view-candidate", {
          personalData: !personalData ? null : personalData.dataValues,
          educationData: educationData === null ? null : educationData.dataValues,
          experienceData: experienceData === null ? null : experienceData.dataValues,
          locationData: location,
          skillSet: skillSet,
          companyJobData: companyData,
          certificate: certificate,
          preferedIndustryData: preferedIndustryData,
          user: userData,
          accountAccess: accountAccess,
          candidateId: candidateId,
          companyName: companyList,
          languageList: languageData,
          levelOneAssesssment: levelOneAssesssment,
          levelOneTake: levelOneAssesssment ? true : false,
          levelOneTakeFullBody: levelOneAssesssment ? true : false,
          levelTwoTake: l2AssessmentListData.length === 0 ? false : true, //l2AssessmentListData === null || 
          levelTwoTakeFullBody: l2AssessmentListData.length + 1,
          leveltwoAssessment: l2AssessmentListData.length === 0 ? false : true, //l2AssessmentListData === null || 
          l2AssessmentListData: l2AssessmentListData,
          table: false,
          formView: true,
          type: "can",
          companyValue: companyValue
        });
      })
      .catch((err) => {
        console.log("View error ", err);
        res.redirect("/");
      });
  }

  if (edit) {
    const candidate = findCandidateByID(candidateId);
    var languageList = [],
      listLanguage = [], companyValues, sourceValue = [];

    sourceValue = getSource();
    candidate
      .then((result) => {
        if (result === null) {
          res.redirect("/company/searchadd");
        } else {
          personalData = result;
          return findCandidatePreferedLocationByID(candidateId);
        }
      })
      .then((result) => {
        if (result) {
          for (let src of result) location.push(src.dataValues.location);
        }
        return getLanguageById(candidateId);

      }).then(result => {
        if (result) {
          if (result instanceof Array && result.length > 0) {
            for (let src of result) {
              var datas = {
                name: src.dataValues.LanguageTitle,
                levelone: src.dataValues.levelone,
                leveltwo: src.dataValues.leveltwo
              }
              languageList.push(datas);
            }
          }
        }
        return getLanguage();
      }).then(result => {
        if (result) {
          for (let src of result) {
            var datas = {
              name: src.dataValues.LanguageTitle,
            }
            listLanguage.push(datas);
          }
        }

        return findCandidateEducationByID(candidateId);
      })
      .then((data) => {
        if (!data) {
          educationData = null;
          educationId = null;
        } else {
          educationData = data;
          educationId = data.dataValues.id;
        }
        if (educationId) return getSkillByCandidateID(data.dataValues.id);
        else return getSkillByCandidateID(0);
      })
      .then((result) => {
        if (result) {
          for (let src of result) skillSet.push(src.dataValues.skill);
        }
        if (educationId) return getCertificateByCandidateID(educationId);
        else return getCertificateByCandidateID(0);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              certificateName: src.dataValues.certificateName,
              certificateNumber: src.dataValues.certificateNumber,
            };
            certificate.push(data);
          }
        }
        return findCandidateExperienceByID(candidateId);
      })
      .then((data) => {
        if (data === null) {
          // res.redirect("/");
          // next();
          experienceData = null;
          experienceId = null;
        } else {
          experienceData = data;
          experienceId = data.dataValues.id;
        }
        if (experienceId) return findCandidateCompanyByID(data.dataValues.id);
        else return findCandidateCompanyByID(0);
      })
      .then((result) => {
        //companyData = result;
        if (result) {
          //companyData = result;
          for (let src of result) {
            var data = {
              name: src.dataValues.name,
              companyIndustry: src.dataValues.companyIndustry,
              companyRole: src.dataValues.companyRole,
              startDate: src.dataValues.startDate,
              endDate: src.dataValues.endDate,
              Salary: src.dataValues.Salary,
            };
            companyJobData.push(data);
          }
        }

        if (experienceId) return getPreferedJobByCandidateID(experienceId);
        else return getPreferedJobByCandidateID(0);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              preferedIndustry: src.dataValues.preferedIndustry,
              preferedJobRole: src.dataValues.preferedJobRole,
            };
            preferedIndustryData.push(data);
          }
        }

        return findCandidateLevelOne(candidateId);
      })
      .then((result) => {
        if (result) {
          // console.log("L1 ==> ", result);
          levelOneAssesssment = result;
          companyValues = result.dataValues.client;
        } else {
          levelOneAssesssment = null;
        }
        return findCandidateLevelTwo(candidateId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              id: src.dataValues.id,
              Assessment: src.dataValues.Assessment,
              Client: src.dataValues.Client,
              process: src.dataValues.process,
              date: src.dataValues.date,
              remark: src.dataValues.remark,
              documentCheck: src.dataValues.documentCheck,
              trainingStatus: src.dataValues.trainingStatus,
              InterviewStatus: src.dataValues.InterviewStatus,
              InterviewRemark: src.dataValues.InterviewRemark,
              addedBy: src.dataValues.addedBy,
              leveltwoId: src.dataValues.leveltwoId
            };
            l2AssessmentListData.push(data);
          }
        }
        return db.graduationCourse.findAll();
      })
      .then((result) => {
        if (result) {
          graduationData.push("--Select--");
          for (let src of result) {
            graduationData.push(
              src.dataValues.course + "-" + src.dataValues.subject
            );
          }
        }
        return db.postGraduationCourse.findAll();
      })
      .then((result) => {
        if (result) {
          postGraduationData.push("--Select--");
          for (let src of result) {
            postGraduationData.push(
              src.dataValues.PGCourse + "-" + src.dataValues.PGSubject
            );
          }
        }
        let PreferedIndustry = getPreferedIndustry();
        return PreferedIndustry;

      })
      .then((result) => {
        if (result) {
          industryData.push("--Select--");
          for (let src of result) {
            industryData.push(src.dataValues.IndustryName);
          }
        }
        return getPreferedJob();
      })
      .then((result) => {
        if (result) {
          roleTypeData.push("--Select--");
          for (let src of result) {
            roleTypeData.push(src.dataValues.JobTitle);
          }
        }
        return db.locationCityData.findAll();
      })
      .then((result) => {
        //console.log("Location_Data", result);
        if (result) {
          locationData.push("--Select--");
          for (let src of result) {
            locationData.push(src.dataValues.locationCity);
            locationCityData.push(src.dataValues.locationCity + "~" + src.dataValues.locationState);
          }
        }
        //console.log("Location_City_Data", locationData, location);
        return getAllComapanyName();
      }).then(result => {
        var companyData = [];
        if (result) {
          for (let src of result) {
            var companyRole = [];
            for (let data of src.dataValues.CompanyJobs) {
              var dt = {
                id: data.id,
                role: data.role,
                pseudoName: data.pseudoName
              }
              companyRole.push(dt);
            }
            var resData = {
              id: src.dataValues.id,
              name: src.dataValues.company_name,
              roleData: companyRole
            }
            companyData.push(resData);
          }
        }
        var candidateLanguauge = [];
        //console.log('COMPANY +++++>  ', companyData);

        if (languageList.length > 0) {
          for (let sr of languageList) {
            candidateLanguauge.push(sr);
          }

          for (var i = 0; i < candidateLanguauge.length; i++) {
            for (var j = 0; j < listLanguage.length; j++) {
              if (listLanguage[j].name === candidateLanguauge[i].name) {
                listLanguage.splice(j, 1);
              }
            }
          }
        }

        var locData = []
        if (location.length > 0) {
          candidateLanguauge = [];
          for (let sr of location) {
            candidateLanguauge.push(sr);
          }

          for (var i = 0; i < candidateLanguauge.length; i++) {
            for (var j = 0; j < locationData.length; j++) {
              if (locationData[j].locationCity === candidateLanguauge[i].location) {
                locationData.splice(j, 1);
              }
            }
          }
          locData = locationData;
        }


        res.render("candidate/editCandidate", {
          personalData: !personalData ? null : personalData.dataValues,
          educationData: !educationData ? null : educationData.dataValues,
          experienceData: !experienceData ? null : experienceData.dataValues,
          location: location,
          skillSet: skillSet,
          locData: locData,
          companyData: companyData,
          languageList: languageList,
          locationCityData: locationCityData,
          listLanguage: listLanguage,
          certificate: certificate,
          locationData: locationData,
          accountAccess: accountAccess,
          companyJobData: companyJobData,
          graduationData: graduationData,
          postGraduationData: postGraduationData,
          roleTypeData: roleTypeData,
          industryData: industryData,
          preferedIndustryData: !preferedIndustryData ?
            null : preferedIndustryData,
          user: userData,
          candidateId: candidateId,
          companyAssessment: companyData,
          levelOneAssesssment: !levelOneAssesssment ?
            null : levelOneAssesssment,
          l2AssessmentListData: l2AssessmentListData,
          sourceValue: sourceValue,
          table: false,
          formView: true,
          type: "can"
        });
      })
      .catch((err) => {
        console.log("##########",err, "###############");
        res.redirect("/");
      });
  }

  if (deletes) {
    var educationKey, experienceKey;
    var ids = [], finalId = [];
    const candidate = findCandidateByID(candidateId);

    candidate.then(result => {
      console.log("DELETE_CAN_ID", result);
      if (result) {
        console.log("DELETE_CAN_ID_", result);
        return db.job_language.destroy({
          where: {
            langugeId: candidateId
          }
        });
      }
    })
      // .then(result => {
      // var lId = []
      // console.log("DELETE_CAN_LANG", result);
      // if (result) { 
      //     console.log("DELETE_CAN_LANG_", result);

      //   for (let src of result) { 
      //     lId.push(src.dataValues.id);
      //     return db.job_language.destroy({
      //       where: {
      //         id: lId
      //       }
      //     });
      //   }
      // }
      // }
      .then(result => {

        console.log('DELETE LANGUAGE', result);
        return db.jobSeekerPreferedLocation.destroy({
          where: {
            candidateId: candidateId
          }
        });

      }).then(result => {

        console.log('DELETE LOCATION', result);
        return db.jobSeekerEducationEnrollment.findOne({
          where: {
            candidateId: candidateId
          }
        });
      }).then(result => {
        if (result) {
          educationKey = result.dataValues.id
          return db.jobSeekerPreferedSkillset.destroy({
            where: {
              candidateId: educationKey
            }
          })
        } else
          educationKey = 0;
      }).then(result => {
        console.log('DELETE SKILL', result);

        return db.jobSeekerPreferedCertificate.destroy({
          where: {
            candidateId: educationKey
          }
        })

      }).then(result => {
        console.log('DELETE CERTIFICATE', result);

        return db.jobSeekerEducationEnrollment.destroy({
          where: {
            candidateId: candidateId
          }
        })


      }).then(result => {
        console.log('DELETE EDUCATION', result);
        return db.jobSeekerExperienceData.findOne({
          where: {
            candidateId: candidateId
          }
        });

      }).then(result => {
        if (result) {
          experienceKey = result.dataValues.id
          return db.jobSeekerCompanyData.destroy({
            where: {
              candidateId: experienceKey
            }
          })
        } else {
          experienceKey = 0;
        }
      }).then(result => {
        console.log('DELETE COMPANY', result);
        return db.jobSeekerPreferedIndustry.destroy({
          where: {
            candidateId: experienceKey
          }
        })

      }).then(result => {
        console.log('DELETE INDUSTRY', result);
        //if(result)
        return db.jobSeekerExperienceData.destroy({
          where: {
            candidateId: candidateId
          }
        })
      }).then(result => {
        console.log('DELETE EXPERIENCE', result);
        return db.jobSeekerLeveloneAssesssment.findAll({
          where: {
            levelOneId: candidateId
          }
        })
      }).then(result => {
        if (result)
          var Oid = [];
        for (let src of result)
          Oid.push(src.dataValues.id)
        return db.jobSeekerLeveloneAssesssment.destroy({
          where: {
            id: Oid
          }
        })
      }).then(result => {
        console.log('DELETE ONE', result);
        return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
          where: {
            leveltwoId: candidateId
          }
        })
      })
      .then(result => {
        if (result) {
          for (let src of result)
            finalId.push(src.dataValues.id);
          return db.jobSeekerLevelFinalAssesssment.destroy({
            where: {
              FinalAssessmentId: finalId
            }
          })
        } else
          return true;
      }).then(result => {
        console.log('DELETE FINAL', result);

        return db.jobSeekerLeveltwoExpandedAssesssment.destroy({
          where: {
            leveltwoId: candidateId
          }
        })
      })
      .then(result => {
        console.log('DELETE TWO', result);
        return db.jobSeekerEnrollment.destroy({
          where: {
            id: candidateId
          }
        })
      }).then(result => {
        res.redirect('/candidate/getAllCandidate');
      }).catch(err => {
        console.log("Err", err)
        res.redirect('/login/index');
      })
  }
};

exports.deleteLevelOne = (req, res, next) => {
  const candidateId = +req.params.candidateId;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;


  db.jobSeekerLeveloneAssesssment.destroy({
    where: {
      levelOneId: candidateId
    }
  }).then(result => {
    res.redirect('/candidate/levelTwoSelect');
  }).catch(err => {
    console.log("Err", err)
    res.redirect('/login/index');
  })
}

exports.getSearchFilter = (req, res, next) => {

  const userData = req.session.user;
  const id = req.session.userId;
  var listValue = [];
  var dataT = [];
  var companyData = [];
  getEmployeeDataList(id).then(result => {

    if (result) {
      for (let src of result) {
        var data = {
          id: src.dataValues.id,
          fullName: src.dataValues.fullName
        }
        listValue.push(data);
      }

    }
    return db.jobSeekerEnrollment.findAll({
      attributes: [
        [db.Sequelize.fn('DISTINCT', db.Sequelize.col('datatype')), 'datatype'],
      ]
    });
  }).then(result => {

    if (result) {

      for (let src of result) {
        if (src !== 'INTERNAL')
          dataT.push(src.dataValues.datatype);
      }

    }

    return getAllComapanyName();


  }).then((result) => {
    
    if (result) {
      for (let src of result) {
        var companyRole = [];
        for (let data of src.dataValues.CompanyJobs) {
          var dt = {
            id: data.id,
            role: data.role,
            pseudoName: data.pseudoName
          }
          companyRole.push(dt);
        }
        var resData = {
          id: src.dataValues.id,
          name: src.dataValues.company_name,
          roleData: companyRole
        }
        companyData.push(resData);
      }
    }
    return getSkillData();
   }).then(result =>{
    var skill = new Set();
    if(result){
      for (let src of result) {
        skill.add(src.dataValues.skill)
      }
    }
    let skillType = [...skill];
    skillType = skillType.filter(e => e)
    console.log(skillType)
    res.render("includes/searchFilter", {
      pageTitle: "Candidate",
      path: "/includes/searchFilter",
      user: userData,
      dataT: dataT,
      listValue: listValue,
      companyValue: companyData,
      skillData: skillType
    });

  }).catch(err => {
    console.log(err)
  })

};

exports.recuiterSearchWindow = (req, res, next) => {

  const userData = req.session.user;
  res.render("includes/recruiter_search_filter", {
    pageTitle: "Search Candidate",
    path: "/includes/recruiter_search_filter",
    user: userData,
    window: false,
    text: "No Record found!",
    list: []
  });

}


exports.getRecruiterSearchResult = (req, res, next) => {

  var data = [], candidateList = [], candidateDataList = [], tempList = [], _idList = [], emp_can_list = [];
  var levelTwoWhereStatement = {};
  const userData = req.session.user;
  const userId = req.session.userId;

  const myName =
    !req.body.myName ?
      null :
      req.body.myName;

  const mymobile =
    !req.body.mymobile ?
      null :
      req.body.mymobile;

  const myemail =
    !req.body.myemail ?
      null :
      req.body.myemail;

  var whereStatement = {};

  if (mymobile) {
    whereStatement.phoneNumberOne = {
      [db.Op.like]: "%" + mymobile + "%",
    };
  }

  if (myName) {
    whereStatement.fullName = {
      [db.Op.like]: "%" + myName + "%"
    }
  }

  if (myemail) {
    whereStatement.emailOne = {
      [db.Op.like]: "%" + myemail + "%",
    };
  }

  var ass_can = [];
  var listData;
  db.assignCandidate.findAll({
    where: {
      QuestionerID: userId,
    },
    attributes: ["AssignCandidate", "QuestionerID"],
  }).then(result => {
    if (result) {
      for (let src of result) {
        candidateList.push(src.dataValues.AssignCandidate);
        var d = {
          'cid': src.dataValues.AssignCandidate,
          'eid': src.dataValues.QuestionerID
        }
        ass_can.push(d);
      }
    }
    return db.jobSeekerEnrollment.findAll({
      // where: {
      //   empID: userId
      // }
    });
  }).then(result => {
    if (result) {
      for (let src of result) {
        candidateList.push(src.dataValues.id);
      }
    }
  }).then(result => {
    if (candidateList.length > 0) {
      listData = new Set(candidateList);
      whereStatement.id = candidateList;
    }

    if (JSON.stringify(whereStatement) !== '{}') {
      db.jobSeekerEnrollment
        .findAll({
          where: whereStatement,
          include: [{
            model: db.jobSeekerLeveloneAssesssment
          }]
        }).then(result => {

          if (result) {
            tempList = result;
            for (let src of result) {
              candidateDataList.push(src.dataValues.id);
            }

            if (candidateDataList !== null && candidateDataList.length > 0) {
              levelTwoWhereStatement.leveltwoId = candidateDataList;
              return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
                where: levelTwoWhereStatement
              });
            } else {
              return db.jobSeekerLeveltwoExpandedAssesssment.findAll();
            }
          }
          return null;
        }).then(result => {
          candidateList = [];
          if (result && result.length > 0) {
            for (let src of tempList) {
              for (let rs of result) {
                if (rs.dataValues.leveltwoId === src.dataValues.id) {
                  console.log(listData.has(src.dataValues.id));
                  var data = {
                    id: src.dataValues.id,
                    name: src.dataValues.fullName,
                    eName: src.dataValues.employeeName,
                    l_two_Id: rs.dataValues.id,
                    l_two_status: rs.dataValues.Assessment,
                    l_two_client: rs.dataValues.Client,
                    l_two_process: rs.dataValues.process,
                    l_two_interviewDate: rs.dataValues.date,
                    l_two_InterviewStatus: rs.dataValues.InterviewStatus,
                    mobone: src.dataValues.phoneNumberOne,
                    mobtwo: src.dataValues.phoneNumberTwo,
                    createdDate: getDateOnly(src.dataValues.createdAt),
                    CandidateID: src.dataValues.CandidateID,
                    l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.Assessment ? src.dataValues.JobSeekerLevelOneAssessment.Assessment : null,
                    l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.client ? src.dataValues.JobSeekerLevelOneAssessment.client : null,
                    l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.process ? src.dataValues.JobSeekerLevelOneAssessment.process : null,
                    l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.interview ? src.dataValues.JobSeekerLevelOneAssessment.interview : null,
                    ediatble: listData !== null && listData instanceof Set && listData.has(src.dataValues.id)
                  }
                  candidateList.push(data);
                  _idList.push(src.dataValues.id);
                }
              }
            }

          }
          else {
            for (let src of tempList) {
              console.log(listData.has(src.dataValues.id));

              var data = {
                id: src.dataValues.id,
                name: src.dataValues.fullName,
                eName: src.dataValues.employeeName,
                l_two_Id: "",
                l_two_status: "",
                l_two_client: "",
                l_two_process: "",
                l_two_interviewDate: "",
                l_two_InterviewStatus: "",
                mobone: src.dataValues.phoneNumberOne,
                mobtwo: src.dataValues.phoneNumberTwo,
                createdDate: getDateOnly(src.dataValues.createdAt),
                CandidateID: src.dataValues.CandidateID,
                l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.Assessment ? src.dataValues.JobSeekerLevelOneAssessment.Assessment : null,
                l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.client ? src.dataValues.JobSeekerLevelOneAssessment.client : null,
                l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.process ? src.dataValues.JobSeekerLevelOneAssessment.process : null,
                l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.interview ? src.dataValues.JobSeekerLevelOneAssessment.interview : null,
                ediatble: listData !== null && listData instanceof Set && listData.has(src.dataValues.id)
              }
              candidateList.push(data);
              _idList.push(src.dataValues.id);
            }
          }
          return getEmployeeList()
        }).then((result) => {
          if (result && result.length > 0) {
            empList = result;
          }
          return getAssignerList(_idList);
        }).then(result => {
          if (result && result.length > 0) {
            for (let em of empList) {
              for (let rs of result) {
                if (em.dataValues.id === rs.dataValues.QuestionerID) {
                  var data = {
                    empName: em.dataValues.fullName,
                    canId: rs.dataValues.AssignCandidate
                  }
                  emp_can_list.push(data);
                }
              }
            }
          }

          return getAllCompanyName();
        }).then(result => {
          var companyData = [];
          if (result && result.length > 0) {
            for (let src of result) {
              var companyRole = [];
              for (let data of src.dataValues.CompanyJobs) {
                var dt = {
                  id: data.id,
                  role: data.role,
                  pseudoName: data.pseudoName
                }
                companyRole.push(dt);
              }
              var resData = {
                id: src.dataValues.id,
                name: src.dataValues.company_name,
                roleData: companyRole
              }
              companyData.push(resData);
            }
          }
          res.render("includes/recruiter_search_filter", {
            pageTitle: "Search Candidate",
            path: "/includes/recruiter_search_filter",
            user: userData,
            window: candidateList.length > 0 ? true : false,
            candidateData: candidateList,
            text: candidateList.length > 0 ? "Record found!" : "No Record found!",
            companyValue: companyData,
            empList: emp_can_list,
            assigner: ass_can,
            userId: userId
          });
        }).catch(err => {
          res.redirect('/login/index');
        });
    } else {
      res.render("includes/recruiter_search_filter", {
        pageTitle: "Search Candidate",
        path: "/includes/recruiter_search_filter",
        user: userData,
        window: false,
        text: "Please select search criteria first!",
        candidateData: [],
        companyValue: [],
        empList: [],
        assigner: [],
        userId: userId
      });
    }
  }).catch(err => {
    res.redirect('/login/index');
  });

}

exports.callFreshCandidate = (req, res, next) => {


  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [], candidateList = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  var totalCandidateCount = 0;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;
  var list = [], candidateList = [];

  if (userData === "ADMIN") {
    getFreshCandidateCount()
      .then(result => {
        if (result) {
          if (result instanceof Array)
            totalCandidateCount = result.length;
          return getFreshCandidate(ITEM_PER_PAGE, ITEM_PER_PAGE * (page - 1))
        }
        else {
          res.redirect('/login/index');
        }
      }).then(result => {
        if (result) {
          getFreshCandidateList(result, userData, access, page, totalCandidateCount, totalCandidateCount, res);
        }
        else {
          res.redirect('/login/index');
        }
      })
      .catch(error => {
        res.redirect('/login/index');
      })
  }
  else {
    db.sequelize.query(`
  SELECT(AssignCandidateTables.AssignCandidate) from AssignCandidateTables WHERE AssignCandidateTables.QuestionerID = `+ userID + `
      AND AssignCandidateTables.AssignCandidate IN(SELECT DISTINCT(JobSeekerEnrollmentPersonalData.id)
      FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments ON
    (JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id) LEFT JOIN
      JobSeekerLevelTwoAssessmentExpandLevels ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
      where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
      JobSeekerLevelOneAssessments.Assessment IS NULL)`, {
      type: db.Sequelize.QueryTypes.SELECT
    }).then(result => {

      if (result) {
        if (result instanceof Array)
          totalCandidateCount = result.length;
      }
      return db.sequelize.query(`
  SELECT(AssignCandidateTables.AssignCandidate) from AssignCandidateTables WHERE AssignCandidateTables.QuestionerID = `+ userID + `
      AND AssignCandidateTables.AssignCandidate IN(SELECT DISTINCT(JobSeekerEnrollmentPersonalData.id)
      FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments ON
    (JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id) LEFT JOIN
      JobSeekerLevelTwoAssessmentExpandLevels ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
      where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
      JobSeekerLevelOneAssessments.Assessment IS NULL)`+ ` limit ` + ITEM_PER_PAGE + ` offset ` + ITEM_PER_PAGE * (page - 1), {
        type: db.Sequelize.QueryTypes.SELECT
      })

    })
      // .then(result => {
      //   if (result) {
      //     for (let src of result)
      //       list.push(src.id)

      //     return db.assignCandidate.findAll({
      //       where: {
      //         QuestionerID: userID,
      //         AssignCandidate: {
      //           [db.Op.in]: list
      //         }
      //       },
      //       attributes: ["AssignCandidate"],
      //     });
      //   }
      // })
      .then(result => {
        if (result) {

          for (let src of result) {
            // candidateList.push(src.dataValues.AssignCandidate);
            candidateList.push(src.AssignCandidate);
          }


          return getFreshCandidateByIds(candidateList);
        }
      }).then(result => {
        if (result) {
          getFreshCandidateList(result, userData, access, page, totalCandidateCount, totalCandidateCount, res);
        } else {
          res.redirect('/login/index');
        }
      }).catch(err => {
        res.redirect('/login/index');
      })
  }

};
 
exports.getSearchList = (req, res, next) => {
  // console.log(req);
  var data = [];
  var temp = 0;
  var companyDataList = [], candidateList = [], recruiterList = [], emp_can_list = [], empList = [];
  var _idList = [], tempList = [], candidateIDList = [], Del_List = [];
  var page = 1;
  const candidateOption = req.body.candidateOption ? req.body.candidateOption : null;
  var assignersname = req.body.assignersname ? req.body.assignersname : null;
  if(assignersname){
    assignersname = assignersname.split("(")[1].split(")")[0];
  }
  var recruiter = req.body.Recruiter ? req.body.Recruiter : null;
  if(recruiter){
    recruiter = recruiter.split("(")[1].split(")")[0];
  }
  const dateCreated = req.body.dateCreated ? req.body.dateCreated : null;
  const userData = req.session.user;
  const userId = req.session.userId;
  const billingStatus = req.body.billinStatus;
  const from = req.body.from ? req.body.from : null;
  const to = req.body.to ? req.body.to : null;
  var any = !req.body.any ? null : req.body.any;
  var all =
    !req.body.all ?
      null :
      req.body.all;
  var exclude =
    !req.body.exclude ?
      null :
      req.body.exclude;
  const candidateID =
    !req.body.candidateID ?
      null :
      req.body.candidateID;
  const birthday =
    !req.body.birthday ?
      null :
      req.body.birthday;
  const preferedIndustry =
    !req.body.preferedIndustry ?
      null :
      req.body.preferedIndustry;
  const preferedJobRole =
    !req.body.preferedJobRole ?
      null :
      req.body.preferedJobRole;
  const source =
    !req.body.source ?
      null :
      req.body.source;
  const Hometown =
    !req.body.Hometown ?
      null :
      req.body.Hometown;
  const Company =
    !req.body.Company ?
      null :
      req.body.Company;
  const CompanySector =
    !req.body.CompanySector ?
      null :
      req.body.CompanySector;
  const createdDate =
    !req.body.createdDate ?
      null :
      req.body.createdDate;
  const currentLocation =
    !req.body.currentLocation ?
      null :
      req.body.currentLocation;
  const preferedJobType =
    !req.body.preferedJobType ?
      null :
      req.body.preferedJobType;
  const preferedJobShift =
    !req.body.preferedJobShift ?
      null :
      req.body.preferedJobShift;
  const myName =
    !req.body.myName ?
      null :
      req.body.myName;
  const preferedLocation =
    !req.body.preferedLocation ?
      null :
      req.body.preferedLocation;
  const salarymin =
    !req.body.salarymin ?
      null :
      req.body.salarymin;
  const salarymax =

    !req.body.salarymax ?
      null :
      req.body.salarymax;
  const myten =
    !req.body.myten ?
      null :
      req.body.myten;
  const ug =
    !req.body.ug ?
      null :
      req.body.ug;
  const ugdate =
    !req.body.ugdate ?
      null :
      req.body.ugdate;
  const levelone =
    !req.body.levelone ?
      null :
      req.body.levelone;
  const leveltwo =
    !req.body.leveltwo ?
      null :
      req.body.leveltwo;
  const mymobile =
    !req.body.mymobile ?
      null :
      req.body.mymobile;
  const myemail =
    !req.body.myemail ?
      null :
      req.body.myemail;
  const minage =
    !req.body.minage ?
      0 :
      req.body.minage;
  const maxage =
    !req.body.maxage ?
      0 :
      req.body.maxage;
  const mytype =
    !req.body.mytype ?
      null :
      req.body.mytype;
  const myCertificate =

    !req.body.myCertificate ?
      null :
      req.body.myCertificate;
  const language =
    !req.body.language ?
      null :
      req.body.language;
  const languagelevel =
    !req.body.languagelevel ?
      null :
      req.body.languagelevel;
  const graduation =
    !req.body.graduation ?
      null :
      req.body.graduation;
  const graduationDate =
    !req.body.graduationDate ?
      null :
      req.body.graduationDate;
  const pg =
    !req.body.pg ?
      null :
      req.body.pg;
  const pgdate =
    !req.body.pgdate ?
      null :
      req.body.pgdate;

  const processsLevelTwo = req.body.processs != -1 ? req.body.processs : null;

  const processLevelOne = req.body.process != -1 ? req.body.process : null;

  const dataTypes = !req.body.dataTypes ?
    null :
    req.body.dataTypes;

  const InterviewStatus = !req.body.InterviewStatus ? null :
    req.body.InterviewStatus;

  var minDate = new Date().getFullYear();
  minDate = minDate - +minage;

  var maxDate = new Date().getFullYear();
  maxDate = maxDate - +minage;

  var languageT = {};
  if (language) languageT.LanguageTitle = {
    [db.Op.like]: "%" + language + "%",
  };
  if (languagelevel) languageT.levelone = {
    [db.Op.like]: "%" + languagelevel + "%",
  };
  if (languagelevel) languageT.leveltwo = {
    [db.Op.like]: "%" + languagelevel + "%",
  };

  let _any = []; 
  if (any) { 
    any = any.trim();
    if (any.includes(',')) {
      _any = any.split(",");
    } else {
      _any.push(any);
    }
  }

  let _all = [];
  if (all) {
    all = all.trim();
    if (all.includes(','))
      _all = all.split(",");
    else
      _all.push(all);
  }

  let _exclude = [];
  if (exclude) {
    exclude = exclude.trim();
    if (exclude.includes(","))
      _exclude = exclude.split(",");
    else
      _exclude.push(exclude);
  }

  if (_exclude.length !== 0 && _any.length !== 0) {
    _exclude = _exclude.filter(x => !_any.includes(x));
  }

  var whereStatement = {}, levelOneWhereStatement = {}, levelTwoWhereStatement = {}, finalLevelStatement = {}, skillSetStatement = {};
  var jobSeekerEnrollmentPersonalDataWhereStatement = " WHERE JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND " +
    " JobSeekerLevelOneAssessments.Assessment IS NULL ";

  if (_exclude.length !== 0 && _any.length !== 0) {
    skillSetStatement.skill = {
      [Op.and]: {
        [Op.or]: _any,
        [Op.notIn]: _exclude
      }
    }
  }
  else if (_exclude.length !== 0) {
    skillSetStatement.skill = {
      [Op.notIn]: _exclude
    }
  }
  else if (_any.length !== 0) {
    skillSetStatement.skill = {
      [Op.in]: _any,
    }
  }

  var billList = [];
  var onlyBillStatus = true;
  if (billingStatus) {
    if (billingStatus.indexOf(',') > -1) {
      finalLevelStatement.BilingStatus = {
        [Op.in]: billingStatus.split(',')
      }
    } else {
      billList.push(billingStatus)
      finalLevelStatement.BilingStatus = billingStatus;
    }
  }

  if (createdDate) {
    onlyBillStatus = false;
    whereStatement.createdAt = createdDate;
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.createdAt = " + createdDate;
  }

  if (mymobile) {
    onlyBillStatus = false;
    whereStatement.phoneNumberOne = {
      [db.Op.like]: "%" + mymobile + "%",
    };
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.phoneNumberOne LIKE '%" + mymobile + "%' ";
  }

  if (myName) {
    onlyBillStatus = false;
    whereStatement.fullName = {
      [db.Op.like]: "%" + myName + "%"
    }
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.fullName LIKE '%" + myName + "%' ";

  }


  if (dataTypes) {
    onlyBillStatus = false;
    if (dataTypes.indexOf(',') > -1) {
      var isData = dataTypes.split(',')
      whereStatement.datatype = {
        [db.Op.in]: isData
      }
      // for (var i = 0; i < isData.length; i++) {
      //   isData[i] = `'` + isData[i] + `'`;
      // }
      jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.datatype IN (" + isData + ") ";

    } else {
      whereStatement.datatype = dataTypes;
      jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.datatype IN ('" + dataTypes + "') ";
    }
  }
  // console.log(jobSeekerEnrollmentPersonalDataWhereStatement)
  // return;
  if (myemail) {
    onlyBillStatus = false;
    whereStatement.emailOne = {
      [db.Op.like]: "%" + myemail + "%",
    };
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.emailOne LIKE '%" + myemail + "%' ";

  }


  if (candidateID) {
    onlyBillStatus = false;
    whereStatement.CandidateID = {
      [db.Op.like]: "%" + candidateID + "%",
    };
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.CandidateID LIKE '%" + candidateID + "%' ";
  }


  if (birthday) {
    onlyBillStatus = false;
    whereStatement.dob = birthday;
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.dob = " + birthday;
  }

  var iDate = new Date(dateCreated);
  var iiDate = new Date(dateCreated);
  var gDate = new Date(iDate.setDate(iDate.getDate() + 1));

  if (dateCreated) {
    onlyBillStatus = false;
    whereStatement.createdAt = {
      [Op.lt]: gDate,
      [Op.gt]: iiDate
    }
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.createdAt  BETWEEN " + iiDate + " AND " + gDate;

  }

  if (recruiter) {
    onlyBillStatus = false;
    whereStatement.empID = recruiter;
    jobSeekerEnrollmentPersonalDataWhereStatement += " AND JobSeekerEnrollmentPersonalData.empID  = " + recruiter;
  }

  var educationalData = {};

  if (myten)
    educationalData.highscoolDate = myten;
  if (ug) educationalData.Intermediate = ug;
  if (ugdate) educationalData.IntermediateDate = ugdate;
  if (graduation) educationalData.graduation = graduation;
  if (graduationDate) educationalData.graduationDate = graduationDate;
  if (pg) educationalData.postGraduation = pg;
  if (pgdate) educationalData.postGraduationDate = pgdate;
  if (mytype) educationalData.typingSpeed = mytype;

  var locationData = {};

  if (preferedLocation) locationData.location = preferedLocation;

  var experienceData = {};

  if (preferedJobType) experienceData.preferedJobType = preferedJobType;

  if (preferedJobShift) experienceData.preferedShift = preferedJobShift;

  var companyData = {};

  if (Company) companyData.name = Company;

  if (CompanySector) companyData.companyIndustry = CompanySector;

  var preferedIndustryData = {};

  if (preferedIndustry)
    preferedIndustryData.preferedIndustry = preferedIndustry;

  if (preferedJobRole)
    preferedIndustryData.preferedJobRole = preferedJobRole;

  if (leveltwo) {
    onlyBillStatus = false;
    if (leveltwo.indexOf(',') > -1) {
      var isData = leveltwo.split(',')
      levelTwoWhereStatement.Assessment = {
        [Op.in]: isData
      }
    } else {
      levelTwoWhereStatement.Assessment = leveltwo;
    }
  }

  const clientLevelOne = req.body.client;

  if (clientLevelOne) {
    onlyBillStatus = false;
    if (clientLevelOne.indexOf(',') > -1) {
      var isData = clientLevelOne.split(',')
      levelOneWhereStatement.client = {
        [Op.in]: isData
      }
    } else {
      levelOneWhereStatement.client = clientLevelOne;
    }
  }

  const clientLevelTwo = req.body.clients;

  if (clientLevelTwo) {
    onlyBillStatus = false;
    if (clientLevelTwo.indexOf(',') > -1) {
      var isData = clientLevelTwo.split(',')
      levelTwoWhereStatement.Client = {
        [Op.in]: isData
      }
    } else {
      levelTwoWhereStatement.Client = clientLevelTwo;
    }
  }
  var data_ = null;
  if (levelone) {
    onlyBillStatus = false;
    if (levelone.indexOf(',') > -1) {
      var isData = levelone.split(',')
      levelOneWhereStatement.Assessment = {
        [Op.in]: isData
      }
    } else {
      levelOneWhereStatement.Assessment = levelone;
    }
  }

  if (InterviewStatus) {
    onlyBillStatus = false;
    if (InterviewStatus.indexOf(',') > -1) {
      var isData = InterviewStatus.split(',')
      levelTwoWhereStatement.InterviewStatus = {
        [Op.in]: isData
      }
    } else {
      levelTwoWhereStatement.InterviewStatus = InterviewStatus;
    }
  }
  
  db.assignCandidate.findAll({
    where: {
      QuestionerID: assignersname,
    },
    attributes: ["AssignCandidate"],
  }).then(result => {
    if (result) {
      var _data = new Set();
      for (let src of result) {
        _data.add(src.dataValues.AssignCandidate);
        // candidateIDList.push(src.dataValues.AssignCandidate);
      }
      for(let l of _data){
        candidateIDList.push(l);
      }
    }
    return null;
  }).then(result => {
    if (candidateIDList.length > 0) {
      whereStatement.id = candidateIDList;
    }
    if (candidateOption && candidateOption === 'FRESH') {
      data_ = getFreshCandidateBySearchCriteria(jobSeekerEnrollmentPersonalDataWhereStatement);
    }
    else {
      if (JSON.stringify(levelOneWhereStatement) !== '{}') {
        if (JSON.stringify(educationalData) !== '{}' && JSON.stringify(skillSetStatement) !== '{}') {
          console.log("1A")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                where: levelOneWhereStatement,
                required: true
              },
              {
                model: db.jobSeekerEducationEnrollment,
                where: educationalData,
                include:
                {
                  model: db.jobSeekerPreferedSkillset,
                  where: skillSetStatement,
                  required: true
                },
                required: true
              }]
            })
        } else if (JSON.stringify(educationalData) !== '{}') {
          console.log("2A")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                where: levelOneWhereStatement,
                required: true
              },
              {
                model: db.jobSeekerEducationEnrollment,
                where: educationalData,
                required: true
              }]
            })
        } else if (JSON.stringify(skillSetStatement) !== '{}') {
          console.log("3A")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                where: levelOneWhereStatement,
                required: true
              },
              {
                model: db.jobSeekerEducationEnrollment,
                include:
                {
                  model: db.jobSeekerPreferedSkillset,
                  where: skillSetStatement,
                  required: true
                },
                required: true
              }]
            })
        }else { 
          console.log("4A")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                where: levelOneWhereStatement,
                required: true
              }]
            })
        }
      } else {
        if (JSON.stringify(educationalData) !== '{}' && JSON.stringify(skillSetStatement) !== '{}') {
          console.log("1B")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                required: true
              },
              {
                model: db.jobSeekerEducationEnrollment,
                where: educationalData,
                include: 
                  {
                  model: db.jobSeekerPreferedSkillset,
                  where: skillSetStatement,
                  required: true
                  },
                required: true
              }]
            })
        } else if (JSON.stringify(educationalData) !== '{}') {
          console.log("2B")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                required: true
              },
              {
                model: db.jobSeekerEducationEnrollment,
                where: educationalData,
                required: true
              }]
            })
        } else if (JSON.stringify(skillSetStatement) !== '{}') { 
          console.log("3B")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
              },
              {
                model: db.jobSeekerEducationEnrollment,
                include: 
                  {
                    model: db.jobSeekerPreferedSkillset,
                  where: skillSetStatement,
                  required: true
                  },
                required: true
              }]
            })
        }
        else {
          console.log("4B")
          data_ = db.jobSeekerEnrollment
            .findAll({
              where: whereStatement,
              include: [{
                model: db.jobSeekerLeveloneAssesssment,
                required: true
              }]
            })
          
        }
        
      }
    }
    return data_;
  }).then((result) => {
    var id = 0;
    if (result) {
      tempList = result;
      for (let src of result) {
        if (candidateOption && candidateOption === 'FRESH') {
          companyDataList.push(src.id);
        } else {
          companyDataList.push(src.dataValues.id);
        }
      }
    }
    if (userData === 'ADMIN') {
      return db.employeeRegistration.findAll({
        where: {
          [db.Op.or]: [{
            recruiterType: "FULLTIME_RECRUITER",
          },
          {
            recruiterType: "INTERN_OFF",
          },
          {
            recruiterType: "INTERN_ON",
          },
          {
            recruiterType: "FREELANCER",
          },
          {
            recruiterType: "TEAM_LEADER",
          },
          {
            recruiterType: "SUPERVISIOR",
          },
          {
            recruiterType: "SUB_VENDOR",
          },
          {
            recruiterType: "BUSSINESS_DEVELOPMENT",
          }
          ],
        },
        attributes: ["id", "fullName"],
      });
    } else if (userData === 'MANAGER') {
      return db.employeeRegistration.findAll({
        include: [{
          model: db.managerCount,
          where: {
            managerID: userId
          }
        }],
        attributes: ["id", "fullName"],
      })
    } else if (userData === 'TEAM_LEADER') {
      return db.employeeRegistration.findAll({
        include: [{
          model: db.teamLeadCount,
          where: {
            teamLeadID: userId
          },
        }],
        attributes: ["id", "fullName"],
      })
    } else if (userData === 'SUPERVISIOR') {
      return db.employeeRegistration.findAll({
        include: [{
          model: db.supervisiorCount,
          where: {
            superVisiorID: userId
          },
        }],
        attributes: ["id", "fullName"],
      })
    } else {
      return db.employeeRegistration.findAll({
        where: {
          [Op.in]: {
            recruiterType: ["FULLTIME_RECRUITER", "INTERN_OFF", "INTERN_ON", "FREELANCER", "SUB_VENDOR", "BUSSINESS_DEVELOPMENT"]
          }
        },
        attributes: ["id", "fullName"],
      })
    }
  }).then(result => {
    if (result) {
      for (let src of result) {
        recruiterList.push(src);
      }
    }
    if (JSON.stringify(finalLevelStatement) === '{}' && JSON.stringify(levelTwoWhereStatement) === '{}') {
      temp = 1;
    } else {
      temp = 2;
    }

    if (temp !== 1 && companyDataList !== null && companyDataList.length > 0)
      levelTwoWhereStatement.leveltwoId = companyDataList;
    
    if (JSON.stringify(finalLevelStatement) !== '{}' && JSON.stringify(levelTwoWhereStatement) !== '{}') {
      return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
        where: levelTwoWhereStatement,
        include: [{
          model: db.jobSeekerLevelFinalAssesssment,
          where: finalLevelStatement,
          required: true
        }]
      });
    } else if (JSON.stringify(finalLevelStatement) !== '{}') { 
      // console.log("here__2", levelTwoWhereStatement, temp)
      return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
        where: levelTwoWhereStatement,
        include: [{
          model: db.jobSeekerLevelFinalAssesssment,
          where: finalLevelStatement,
          required: true
        }]
      });
    }
    else if (JSON.stringify(levelTwoWhereStatement) !== '{}') {
      // console.log("here__3", levelTwoWhereStatement, leveltwo, assignersname, whereStatement, temp)
      return db.jobSeekerLeveltwoExpandedAssesssment.findAll({
        where: levelTwoWhereStatement
      });
    } else { 
      // console.log("here__4", levelTwoWhereStatement, temp)
      return null;
    }
  })
    .then(result => {
      var Del_List = [];
      if (result) {
        // console.log("here__result", result.length, temp, levelTwoWhereStatement, finalLevelStatement)
        for (let src of tempList) {
          for (let rs of result) {
            if (rs.dataValues.leveltwoId === src.dataValues.id) {
              var data = {
                id: src.dataValues.id,
                name: src.dataValues.fullName,
                eName: src.dataValues.employeeName,
                l_two_Id: rs.dataValues.id,
                l_two_status: rs.dataValues.Assessment,
                l_two_client: rs.dataValues.Client,
                l_two_process: rs.dataValues.process,
                l_two_interviewDate: rs.dataValues.date,
                l_two_InterviewStatus: rs.dataValues.InterviewStatus,
                l_two_remark: rs.dataValues.remark,
                l_two_i_remark: rs.dataValues.InterviewRemark,
                l_two_modified: getDateOnly(rs.dataValues.updatedAt),
                mobone: src.dataValues.phoneNumberOne,
                mobtwo: src.dataValues.phoneNumberTwo,
                createdDate: getDateOnly(src.dataValues.createdAt),
                CandidateID: src.dataValues.CandidateID,
                l_one_modified: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.updatedAt ? getDateOnly(src.dataValues.JobSeekerLevelOneAssessment.updatedAt) : null,
                l_one_remark: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.remark ? src.dataValues.JobSeekerLevelOneAssessment.remark : null,
                l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.Assessment ? src.dataValues.JobSeekerLevelOneAssessment.Assessment : null,
                l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.client ? src.dataValues.JobSeekerLevelOneAssessment.client : null,
                l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.process ? src.dataValues.JobSeekerLevelOneAssessment.process : null,
                l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.interview ? src.dataValues.JobSeekerLevelOneAssessment.interview : null
              }
              console.log(src.dataValues.JobSeekerLevelOneAssessment.client, src.dataValues.JobSeekerLevelOneAssessment.process)
              _idList.push(src.dataValues.id);
              candidateList.push(data);
              Del_List.push(src);
              break;
            }
          }
        }
      }
      else {
        if (candidateOption && candidateOption === 'FRESH') {
          var _list = [];
          if (candidateIDList.length > 0 && companyDataList.length > 0) { 
            if (candidateIDList.length > companyDataList.length) {
              _list = candidateIDList.filter(x => companyDataList.indexOf(x) !== -1);
            } else { 
              _list = companyDataList.filter(x => candidateIDList.indexOf(x) !== -1);
            }
          }
          if (_list.length !== 0) {
            for (let l of _list) {
              for (let src of tempList) {
                if (src.id == l) {
                  var data = {
                    id: src.id,
                    name: src.fullName,
                    eName: src.employeeName,
                    l_two_Id: "",
                    l_two_status: "",
                    l_two_client: "",
                    l_two_process: "",
                    l_two_interviewDate: "",
                    l_two_InterviewStatus: "",
                    l_two_remark: "",
                    l_two_modified: "",
                    l_two_i_remark: "",
                    mobone: src.phoneNumberOne,
                    mobtwo: src.phoneNumberTwo,
                    createdDate: getDateOnly(src.createdAt),
                    CandidateID: src.CandidateID,
                    l_one_modified: "",
                    l_one_remark: "",
                    l_one_assessment: "",
                    l_one_assessment_client: "",
                    l_one_assessment_process: "",
                    l_one_assessment_interview: ""
                  }
                  _idList.push(src.id);
                  candidateList.push(data);
                  break;
                }
              }
            }
          } else {
            for (let src of tempList) {
              var data = {
                id: src.id,
                name: src.fullName,
                eName: src.employeeName,
                l_two_Id: "",
                l_two_status: "",
                l_two_client: "",
                l_two_process: "",
                l_two_interviewDate: "",
                l_two_InterviewStatus: "",
                l_two_remark: "",
                l_two_modified: "",
                l_two_i_remark: "",
                mobone: src.phoneNumberOne,
                mobtwo: src.phoneNumberTwo,
                createdDate: getDateOnly(src.createdAt),
                CandidateID: src.CandidateID,
                l_one_modified: "",
                l_one_remark: "",
                l_one_assessment: "",
                l_one_assessment_client: "",
                l_one_assessment_process: "",
                l_one_assessment_interview: ""
              }
              _idList.push(src.id);
              candidateList.push(data);
            }
          }
        } else {

          for (let src of tempList) {
            var data = {
              id: src.dataValues.id,
              name: src.dataValues.fullName,
              eName: src.dataValues.employeeName,
              l_two_Id: "",
              l_two_status: "",
              l_two_client: "",
              l_two_process: "",
              l_two_interviewDate: "",
              l_two_InterviewStatus: "",
              l_two_remark: "",
              l_two_modified: "",
              l_two_i_remark: "",
              mobone: src.dataValues.phoneNumberOne,
              mobtwo: src.dataValues.phoneNumberTwo,
              createdDate: getDateOnly(src.dataValues.createdAt),
              CandidateID: src.dataValues.CandidateID,
              l_one_modified: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.updatedAt ? getDateOnly(src.dataValues.JobSeekerLevelOneAssessment.updatedAt) : null,
              l_one_remark: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.remark ? src.dataValues.JobSeekerLevelOneAssessment.remark : null,
              l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.Assessment ? src.dataValues.JobSeekerLevelOneAssessment.Assessment : null,
              l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.client ? src.dataValues.JobSeekerLevelOneAssessment.client : null,
              l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.process ? src.dataValues.JobSeekerLevelOneAssessment.process : null,
              l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment && src.dataValues.JobSeekerLevelOneAssessment.interview ? src.dataValues.JobSeekerLevelOneAssessment.interview : null
            }
            _idList.push(src.dataValues.id);
            candidateList.push(data);
          }
        }
      }
      
      return getEmployeeList()
    }).then((result) => {
      if (result) {
        empList = result;
      }
      return getAssignerList(_idList);
    }).then(result => {
      if (result) {
        for (let em of empList) {
          for (let rs of result) {
            if (em.dataValues.id === rs.dataValues.QuestionerID) {
              var data = {
                empName: em.dataValues.fullName,
                canId: rs.dataValues.AssignCandidate
              }
              emp_can_list.push(data);
            }
          }
        }
      }
      return getAllCompanyName();
    }).then((result) => {
      var companyData = [];
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }
      }
      // var candidateSet = new Set(candidateList);
      req.session.candidateList = candidateList;
      console.log(finalLevelStatement, "++++", levelTwoWhereStatement, "++++", companyDataList, "+++", candidateList.length, "+++", Del_List.length)
      res.render("candidate/assign-candidate", {
        pageTitle: "Candidate",
        user: userData,
        showingItem: ITEM_PER_PAGE,
        recruiter: recruiterList,
        totalCandidate: candidateList.length, //companyDataList
        candidateData: candidateList,
        hasNextPage: ITEM_PER_PAGE * page < candidateList.length, //companyDataList
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        currentPage: page,
        previousPage: page - 1,
        lastPage: Math.ceil(candidateList.length / ITEM_PER_PAGE), //companyDataList
        formView: false,
        table: true,
        empList: emp_can_list,
        companyValue: companyData,
        freshCandidate: candidateOption && candidateOption === 'FRESH' ? true : false
      });
    })
    .catch((err) => {
      console.log(err)
      fs.appendFile('search.txt', "Error: " + err, function (error) {
        if (error) throw error;
        res.redirect("/login/index");
      });
    });

};

exports.getAssignCandidate = (req, res, next) => {
  const candidateId = +req.params.candidateId;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  console.log("USERDATA  CANDIDATEID", candidateId);

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  const candidate = getAssignedTask(candidateId, userData);

  candidate
    .then((result) => {
      console.log("CANDIDATEID Result => ", result);

      if (result) {
        for (let src of result) {
          candidateID.push(src.dataValues.AssignCandidate);
        }
        console.log("CANDIDATEID => ", candidateID);
        return db.jobSeekerEnrollment.findAll({
          where: {
            id: {
              [Op.in]: candidateID,
            },
          },
          //offset: ITEM_PER_PAGE * (page - 1),
          //limit: ITEM_PER_PAGE,
        });

      } else {
        res.redirect("/");
      }
    })
    .then((candidate) => {
      console.log("CANDIDATE ", candidate);
      res.render("candidate/edit-view-candidate", {
        candidateData: candidate,
        pageTitle: "Candidate",
        path: "/candidate/edit-view-candidate",
        user: userData,
        accountAccess: accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCandidate: candidateID.length,
        hasNextPage: ITEM_PER_PAGE * page < candidateID.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        candidateId: null,
        lastPage: Math.ceil(candidateID.length / ITEM_PER_PAGE),
        levelOneAssesssment: null,
        levelOneTake: false,
        levelOneFullBodyShow: false, //
        leveltwoAssessment: null,
        companyName: [],
        levelTwoTake: false,
        levelTwoFullBodyShow: false, //
        l2AssessmentListData: null, //
        formView: false,
        table: true,
        type: "asn"
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
};

exports.getAssigntrue = (req, res, next) => {
  const candidateId = +req.params.candidateId;
  const view = req.query.view;
  const edit = req.query.edit;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;

  var educationId, experienceId;
  var location = [],
    skillSet = [],
    companyData = [],
    certificate = [],
    preferedIndustryData = [],
    l1AssessmentList = [],
    l2AssessmentList = [],
    l2AssessmentListData = [],
    companyName = [];

  var companyValue = [];
  var companyRole = [];


  var personalData,
    educationData,
    experienceData,
    levelOneAssesssment,
    leveltwoAssessment;

  l1AssessmentList = getAssessmentOne();
  l2AssessmentList = getAssessmentTwo();

  // if (view != 'undefined' && view != null && view) {

  const candidate = findCandidateByID(candidateId);

  candidate
    .then((result) => {
      if (!result) {
        res.redirect("/company/searchadd");
      } else {
        personalData = result;
        return findCandidatePreferedLocationByID(candidateId);
      }
    })
    .then((result) => {
      if (result) {
        for (let src of result) location.push(src.dataValues.location);
      } else {
        location.push("");
      }
      return findCandidateEducationByID(candidateId);
    })
    .then((data) => {
      console.log("Data", data);
      if (!data) {
        educationData = null;
        educationId = 0;
      } else {
        educationData = data;
        educationId = data.dataValues.id;
        return getSkillByCandidateID(data.dataValues.id);
      }
    })
    .then((result) => {
      if (result) {
        for (let src of result) skillSet.push(src.dataValues.skill);
      } else {
        skillSet.push("");
      }
      return getCertificateByCandidateID(educationId);
    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          var data = {
            certificateName: src.dataValues.certificateName,
            certificateNumber: src.dataValues.certificateNumber,
          };
          skillSet.push(data);
        }
      } else {
        var dataValue = {
          certificateName: "",
          certificateNumber: "",
        };
        skillSet.push(dataValue);
      }

      return findCandidateExperienceByID(candidateId);
    })
    .then((data) => {
      console.log("Data_EX", data);
      if (!data) {
        experienceData = null;
        experienceId = 0;
      } else {
        experienceData = data;
        experienceId = data.dataValues.id;
      }
      return findCandidateCompanyByID(experienceId);
    })
    .then((result) => {
      console.log("Data_CO", experienceId);

      for (let src of result) {
        var data = {
          name: src.dataValues.name,
          companyIndustry: src.dataValues.companyIndustry,
          companyRole: src.dataValues.companyRole,
          startDate: src.dataValues.startDate,
          endDate: src.dataValues.endDate,
          Salary: src.dataValues.Salary,
        };
        companyData.push(data);
      }
      return getPreferedJobByCandidateID(experienceId);
    })
    .then((result) => {
      console.log("Data_CO", result);
      if (result) {
        for (let src of result) {
          var data = {
            preferedIndustry: src.dataValues.preferedIndustry,
            preferedJobRole: src.dataValues.preferedJobRole,
          };
          preferedIndustryData.push(data);
        }
      } else {
        var dataValues = {
          preferedIndustry: "",
          preferedJobRole: "",
        };
        preferedIndustryData.push(dataValues);
      }

      return findCandidateLevelOne(candidateId);
    })
    .then((result) => {
      console.log("L1", result)
      if (result) {
        levelOneAssesssment = result;
      } else {
        levelOneAssesssment = null;
      }
      return findCandidateLevelTwo(candidateId);
    })
    .then((result) => {
      console.log('L2', result);
      if (result) {
        for (let src of result) {
          var data = {
            Assessment: src.dataValues.Assessment,
            Client: src.dataValues.Client,
            process: src.dataValues.process,
            date: src.dataValues.date,
            remark: src.dataValues.remark,
            documentCheck: src.dataValues.documentCheck,
            trainingStatus: src.dataValues.trainingStatus,
            InterviewStatus: src.dataValues.InterviewStatus,
            addedBy: src.dataValues.addedBy,
          };
          l2AssessmentListData.push(data);
        }
      }

      return findCompanyName();;
    }).then((result) => {
      console.log("L2_LIST", l2AssessmentListData);
      if (!result) {
        companyName.push("NONE");
      } else {
        for (let src of result) {
          companyName.push(src.dataValues.company_name);
        }
      }
      return getAllCompanyName();
    }).then(result => {


      if (result) {
        for (let src of result) {
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyValue.push(resData);
        }
      }

      return getLanguageById(candidateId);
    }).then((result) => {

      var languageData = [];
      if (result) {
        if (result instanceof Array && result.length > 0) {
          for (let src of result) {
            var datas = {
              name: src.dataValues.LanguageTitle,
              levelone: src.dataValues.levelone,
              leveltwo: src.dataValues.leveltwo
            }
            languageData.push(datas);
          }
        }
      }

      console.log(l2AssessmentListData, "---------->");

      res.render("candidate/view-candidate", {
        personalData: personalData ? personalData.dataValues : null,
        educationData: educationData ? educationData.dataValues : null,
        experienceData: experienceData ? experienceData.dataValues : null,
        locationData: location,
        skillSet: skillSet,
        companyJobData: companyData,
        certificate: certificate,
        preferedIndustryData: preferedIndustryData,
        user: userData,
        accountAccess: accountAccess,
        candidateId: candidateId,
        languageList: languageData,
        companyValue: companyValue,
        levelOneAssesssment: levelOneAssesssment,
        levelOneTake: levelOneAssesssment ? false : true,
        levelOneTakeFullBody: levelOneAssesssment ? true : false,
        levelTwoTake: true, //l2AssessmentListData.length > 0 ? true : false,
        levelTwoTakeFullBody: 0, //l2AssessmentListData.length > 0 ? true : false,
        leveltwoAssessment: l2AssessmentListData.length > 0 ? true : false,
        l2AssessmentListData: [],
        companyName: companyValue,
        table: false,
        formView: true,
        type: "asn"
      });
    })
    .catch((err) => {
      console.log("View error ", err);
      res.redirect("/");
    });


};

exports.getAssignCandidateAddL1Accessment = (req, res, next) => {
  const candidateId = +req.params.candidateId;
  const view = req.query.view;
  const edit = req.query.edit;
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;

  var educationId, experienceId;
  var location = [],
    skillSet = [],
    companyData = [],
    certificate = [],
    preferedIndustryData = [],
    l1AssessmentList = [],
    l2AssessmentList = [],
    l2AssessmentListData = [];
  var personalData,
    educationData,
    experienceData,
    levelOneAssesssment,
    leveltwoAssessment;

  l1AssessmentList = getAssessmentOne();
  l2AssessmentList = getAssessmentTwo();

  if (view !== "undefined" && view !== null && view) {
    const candidate = findCandidateByID(candidateId);
    console.log("View");
    candidate
      .then((result) => {
        if (result === null) {
          res.redirect("/company/searchadd");
        } else {
          personalData = result;
          return findCandidatePreferedLocationByID(candidateId);
        }
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) location.push(src.dataValues.location);
        } else {
          location.push("");
        }
        return findCandidateEducationByID(candidateId);
      })
      .then((data) => {
        console.log("Data", data);
        if (data === null) {
          res.redirect("/");
        } else {
          educationData = data;
          educationId = data.dataValues.id;
          return getSkillByCandidateID(data.dataValues.id);
        }
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) skillSet.push(src.dataValues.skill);
        } else {
          skillSet.push("");
        }
        return getCertificateByCandidateID(educationId);
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) {
            var data = {
              certificateName: src.dataValues.certificateName,
              certificateNumber: src.dataValues.certificateNumber,
            };
            skillSet.push(data);
          }
        } else {
          var dataValue = {
            certificateName: "",
            certificateNumber: "",
          };
          skillSet.push(dataValue);
        }

        return findCandidateExperienceByID(candidateId);
      })
      .then((data) => {
        if (!data) {
          experienceData = null;
          experienceId = 0;
        } else {
          experienceData = data;
          experienceId = data.dataValues.id;
          return findCandidateCompanyByID(data.dataValues.id);
        }
      })
      .then((result) => {
        console.log('DAT_CO', result)
        for (let src of result) {
          var data = {
            name: src.dataValues.name,
            companyIndustry: src.dataValues.companyIndustry,
            companyRole: src.dataValues.companyRole,
            startDate: src.dataValues.startDate,
            endDate: src.dataValues.endDate,
            Salary: src.dataValues.Salary,
          };
          companyData.push(data);
        }
        return getPreferedJobByCandidateID(experienceId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              preferedIndustry: src.dataValues.preferedIndustry,
              preferedJobRole: src.dataValues.preferedJobRole,
            };
            preferedIndustryData.push(data);
          }
        } else {
          var dataValues = {
            preferedIndustry: "",
            preferedJobRole: "",
          };
          preferedIndustryData.push(dataValues);
        }

        return findCandidateLevelOne(candidateId);
      })
      .then((result) => {
        if (result) {
          levelOneAssesssment = null;
        } else {
          levelOneAssesssment = result;
        }
        return findCandidateLevelTwo(candidateId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              Assessment: src.dataValues.Assessment,
              Client: src.dataValues.Client,
              process: src.dataValues.process,
              date: src.dataValues.date,
              remark: src.dataValues.remark,
              documentCheck: src.dataValues.documentCheck,
              trainingStatus: src.dataValues.trainingStatus,
              InterviewStatus: src.dataValues.InterviewStatus,
              addedBy: src.dataValues.addedBy,
            };
            l2AssessmentListData.push(data);
          }
        } else {
          var dataValues = {
            Assessment: "",
            Client: "",
            process: "",
            date: "",
            remark: "",
            documentCheck: "",
            trainingStatus: "",
            InterviewStatus: "",
            addedBy: "",
          };
          l2AssessmentListData.push(dataValues);
        }
        return null;
      })
      .then((result) => {

        res.render("candidate/edit-view-candidate", {
          personalData: personalData ? personalData.dataValues : null,
          educationData: educationData ? educationData.dataValues : null,
          experienceData: experienceData ? experienceData.dataValues : null,
          location: location,
          skillSet: skillSet,
          companyData: companyData,
          certificate: certificate,
          preferedIndustryData: preferedIndustryData,
          user: userData,
          accountAccess: accountAccess,
          candidateId: candidateId,
          levelOneAssesssment: levelOneAssesssment,
          levelOneTake: true,
          levelOneTakeFullBody: false,
          levelTwoTake: false,
          levelTwoTakeFullBody: false,
          l2AssessmentListData: l2AssessmentListData,
          table: false,
          formView: true,
          type: "l1a"
        });
        console.log("View error candidateID");
      })
      .catch((err) => {
        console.log("View error ", err);
        res.redirect("/");
      });
  }

  if (edit !== "undefined" && edit !== null && edit) {
    console.log("View");

    const candidate = findCandidateByID(candidateId);

    candidate
      .then((result) => {
        if (result === null) {
          res.redirect("/company/searchadd");
        } else {
          personalData = result;
          return findCandidatePreferedLocationByID(candidateId);
        }
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) location.push(src.dataValues.location);
        } else {
          location.push("");
        }
        return findCandidateEducationByID(candidateId);
      })
      .then((data) => {
        console.log("Data", data);
        if (data === null) {
          res.redirect("/");
        } else {
          educationData = data;
          educationId = data.dataValues.id;
          return getSkillByCandidateID(data.dataValues.id);
        }
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) skillSet.push(src.dataValues.skill);
        } else {
          skillSet.push("");
        }

        return getCertificateByCandidateID(educationId);
      })
      .then((result) => {
        if (result != null && result != undefined) {
          for (let src of result) {
            var data = {
              certificateName: src.dataValues.certificateName,
              certificateNumber: src.dataValues.certificateNumber,
            };
            skillSet.push(data);
          }
        } else {
          var dataValue = {
            certificateName: "",
            certificateNumber: "",
          };
          skillSet.push(dataValue);
        }
        return findCandidateExperienceByID(candidateId);
      })
      .then((data) => {
        if (data === null) {
          res.redirect("/");
        } else {
          experienceData = data;
          experienceId = data.dataValues.id;
          return findCandidateCompanyByID(data.dataValues.id);
        }
      })
      .then((result) => {
        companyData = result;
        return getPreferedJobByCandidateID(experienceId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              preferedIndustry: src.dataValues.preferedIndustry,
              preferedJobRole: src.dataValues.preferedJobRole,
            };
            preferedIndustryData.push(data);
          }
        } else {
          var dataValues = {
            preferedIndustry: "",
            preferedJobRole: "",
          };
          preferedIndustryData.push(dataValues);
        }

        return findCandidateLevelOne(candidateId);
      })
      .then((result) => {
        if (result == null && result == undefined) {
          levelOneAssesssment = null;
        } else {
          levelOneAssesssment = result;
        }
        return findCandidateLevelTwo(candidateId);
      })
      .then((result) => {
        if (result) {
          for (let src of result) {
            var data = {
              Assessment: src.dataValues.Assessment,
              Client: src.dataValues.Client,
              process: src.dataValues.process,
              date: src.dataValues.date,
              remark: src.dataValues.remark,
              documentCheck: src.dataValues.documentCheck,
              trainingStatus: src.dataValues.trainingStatus,
              InterviewStatus: src.dataValues.InterviewStatus,
              addedBy: src.dataValues.addedBy,
            };
            l2AssessmentListData.push(data);
          }
        } else {
          var dataValues = {
            Assessment: "",
            Client: "",
            process: "",
            date: "",
            remark: "",
            documentCheck: "",
            trainingStatus: "",
            InterviewStatus: "",
            addedBy: "",
          };
          l2AssessmentListData.push(dataValues);
        }
        return null;
      })
      .then((result) => {
        res.render("candidate/editCandidate", {
          personalData: personalData.dataValues,
          educationData: educationData.dataValues,
          experienceData: experienceData.dataValues,
          location: location,
          skillSet: skillSet,
          companyData: companyData,
          certificate: certificate,
          preferedIndustryData: preferedIndustryData,
          user: userData,
          candidateId: candidateId,
          levelOneAssesssment: levelOneAssesssment,
          l2AssessmentListData: l2AssessmentListData,
          table: false,
          formView: true,
        });
      })
      .catch((err) => {
        console.log("View level error ", err);
        res.redirect("/");
      });
  }
};


exports.getRejectGroupDiscussion = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]");
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'GROUP_DISCUSSION',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'GROUP_DISCUSSION', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.getRejectByClient = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'CLIENT',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'CLIENT', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.getRejectOPS = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'OPS',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'OPS', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.getTypingReject = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'TYPING',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'TYPING', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.getTotalVersantReject = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'VERSANT',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'VERSANT', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getTotalGATReject = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'GAT',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'GAT', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getTotalInterScheduleTelephonic = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: ["AMCAT(TEL)", "TELEPHONIC"],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'AMCAT', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
    res.redirect("/");
  })


};

exports.getTotalAMCATReject = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: ['AMCAT', 'AMCAT_COOLING'],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'AMCAT', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getFSRReject = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'FSR',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'FSR', dataCount)
    }
    else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getOfferDrop = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'OFFER_DROP',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'OFFER_DROP', dataCount)
    }
    else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getTotalHold = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'HOLD',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);
      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'HOLD', dataCount)

    }
    else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getTotalNoShow = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'NO_SHOW',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']],
    // offset: ITEM_PER_PAGE * (page - 1),
    // limit: ITEM_PER_PAGE,
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);
      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'NO_SHOW', dataCount)

    }
    else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.getTotalTenureTracking = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var finalAssessmentId = [],
    totalList = 0;
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [],
    dateList = [];
  if (req.session.finalDataCount) {
    dataCount = req.session.finalDataCount;
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLevelFinalAssesssment
    .findAll({
      where: {
        BilingStatus: "TRACKING",
        FinalAssessmentId: {
          [db.Op.in]: dataCount,
        },
      },
    })
    .then((res) => {
      if (res) {
        for (let i of res) {
          totalList++;
        }
      }

      return db.jobSeekerLevelFinalAssesssment.findAll({
        where: {
          BilingStatus: "TRACKING",
          FinalAssessmentId: {
            [db.Op.in]: dataCount,
          },
        },
        attributes: ["FinalAssessmentId", "onBoardingSelect"],
        order: [
          ["onBoardingSelect", "DESC"],
          ["onFifteenBoardingDate", "DESC"],
        ],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          var dateL = {
            dates: src.dataValues.onBoardingSelect,
            _id: src.dataValues.FinalAssessmentId,
          };
          dateList.push(dateL);
          finalAssessmentId.push(src.dataValues.FinalAssessmentId);
        }
        getFinalAssessmnetCandidate(
          finalAssessmentId,
          page,
          res,
          userData,
          accountAccess,
          dataCount,
          dateList,
          totalList
        );
      } else {
        res.redirect("/login/index");
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

exports.needToBill = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var finalAssessmentId = [], totalList = 0;
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [], dateList = [];
  if (req.session.finalDataCount) {
    dataCount = req.session.finalDataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push(0);
  }

  console.log("**************",dataCount, "*************************", req.session.finalDataCount);

  db.jobSeekerLevelFinalAssesssment
    .findAll({
      where: {
        BilingStatus: "NEED_TO_BILL",
        FinalAssessmentId: {
          [db.Op.in]: dataCount,
        },
      },
    })
    .then((res) => {
      if (res) {
        for (let i of res) {
          totalList++;
        }
      }

      return db.jobSeekerLevelFinalAssesssment.findAll({
        where: {
          BilingStatus: "NEED_TO_BILL",
          FinalAssessmentId: {
            [db.Op.in]: dataCount,
          },
        },
        attributes: ["FinalAssessmentId", "onBoardingSelect"],
        order: [
          ["onBoardingDateStatus", "DESC"],
          ["onFifteenBoardingDate", "DESC"],
        ],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((result) => {
      console.log("FinalAssessmentId RESULT", result);
      if (result) {
        for (let src of result) {
          var dateL = {
            dates: src.dataValues.onBoardingSelect,
            _id: src.dataValues.FinalAssessmentId,
          };
          dateList.push(dateL);
          finalAssessmentId.push(src.dataValues.FinalAssessmentId);
        }
        getFinalAssessmnetCandidate(
          finalAssessmentId,
          page,
          res,
          userData,
          accountAccess,
          dataCount,
          dateList,
          totalList
        );
      } else {
        res.redirect("/login/index");
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

exports.totalBilled = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var finalAssessmentId = [], totalList = 0;
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [], dateList = [];
  if (req.session.finalDataCount) {
    dataCount = req.session.finalDataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLevelFinalAssesssment
    .findAll({
      where: {
        BilingStatus: "BILLED",
        FinalAssessmentId: {
          [db.Op.in]: dataCount,
        },
      },
      attributes: ["FinalAssessmentId", "onBoardingSelect"],
      order: [
        ["onBoardingDateStatus", "DESC"],
        ["onFifteenBoardingDate", "DESC"],
      ],
      // offset: ITEM_PER_PAGE * (page - 1),
      // limit: ITEM_PER_PAGE,
    })
    .then((res) => {
      if (res) {
        for (let i of res) {
          totalList++;
        }
      }

      return db.jobSeekerLevelFinalAssesssment.findAll({
        where: {
          BilingStatus: "BILLED",
          FinalAssessmentId: {
            [db.Op.in]: dataCount,
          },
        },
        attributes: ["FinalAssessmentId", "onBoardingSelect"],
        order: [
          ["onBoardingDateStatus", "DESC"],
          ["onFifteenBoardingDate", "DESC"],
        ],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((result) => {
      console.log("FinalAssessmentId RESULT", result);
      if (result) {
        for (let src of result) {
          var dateL = {
            dates: src.dataValues.onBoardingSelect,
            _id: src.dataValues.FinalAssessmentId,
          };
          dateList.push(dateL);
          finalAssessmentId.push(src.dataValues.FinalAssessmentId);
        }
        getFinalAssessmnetCandidate(
          finalAssessmentId,
          page,
          res,
          userData,
          accountAccess,
          dataCount,
          dateList,
          totalList
        );
      } else {
        res.redirect("/login/index");
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

exports.getNoShowLineUp = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'NO_SHOW_LINE_UP',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]

  }).then(result => {
    if (result) {
      for (let src of result)
        candidateIdList.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateIdList, result, page, res, userData, access, 'NO_SHOW_LINE_UP', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })

}

exports.svvrProcess = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: [
        "SVVR:SEND EMAIL", "SVVR:MAIL CONFIRMATION", "SVVR:AWAITING ONBOARDING", "SVVR:L3 CHECK",
        "SVVR:TRAINING", "SVVR:ADD TO GROUP", "SVVR:LOGIN CREATION"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'SVVR:IN PROCESS', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.svvrClosed = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: [
        "SVVR:DONE", "SVVR:NI"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'SVVR:IN PROCESS', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.totalInternshipJoined = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: "INTERNSHIP JOINED",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'INTERNSHIP JOINED', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}

exports.totalInternshipDrop = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: "INTERNSHIP DROP",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'INTERNSHIP DROP', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}


exports.totalInternshipInProcess = (req, res, next) => {
  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;//JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }


  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: "INTERNSHIP IN PROCESS",
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'INTERNSHIP IN PROCESS', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })
}


exports.getTotalAwaitJoin = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;


  db.sequelize.query(`
  SELECT * FROM JobSeekerLevelTwoAssessmentExpandLevels
  LEFT OUTER JOIN JobSeekerLevelFinalAssessments
  ON JobSeekerLevelTwoAssessmentExpandLevels.id = JobSeekerLevelFinalAssessments.FinalAssessmentId
  WHERE JobSeekerLevelTwoAssessmentExpandLevels.InterviewStatus IN('SELECTED')
  AND JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId
  IN(` + dataCount + `)
  AND(JobSeekerLevelFinalAssessments.BilingStatus NOT IN('NON_TENURE', 'TRACKING', 'NEED_TO_BILL', 'BILLED', 'RAMPDOWN') 
  OR JobSeekerLevelFinalAssessments.BilingStatus IS NULL)`, {
    type: db.Sequelize.QueryTypes.SELECT
  }).then(result => {
    if (result) {
      if (result instanceof Array)
        totalCandidateCount = result.length;
    }
    return db.sequelize.query(`SELECT * FROM JobSeekerEnrollmentPersonalData WHERE id IN(
    SELECT leveltwoId FROM JobSeekerLevelTwoAssessmentExpandLevels
      LEFT OUTER JOIN JobSeekerLevelFinalAssessments
      ON JobSeekerLevelTwoAssessmentExpandLevels.id = JobSeekerLevelFinalAssessments.FinalAssessmentId
      WHERE JobSeekerLevelTwoAssessmentExpandLevels.InterviewStatus IN('SELECTED')
      AND JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId
      IN(` + dataCount + `)
      AND(JobSeekerLevelFinalAssessments.BilingStatus NOT IN('NON_TENURE', 'TRACKING', 'NEED_TO_BILL', 'BILLED', 'RAMPDOWN') 
      OR JobSeekerLevelFinalAssessments.BilingStatus IS NULL))`,
      {
        type: db.Sequelize.QueryTypes.SELECT
      })
  })

    .then((result) => {
      if (result) {

        for (let src of result) {
          candidateIdList.push(src.id)
        }
        console.log(candidateIdList)
        getAwaitJoinigCandidate(candidateIdList, page, res, userData, access, dataCount)

      } else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}

exports.getTotatLevelTwoWd = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: ['wd'],
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: ['wd'],
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}

exports.getTotalLevelTwoDnd = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
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
    // include: [{
    //   model: db.jobSeekerLeveltwoExpandedAssesssment,
    //   where: {
    //     Assessment: ["number_not_reachable", "did_not_pick", "call_back"],
    //     leveltwoId: {
    //       [db.Op.in]: dataCount
    //     }
    //   }
    // }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
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
        // order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    }
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      fs.appendFile('2dnd.txt', JSON.stringify(err), function (err) {
        if (err) throw err;
        res.redirect("/");
      });
    });

}

exports.getTotalLevelOneWd = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: ['wd'],
        levelOneId: {
          [db.Op.in]: dataCount
        }

      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: ['wd'],
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "l_one_wd");
      }
      else {
        res.redirect("/login/index");
      }
    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/login/index");
    });

}

exports.getTotalLevelOneDnd = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); 
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: ["number_not_reachable", "did_not_pick", "call_back"],
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: ["number_not_reachable", "did_not_pick", "call_back"],
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    }
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "l_one_dnd");
      }
      else {
        res.redirect("/login/index");
      }
    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalTrainAndHired = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false, table = false, filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: [
        "PRE_ASSESSMENT(P)", "MID_ASSESSMENT(P)", "POST_ASSESSMENT(P)"
      ],
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'TrainAndHired', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })


}



exports.getTotalInProcessI = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
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
    order: [['Client', 'DESC']]
  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'IN_PROCESS(i)', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })


}



exports.getTotalFinalFeedback = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var candidateID = [];
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }


  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  console.log("INSIDE CANDIDATE")
  db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      InterviewStatus: 'FINAL_FEEDBACK',
      leveltwoId: {
        [db.Op.in]: dataCount
      }
    },
    order: [['Client', 'DESC']]

  }).then(result => {
    if (result) {
      for (let src of result)
        candidateID.push(src.dataValues.leveltwoId);

      getAllCandidate(candidateID, result, page, res, userData, accountAccess, 'FINAL_FEEDBACK', dataCount)
    } else {
      res.redirect("/login/index");
    }
  }).catch(error => {
    console.log(error);
  })


}

exports.getTotalL2Reject = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; // JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'other_client',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment
        }, {
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'other_client',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}

exports.getTotalL2Fresher = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; // JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'ni_convincing',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment
        }, {
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'ni_convincing',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalL2Experienced = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; // JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'ni_experienced',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment
        }, {
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'ni_experienced',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalL2InJob = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; // JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'ni_in_job',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment
        }, {
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'ni_in_job',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}



exports.getWrongNumberLTwo = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; // JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'wrong_number',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{ model: db.jobSeekerLeveloneAssesssment }, {
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'wrong_number',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateList(result, result, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getLevelTwo = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;


  db.sequelize.query(`

  SELECT * FROM JobSeekerLevelOneAssessments
  LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
  ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId)
  where
  JobSeekerLevelOneAssessments.levelOneId IN(` + dataCount + `) AND
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
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'no_show'

  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_in_job'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_experienced'
  AND JobSeekerLevelTwoAssessmentExpandLevels.Assessment != 'ni_convincing'

  OR JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL)
      `, {
    type: db.Sequelize.QueryTypes.SELECT
  })
    .then(result => {
      if (result) {
        if (result instanceof Array)
          totalCandidateCount = result.length;


        return db.sequelize.query(`SELECT * FROM JobSeekerEnrollmentPersonalData WHERE id IN
    (SELECT JobSeekerLevelOneAssessments.levelOneId FROM JobSeekerLevelOneAssessments
              LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
              ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId)
              where
              JobSeekerLevelOneAssessments.levelOneId IN(` + dataCount + `) AND
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
              OR JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL) ORDER BY JobSeekerLevelOneAssessments.client DESC)`
          , {
            type: db.Sequelize.QueryTypes.SELECT
          })

      }
    })
    .then((result) => {
      if (result) {
        for (let src of result) {
          levelTwoCandidateList.push(src.id);

        }
        return db.jobSeekerEnrollment.findAll({
          include: [{
            model: db.jobSeekerLeveloneAssesssment,
            where: {
              levelOneId: {
                [db.Op.in]: levelTwoCandidateList
              }
            }
          }],
          order: [[{ model: db.jobSeekerLeveloneAssesssment }, 'client', 'DESC']],
          offset: ITEM_PER_PAGE * (page - 1),
          limit: ITEM_PER_PAGE
        })
      }
    }).then(result => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "l_two");
      }
      else {
        res.redirect("/login/index");
      }
    })

    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}

exports.getTotalL1Reject = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'other_client',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }],
    order: [['createdAt', 'DESC']]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'other_client',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "l_one_reject");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalLOneinJob = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'ni_in_job',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }],
    order: [['createdAt', 'DESC']]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'ni_in_job',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "ni_in_job");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalLOneExperienced = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'ni_experienced',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }],
    order: [['createdAt', 'DESC']]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'ni_experienced',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "ni_experienced");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalLOneFresher = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'ni_convincing',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }],
    order: [['createdAt', 'DESC']]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'ni_convincing',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "ni_convincing");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}

exports.getWrongNumberLOne = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'wrong_number',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'wrong_number',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "wrg_num");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.totalDocumentation = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIDList = [],
    tempList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        documentCheck: 'PENDING',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            documentCheck: 'PENDING',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    }
  })


    .then((candidate) => {

      if (candidate) {
        getCandidateList(candidate, candidate, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })

    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}


exports.getTotalTraining = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIDList = [],
    tempList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        trainingStatus: 'PENDING',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            trainingStatus: 'PENDING',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    }
  })

    .then((candidate) => {

      if (candidate) {
        getCandidateList(candidate, candidate, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }

    })

    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });

}



exports.getTotalLOneBlackList = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  var candidateList = [],
    candidateIdList = [],
    levelTwoCandidateList = [],
    totalCandidateCount;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveloneAssesssment,
      where: {
        Assessment: 'black_list',
        levelOneId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            Assessment: 'black_list',
            levelOneId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    } else
      return null;
  })
    .then((result) => {
      if (result) {
        getCandidateListForLevelOne(result, result, userData, access, page, totalCandidateCount, res, dataCount, "black_list");
      }
      else {
        res.redirect("/login/index");
      }

    }).catch((err) => {
      res.redirect("/");
    });

}


exports.getTotalLTwoBlackList = (req, res, next) => {

  var page;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.dataCount) {
    dataCount = req.session.dataCount;
  } else {
    dataCount.push[0];
  }

  var totalCandidateCount = 0;
  const userData = req.session.user;
  const userID = req.session.userId;
  const access = req.session.accountAccess;

  db.jobSeekerEnrollment.count({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        Assessment: 'black_list',
        leveltwoId: {
          [db.Op.in]: dataCount
        }
      }
    }]
  }).then(result => {
    if (result) {
      totalCandidateCount = result;
      return db.jobSeekerEnrollment.findAll({
        include: [{
          model: db.jobSeekerLeveltwoExpandedAssesssment,
          where: {
            Assessment: 'black_list',
            leveltwoId: {
              [db.Op.in]: dataCount
            }
          }
        }],
        order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
    }
  })

    .then((candidate) => {

      if (candidate) {
        getCandidateList(candidate, candidate, userData, access, page, totalCandidateCount, res, dataCount);
      }
      else {
        res.redirect("/login/index");
      }
    })
    .catch((err) => {
      res.redirect("/");
    });

}

exports.getTotalRampdown = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var finalAssessmentId = [], dateList = [], totalList = 0;
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.finalDataCount) {
    dataCount = req.session.finalDataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLevelFinalAssesssment
    .findAll({
      where: {
        BilingStatus: "RAMPDOWN",
        FinalAssessmentId: {
          [db.Op.in]: dataCount,
        },
      },
    })
    .then((res) => {
      if (res) {
        for (let i of res) {
          totalList++;
        }
      }
      return db.jobSeekerLevelFinalAssesssment.findAll({
        where: {
          BilingStatus: "RAMPDOWN",
          FinalAssessmentId: {
            [db.Op.in]: dataCount,
          },
        },
        attributes: ["FinalAssessmentId", "onBoardingSelect"],
        order: [
          ["onBoardingDateStatus", "DESC"],
          ["onFifteenBoardingDate", "DESC"],
        ],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((result) => {
      console.log("FinalAssessmentId RESULT", result);
      if (result) {
        for (let src of result) {
          var dateL = {
            dates: src.dataValues.onBoardingSelect,
            _id: src.dataValues.FinalAssessmentId,
          };
          dateList.push(dateL);
          finalAssessmentId.push(src.dataValues.FinalAssessmentId);
        }
        getFinalAssessmnetCandidate(
          finalAssessmentId,
          page,
          res,
          userData,
          accountAccess,
          dataCount,
          dateList,
          totalList
        );
      } else {
        res.redirect("/login/index");
      }
    })
    .catch((error) => {
      console.log(error);
    });

}










exports.totalNonTenure = (req, res, next) => {

  const userData = req.session.user;
  const accountAccess = req.session.accountAccess;
  var finalAssessmentId = [], dateList = [], totalList = 0;
  var page;
  var form = false,
    table = false,
    filter = false;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  var dataCount = [];
  if (req.session.finalDataCount) {
    dataCount = req.session.finalDataCount; //JSON.parse("[" + req.query.value + "]"); //[...req.query.value];
  } else {
    dataCount.push[0];
  }

  db.jobSeekerLevelFinalAssesssment
    .findAll({
      where: {
        BilingStatus: "NON_TENURE",
        FinalAssessmentId: {
          [db.Op.in]: dataCount,
        },
      },
    })
    .then((res) => {
      if (res) {
        for (let i of res) {
          totalList++;
        }
      }
      return db.jobSeekerLevelFinalAssesssment.findAll({
        where: {
          BilingStatus: "NON_TENURE",
          FinalAssessmentId: {
            [db.Op.in]: dataCount,
          },
        },
        attributes: ["FinalAssessmentId", "onBoardingSelect"],
        order: [
          ["onBoardingDateStatus", "DESC"],
          ["onFifteenBoardingDate", "DESC"],
        ],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((result) => {
      console.log("FinalAssessmentId RESULT", result);
      if (result) {
        for (let src of result) {
          var dateL = {
            dates: src.dataValues.onBoardingSelect,
            _id: src.dataValues.FinalAssessmentId,
          };
          dateList.push(dateL);
          finalAssessmentId.push(src.dataValues.FinalAssessmentId);
        }
        getFinalAssessmnetCandidate(
          finalAssessmentId,
          page,
          res,
          userData,
          accountAccess,
          dataCount,
          dateList,
          totalList
        );
      } else {
        res.redirect("/login/index");
      }
    })
    .catch((error) => {
      console.log(error);
    });

}

async function candidateCount() {
  return await db.jobSeekerEnrollment.count();
}

async function findCandidateByID(id) {
  console.log(id);
  return await db.jobSeekerEnrollment.findByPk(id);
}

async function findCandidateEducationByEducationId(id) {
  console.log('EDUCATION => ', id);
  return await db.jobSeekerEducationEnrollment.findByPk(id);
}

async function findCandidatePreferedLocationByID(id) {
  console.log(id);
  return await db.jobSeekerPreferedLocation.findAll({
    where: {
      candidateId: id,
    },
    attributes: ["location"],
  });
}

async function findCandidateCompanyByID(id) {
  console.log(id);
  return await db.jobSeekerCompanyData.findAll({
    where: {
      candidateId: id,
    },
  });
}

async function findCandidateEducationByID(id) {
  return await db.jobSeekerEducationEnrollment.findOne({
    where: {
      candidateId: id,
    },
  });
}

async function findCandidateExperienceByID(id) {
  console.log(id);
  return await db.jobSeekerExperienceData.findOne({
    where: {
      candidateId: id,
    },
  });
}

async function getLocationList() {
  const location = await locationCityData.findAll({
    attributes: ["locationCity"],
  });
  return location;
}

function getSource() {
  var Role = [];
  var keys = Object.keys(constant.SOURCE);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

function getAssessmentOne() {
  var Role = [];
  var keys = Object.keys(constant.L1ASSESSMENT);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

function getAssessmentTwo() {
  var Role = [];
  var keys = Object.keys(constant.L2ASSESSMENT);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

async function getSkillByCandidateID(id) {
  return await db.jobSeekerPreferedSkillset.findAll({
    where: {
      candidateId: id,
    },
    attributes: ["skill"],
  });
}

async function getSkillByCandidateIdList(id) {
  console.log("_id_",id)
  return db.jobSeekerEnrollment.findAll({
    where: {
      id: { [Op.in]: id }
    },
    include: {
      model: db.jobSeekerEducationEnrollment,
      include: {
        model: db.jobSeekerPreferedSkillset,
        required: true
      },
      required: true
    }
  })
  // return await db.jobSeekerPreferedSkillset.findAll({
  //   where: {
  //     candidateId: { [Op.in]: id }
  //   }
  // });
}

async function deleteSkillByCandidateID(id) {
  return await db.jobSeekerPreferedSkillset.destroy({
    where: {
      candidateId: id,
    }
  });
}

async function getPreferedJobByCandidateID(id) {
  return await db.jobSeekerPreferedIndustry.findAll({
    where: {
      candidateId: id,
    },
    attributes: ["preferedIndustry", "preferedJobRole"],
  });
}

async function getCertificateByCandidateID(id) {
  return await db.jobSeekerPreferedCertificate.findAll({
    where: {
      candidateId: id,
    },
    attributes: ["certificateName", "certificateNumber"],
    order: [['id', 'DESC']]
  });
}

async function deleteCertificateByCandidateID(id) {
  return await db.jobSeekerPreferedCertificate.destroy({
    where: {
      candidateId: id,
    }
  });
}

async function insert(locationList) {
  console.log(locationList, "Inside");
  return await db.jobSeekerPreferedLocation.bulkCreate(locationList, {
    returning: true,
  });
}

async function insertSkill(skillList) {
  console.log(skillList, "Inside");
  return await db.jobSeekerPreferedSkillset.bulkCreate(skillList, {
    returning: true,
  });
}

async function insertCertificate(certificateList) {
  console.log(certificateList, "Inside");
  return await db.jobSeekerPreferedCertificate.bulkCreate(certificateList, {
    returning: true,
  });
}

async function insertCompany(companyList) {
  console.log(companyList, "Inside");
  return await db.jobSeekerCompanyData.bulkCreate(companyList, {
    returning: true,
  });
}

async function insertPreferedIndustry(preferedList) {
  console.log(preferedList, "Inside");
  return await db.jobSeekerPreferedIndustry.bulkCreate(preferedList, {
    returning: true,
  });
}

async function getCandidateId() {
  return await db.jobSeekerEnrollment.findAll({
    attributes: ["CandidateID"],
  });
}

function getAssignId() {
  assignID++;
  let assignIDD = "ASSI" + assignID;
  return assignIDD;
}

async function insertAssignment(assignmentList) {
  return await db.assignCandidate.bulkCreate(assignmentList, {
    returning: true,
  });
}

async function getAssignedTask(id, type) {
  console.log(id, " ---> ", type);
  if (type !== "ADMIN") {
    return await db.assignCandidate.findAll({
      where: {
        QuestionerID: id,
      },
      attributes: ["AssignCandidate"],
    });
  } else {
    return await db.assignCandidate.findAll({
      attributes: ["AssignCandidate"],
    });
  }
}

async function findCandidateByArrayList(id) {
  return await db.jobseekerenrollmentpersonaldata.findAll({
    where: {
      id: id,
    },
  });
}

async function findCandidateLevelOne(id) {
  return await db.jobSeekerLeveloneAssesssment.findOne({
    where: {
      levelOneId: id,
    },
    order: [['client', 'DESC']]
  });
}

async function findCandidateLevelTwo(id) {
  return await db.jobSeekerLeveltwoExpandedAssesssment.findAll({
    where: {
      leveltwoId: id,
    },
    order: [['Client', 'DESC']]
  });
}

async function findLevelTwoExpandLevel(id) {
  return await db.jobSeekerLeveltwoAssesssment.findAll({
    where: {
      leveltwoId: id,
    },
    order: [['Client', 'DESC']]
  });
}

async function findCompanyName() {
  return await db.companyName.findAll({
    where: {
      company_status: "Active",
    },
  });
}

async function getAssignedTasks(id, type) {
  if (type === "TeamLeadId") {
    return await db.assignCandidate.findAll({
      where: {
        TeamLeadId: id,
      },
    });
  } else if (type === "RecruiterID") {
    return await db.assignCandidate.findAll({
      where: {
        RecruiterID: id,
      },
    });
  } else if (type === "supervisiorOneId") {
    return await db.assignCandidate.findAll({
      where: {
        [Op.or]: [{
          supervisiorOneId: id,
        },
        {
          supervisiorTwoId: id,
        },
        ],
      },
    });
  }
}

async function getAssignedTaskforAdmin() {
  return await db.assignCandidate.findAll({
    where: {
      AssessmentStatus: "PENDING"
    }
  });
}

async function getAssignedTask(id) {
  return await db.assignCandidate.findAll({
    where: {
      QuestionerID: id,
      AssessmentStatus: "PENDING"
    },
  });
}

async function getPreferedIndustry() {
  return await db.companyPreferedIndustry.findAll();
}

async function getPreferedJob() {
  return await db.preferedJobRole.findAll();
}

async function getTotalCandidate() {
  return await db.jobSeekerEnrollment.findAndCountAll();
}

async function getTotalEmployee() {
  return await db.employeeRegistration.findAndCountAll();
}


function getAllCandidate(candidateID, tempList, page, res, userData, accountAccess, status, dataCount) {

  var candidateList = [], empList = [], emp_can_list = [],
    candidateIDList = [];


  getEmployeeList().then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateID);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
          }
        }
      }
    }
    return db.jobSeekerEnrollment
      .findAll({
        include: [{
          model: db.jobSeekerLeveloneAssesssment,
          where: {
            levelOneId: candidateID
          },
        }],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      })
  }).then(result => {

    if (result) {

      if (tempList instanceof Array && tempList.length > 0) {

        for (let interview of tempList) {
          for (let src of result) {
            if (interview.dataValues.leveltwoId == src.dataValues.id) {
              console.log(src.dataValues.JobSeekerLevelOneAssessment)
              var data = {
                id: src.dataValues.id,
                name: src.dataValues.fullName,
                eName: src.dataValues.employeeName,
                l_two_Id: interview.dataValues.id,
                l_two_status: interview.dataValues.Assessment,
                l_two_client: interview.dataValues.Client,
                l_two_process: interview.dataValues.process,
                l_two_interviewDate: interview.dataValues.date,
                l_two_InterviewStatus: interview.dataValues.InterviewStatus,
                l_two_remark: interview.dataValues.remark,
                l_two_i_remark: interview.dataValues.InterviewRemark,
                l_two_modified: getDateOnly(interview.dataValues.updatedAt),
                mobone: src.dataValues.phoneNumberOne,
                mobtwo: src.dataValues.phoneNumberTwo,
                createdDate: getDateOnly(src.dataValues.createdAt),
                CandidateID: src.dataValues.CandidateID,
                l_one_modified: getDateOnly(src.dataValues.JobSeekerLevelOneAssessment.dataValues.updatedAt),
                l_one_remark: src.dataValues.JobSeekerLevelOneAssessment.dataValues.remark,
                l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment.dataValues.Assessment,
                l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment.dataValues.client,
                l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment.dataValues.process,
                l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment.dataValues.interview
              }
              candidateList.push(data);
            }
          }
        }
      }
    }

    return getAllCompanyName();
  }).then((result) => {
    var companyData = [];
    if (result) {
      for (let src of result) {
        var companyRole = [];
        for (let data of src.dataValues.CompanyJobs) {
          var dt = {
            id: data.id,
            role: data.role,
            pseudoName: data.pseudoName
          }
          companyRole.push(dt);
        }
        var resData = {
          id: src.dataValues.id,
          name: src.dataValues.company_name,
          roleData: companyRole
        }
        companyData.push(resData);
      }
    }


    res.render("candidate/candidateList", {
      candidateData: candidateList,
      pageTitle: "Candidate",
      path: "/candidate/candidateList",
      user: userData,
      accountAccess: accountAccess,
      currentPage: page,
      dataCount: dataCount,
      showingItem: ITEM_PER_PAGE < candidateID.length ? ITEM_PER_PAGE : candidateID.length,
      totalCandidate: candidateID.length,
      companyValue: companyData,
      hasNextPage: ITEM_PER_PAGE * page < candidateID.length,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      candidateId: null,
      lastPage: Math.ceil(candidateID.length / ITEM_PER_PAGE),
      formView: false,
      table: true,
      type: null,
      empList: emp_can_list,
      fresh: false

    });
  })
    .catch((err) => {
      fs.appendFile('mynewfile1.txt', err, function (err) {
        if (err) throw err;
        res.redirect("/login/index");
      });
    });

}

function getFinalAssessmnetCandidate(candidateID, page, res, userData, accountAccess, dataCount, dateList, totalList) {

  var candidateList = [], tempList = [], candidateIDList = [], empList = [], emp_can_list = [];
  var con_ = "leveltwoId";

  db.jobSeekerEnrollment.findAll({
    include: [{
      model: db.jobSeekerLeveltwoExpandedAssesssment,
      where: {
        id: candidateID
      }
    }],
    order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']]
  }).then((candidate) => {

    if (candidate) {
      tempList = candidate;
      for (let src of candidate) {
        candidateIDList.push(src.dataValues.id)
      }
    }

    return db.jobSeekerLeveloneAssesssment.findAll({
      where: {
        levelOneId: candidateIDList
      }
    })
  }).then(result => {

    if (result) {
      for (let src of tempList) {
        for (let rs of result) {
          if (rs.dataValues.levelOneId == src.dataValues.id) {
            for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {
              for (let dss of dateList) {
                if (dss._id == interview.dataValues.id) {
                  var data = {
                    id: src.dataValues.id,
                    name: src.dataValues.fullName,
                    eName: src.dataValues.employeeName,
                    l_two_Id: interview.dataValues.id,
                    l_two_status: interview.dataValues.Assessment,
                    l_two_client: interview.dataValues.Client,
                    l_two_process: interview.dataValues.process,
                    l_two_interviewDate: interview.dataValues.date,
                    l_two_InterviewStatus: interview.dataValues.InterviewStatus,
                    l_two_remark: interview.dataValues.remark,
                    l_two_i_remark: interview.dataValues.InterviewRemark,
                    l_two_modified: getDateOnly(interview.dataValues.updatedAt),
                    onBoardDate: dss.dates,
                    mobone: src.dataValues.phoneNumberOne,
                    mobtwo: src.dataValues.phoneNumberTwo,
                    createdDate: getDateOnly(src.dataValues.createdAt),
                    CandidateID: src.dataValues.CandidateID,
                    l_one_modified: getDateOnly(rs.dataValues.updatedAt),
                    l_one_remark: rs.dataValues.remark,
                    l_one_assessment: rs.dataValues.Assessment,
                    l_one_assessment_client: rs.dataValues.client,
                    l_one_assessment_process: rs.dataValues.process,
                    l_one_assessment_interview: rs.dataValues.interview
                  }
                  candidateList.push(data);
                  break;
                }
              }

            }
            break;
          }
        }
      }
    }
    else {

      for (let src of tempList) {
        for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {

          for (let dss of dateList) {
            if (dss._id == interview.dataValues.id) {

              var data = {
                id: src.dataValues.id,
                name: src.dataValues.fullName,
                eName: src.dataValues.employeeName,
                l_two_Id: interview.dataValues.id,
                l_two_status: interview.dataValues.Assessment,
                l_two_client: interview.dataValues.Client,
                l_two_process: interview.dataValues.process,
                l_two_interviewDate: interview.dataValues.date,
                l_two_InterviewStatus: interview.dataValues.InterviewStatus,
                l_two_remark: interview.dataValues.remark,
                l_two_i_remark: interview.dataValues.InterviewRemark,
                l_two_modified: getDateOnly(interview.dataValues.updatedAt),
                onBoardDate: dss.dates,
                mobone: src.dataValues.phoneNumberOne,
                mobtwo: src.dataValues.phoneNumberTwo,
                createdDate: getDateOnly(src.dataValues.createdAt),
                CandidateID: src.dataValues.CandidateID,
                l_one_modified: "",
                l_one_remark: "",
                l_one_assessment: "",
                l_one_assessment_client: "",
                l_one_assessment_process: "",
                l_one_assessment_interview: ""
              }
              candidateList.push(data);
              break;

            }
          }

        }
      }
    }


    candidateList.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(b.onBoardDate) - new Date(a.onBoardDate);
    });

    return getEmployeeList()
  }).then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateIDList);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
            break;
          }
        }
      }
    }
    return getAllCompanyName();
  }).then((result) => {
    var companyData = [];
    if (result) {
      for (let src of result) {
        var companyRole = [];
        for (let data of src.dataValues.CompanyJobs) {
          var dt = {
            id: data.id,
            role: data.role,
            pseudoName: data.pseudoName
          }
          companyRole.push(dt);
        }
        var resData = {
          id: src.dataValues.id,
          name: src.dataValues.company_name,
          roleData: companyRole
        }
        companyData.push(resData);
      }
    }

    res.render("candidate/candidateInterviewList", {
      candidateData: candidateList,
      pageTitle: "Candidate",
      path: "/candidate/candidateList",
      user: userData,
      accountAccess: accountAccess,
      currentPage: page,
      dataCount: dataCount,
      companyValue: companyData,
      showingItem: ITEM_PER_PAGE < totalList ? ITEM_PER_PAGE : totalList,
      totalCandidate: totalList,
      hasNextPage: ITEM_PER_PAGE * page < totalList,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      candidateId: null,
      lastPage: Math.ceil(totalList / ITEM_PER_PAGE),
      formView: false,
      table: true,
      empList: emp_can_list,
      fresh: false

    });
  })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/login/index");
    });

}

function getAwaitJoinigCandidate(candidateID, page, res, userData, accountAccess, dataCount) {

  var candidateList = [], tempList = [], candidateIDList = [], empList = [], emp_can_list = [];

  getEmployeeList().then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateID);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
            break;
          }
        }
      }
    }
    return db.jobSeekerEnrollment.findAll({
      include: [{
        model: db.jobSeekerLeveltwoExpandedAssesssment,
        where: {
          leveltwoId: candidateID,
          InterviewStatus: "SELECTED"
        }
      }],
      order: [[{ model: db.jobSeekerLeveltwoExpandedAssesssment }, 'Client', 'DESC']],
      offset: ITEM_PER_PAGE * (page - 1),
      limit: ITEM_PER_PAGE,
    })
  })
    .then((candidate) => {

      if (candidate) {
        tempList = candidate;
        for (let src of candidate) {
          candidateIDList.push(src.dataValues.id)
        }
      }

      return db.jobSeekerLeveloneAssesssment.findAll({
        where: {
          levelOneId: candidateIDList
        }
      })
    }).then(result => {

      if (result) {
        for (let src of tempList) {
          for (let rs of result) {
            if (rs.dataValues.levelOneId == src.dataValues.id) {
              for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {

                var data = {
                  id: src.dataValues.id,
                  name: src.dataValues.fullName,
                  eName: src.dataValues.employeeName,
                  l_two_Id: interview.dataValues.id,
                  l_two_status: interview.dataValues.Assessment,
                  l_two_client: interview.dataValues.Client,
                  l_two_process: interview.dataValues.process,
                  l_two_interviewDate: interview.dataValues.date,
                  l_two_InterviewStatus: interview.dataValues.InterviewStatus,
                  l_two_remark: interview.dataValues.remark,
                  l_two_i_remark: interview.dataValues.InterviewRemark,
                  l_two_modified: getDateOnly(interview.dataValues.updatedAt),
                  mobone: src.dataValues.phoneNumberOne,
                  mobtwo: src.dataValues.phoneNumberTwo,
                  createdDate: getDateOnly(src.dataValues.createdAt),
                  CandidateID: src.dataValues.CandidateID,
                  l_one_modified: getDateOnly(rs.dataValues.updatedAt),
                  l_one_remark: rs.dataValues.remark,
                  l_one_assessment: rs.dataValues.Assessment,
                  l_one_assessment_client: rs.dataValues.client,
                  l_one_assessment_process: rs.dataValues.process,
                  l_one_assessment_interview: rs.dataValues.interview
                }
                candidateList.push(data);
              }
              break;
            }
          }
        }
      }
      else {

        for (let src of tempList) {
          for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {

            var data = {
              id: src.dataValues.id,
              name: src.dataValues.fullName,
              eName: src.dataValues.employeeName,
              l_two_Id: interview.dataValues.id,
              l_two_status: interview.dataValues.Assessment,
              l_two_client: interview.dataValues.Client,
              l_two_process: interview.dataValues.process,
              l_two_interviewDate: interview.dataValues.date,
              l_two_InterviewStatus: interview.dataValues.InterviewStatus,
              l_two_remark: interview.dataValues.remark,
              l_two_i_remark: interview.dataValues.InterviewRemark,
              l_two_modified: getDateOnly(interview.dataValues.updatedAt),
              mobone: src.dataValues.phoneNumberOne,
              mobtwo: src.dataValues.phoneNumberTwo,
              createdDate: getDateOnly(src.dataValues.createdAt),
              CandidateID: src.dataValues.CandidateID,
              l_one_modified: "",
              l_one_remark: "",
              l_one_assessment: "",
              l_one_assessment_client: "",
              l_one_assessment_process: "",
              l_one_assessment_interview: ""
            }
            candidateList.push(data);
          }
        }
      }

      return getAllCompanyName();
    }).then((result) => {
      var companyData = [];
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }
      }
      res.render("candidate/candidateInterviewList", {
        candidateData: candidateList,
        pageTitle: "Candidate",
        path: "/candidate/candidateList",
        user: userData,
        accountAccess: accountAccess,
        currentPage: page,
        dataCount: dataCount,
        companyValue: companyData,
        showingItem: ITEM_PER_PAGE < candidateID.length ? ITEM_PER_PAGE : candidateID.length,
        totalCandidate: candidateID.length,
        hasNextPage: ITEM_PER_PAGE * page < candidateID.length,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        candidateId: null,
        lastPage: Math.ceil(candidateID.length / ITEM_PER_PAGE),
        formView: false,
        table: true,
        type: null,
        empList: emp_can_list,
        fresh: false
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/login/index");
    });

}


async function getLanguage() {
  return await db.jobSeekerLanguage.findAll();
}

async function insertLanguage(languageList) {
  return await db.job_language.bulkCreate(languageList, {
    returning: true,
  });
}

async function getLanguageById(id) {
  return await db.job_language.findAll({
    where: {
      langugeId: id
    }
  })
}

async function getAllComapanyName() {
  return await db.companyName.findAll({
    where: {
      company_response: 'EMPANELLED',
      company_status: 'ACTIVE'
    },
    include: [{
      model: db.companyJob // will create a left join
    }]
  })
}

async function getAllCompanyName() {
  return await db.companyName.findAll({
    include: [{
      model: db.companyJob // will create a left join
    }]
  })
}

function getCandidateListForLevelOne(candidate, tempList, userData, accountAccess, page, totalCandidateCount, res, dataCount, type) {
  var candidateList = [], candidateIDList = [], empList = [], emp_can_list = [];
  if (candidate) {
    for (let src of candidate) {
      candidateIDList.push(src.dataValues.id);
      var data = {
        id: src.dataValues.id,
        name: src.dataValues.fullName,
        eName: src.dataValues.employeeName,
        l_two_Id: "",
        l_two_client: "",
        l_two_process: "",
        l_two_interviewDate: "",
        l_two_InterviewStatus: "",
        l_two_status: "",
        l_two_remark: "",
        l_two_modified: "",
        l_two_i_remark: "",
        mobone: src.dataValues.phoneNumberOne,
        mobtwo: src.dataValues.phoneNumberTwo,
        createdDate: getDateOnly(src.dataValues.createdAt),
        CandidateID: src.dataValues.CandidateID,
        l_one_modified: getDateOnly(src.dataValues.JobSeekerLevelOneAssessment.dataValues.updatedAt),
        l_one_remark: src.dataValues.JobSeekerLevelOneAssessment.dataValues.remark,
        l_one_assessment: src.dataValues.JobSeekerLevelOneAssessment.dataValues.Assessment,
        l_one_assessment_client: src.dataValues.JobSeekerLevelOneAssessment.dataValues.client,
        l_one_assessment_process: src.dataValues.JobSeekerLevelOneAssessment.dataValues.process,
        l_one_assessment_interview: src.dataValues.JobSeekerLevelOneAssessment.dataValues.interview
      }
      candidateList.push(data);
    }
  }

  getEmployeeList().then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateIDList);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
          }
        }
      }
    }
    return getAllComapanyName();
  }).then((result) => {
    var companyData = [];
    if (result) {
      for (let src of result) {
        var companyRole = [];
        for (let data of src.dataValues.CompanyJobs) {
          var dt = {
            id: data.id,
            role: data.role,
            pseudoName: data.pseudoName
          }
          companyRole.push(dt);
        }
        var resData = {
          id: src.dataValues.id,
          name: src.dataValues.company_name,
          roleData: companyRole
        }
        companyData.push(resData);
      }
    }
    res.render("candidate/candidateList", {
      candidateData: candidateList,
      pageTitle: "Candidate",
      path: "/candidate/candidateList",
      user: userData,
      accountAccess: accountAccess,
      currentPage: page,
      dataCount: dataCount,
      showingItem: ITEM_PER_PAGE < totalCandidateCount ? ITEM_PER_PAGE : totalCandidateCount,
      totalCandidate: totalCandidateCount,
      companyValue: companyData,
      hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      candidateId: null,
      lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
      formView: false,
      table: true,
      type: type,
      empList: emp_can_list,
      fresh: false,
    });
  })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/login/index");
    });
}

function getCandidateList(candidate, tempList, userData, accountAccess, page, totalCandidateCount, res, dataCount) {
  var candidateIDList = [], empList = [], emp_can_list = [],
    candidateList = [];
  if (candidate) {

    for (let src of candidate) {
      candidateIDList.push(src.dataValues.id);
    }
  }

  getEmployeeList().then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateIDList);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
            break;
          }
        }
      }
    }
    return db.jobSeekerLeveloneAssesssment.findAll({
      where: {
        levelOneId: candidateIDList
      }

    })
  })
    .then(result => {
      if (result) {
        for (let src of tempList) {
          for (let rs of result) {
            if (rs.dataValues.levelOneId == src.dataValues.id) {
              for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {
                var data = {
                  id: src.dataValues.id,
                  name: src.dataValues.fullName,
                  eName: src.dataValues.employeeName,
                  l_two_Id: interview.dataValues.id,
                  l_two_status: interview.dataValues.Assessment,
                  l_two_client: interview.dataValues.Client,
                  l_two_process: interview.dataValues.process,
                  l_two_interviewDate: interview.dataValues.date,
                  l_two_InterviewStatus: interview.dataValues.InterviewStatus,
                  l_two_remark: interview.dataValues.remark,
                  l_two_i_remark: interview.dataValues.InterviewRemark,
                  l_two_modified: getDateOnly(interview.dataValues.updatedAt),
                  mobone: src.dataValues.phoneNumberOne,
                  mobtwo: src.dataValues.phoneNumberTwo,
                  createdDate: getDateOnly(src.dataValues.createdAt),
                  CandidateID: src.dataValues.CandidateID,
                  l_one_modified: getDateOnly(rs.dataValues.updatedAt),
                  l_one_remark: rs.dataValues.remark,
                  l_one_assessment: rs.dataValues.Assessment,
                  l_one_assessment_client: rs.dataValues.client,
                  l_one_assessment_process: rs.dataValues.process,
                  l_one_assessment_interview: rs.dataValues.interview
                }
                candidateList.push(data);
              }
              break;
            }
          }
        }
      } else {

        for (let src of tempList) {
          for (let interview of src.dataValues.JobSeekerLevelTwoAssessmentExpandLevels) {

            var data = {
              id: src.dataValues.id,
              name: src.dataValues.fullName,
              eName: src.dataValues.employeeName,
              l_two_Id: interview.dataValues.id,
              l_two_status: interview.dataValues.Assessment,
              l_two_client: interview.dataValues.Client,
              l_two_process: interview.dataValues.process,
              l_two_interviewDate: interview.dataValues.date,
              l_two_InterviewStatus: interview.dataValues.InterviewStatus,
              l_two_remark: interview.dataValues.remark,
              l_two_i_remark: interview.dataValues.InterviewRemark,
              l_two_modified: getDateOnly(interview.dataValues.updatedAt),
              mobone: src.dataValues.phoneNumberOne,
              mobtwo: src.dataValues.phoneNumberTwo,
              createdDate: getDateOnly(src.dataValues.createdAt),
              CandidateID: src.dataValues.CandidateID,
              l_one_modified: "",
              l_one_remark: "",
              l_one_assessment: "",
              l_one_assessment_client: "",
              l_one_assessment_process: "",
              l_one_assessment_interview: ""
            }
            candidateList.push(data);
          }
        }
      }
      return getAllComapanyName();
    }).then((result) => {
      var companyData = [];
      if (result) {
        for (let src of result) {
          var companyRole = [];
          for (let data of src.dataValues.CompanyJobs) {
            var dt = {
              id: data.id,
              role: data.role,
              pseudoName: data.pseudoName
            }
            companyRole.push(dt);
          }
          var resData = {
            id: src.dataValues.id,
            name: src.dataValues.company_name,
            roleData: companyRole
          }
          companyData.push(resData);
        }
      }
      res.render("candidate/candidateList", {
        candidateData: candidateList,
        pageTitle: "Candidate",
        path: "/candidate/candidateList",
        user: userData,
        accountAccess: accountAccess,
        currentPage: page,
        dataCount: dataCount,
        showingItem: ITEM_PER_PAGE < totalCandidateCount ? ITEM_PER_PAGE : totalCandidateCount,
        totalCandidate: totalCandidateCount,
        companyValue: companyData,
        hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        candidateId: null,
        lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
        formView: false,
        empList: emp_can_list,
        type: null,
        table: true,
        fresh: false
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/login/index");
    });
}



function getDateOnly(dateValue) {
  return dateValue.toISOString().split('T')[0]; //new Date(dateValue).getDay() + " " + new Date(dateValue).getDate() + "-" + new Date(dateValue).getMonth() + +"-" + new Date(dateValue).getYear()
}

async function getEmployeeDataList(empID) {
  return db.employeeRegistration.findAll({
    where: {
      id: {
        [Op.ne]: empID
      },
      recruiterType: {
        [Op.ne]: 'ADMIN'
      }
    },
    attributes: ["fullName", 'id']
  })
}

async function getEmployeeList() {
  return db.employeeRegistration.findAll({
    where: {
      recruiterType: {
        [Op.notIn]: ['ADMIN', 'MANAGER', 'SUPERVISIOR', 'TEAM_LEADER']
      }
    },
    attributes: ["fullName", 'id']
  })
}


async function getAssignerList(id) {
  return db.assignCandidate.findAll({
    where: {
      AssignCandidate: id,
    },
    attributes: ["AssignCandidate", "QuestionerID"],
  });
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  console.log([year, month, day].join('-'));
  return [year, month, day].join('-');
}


function removeEmojis(_data) {
  const regexExp = /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/gi;
  if (regexExp.test(_data))
    return _data.replace(regex, "")
  else
    return _data
}

function getFreshCandidateList(candidateLists, userData, accountAccess, page, totalCandidateCount, dataCount, res) {
  var empList = [], emp_can_list = [], candidateList = [], candidateIDList = [];

  for (let src of candidateLists) {
    candidateIDList.push(src.id);
  }

  getEmployeeList().then((result) => {
    if (result) {
      empList = result;
    }
    return getAssignerList(candidateIDList);
  }).then(result => {
    if (result) {
      for (let em of empList) {
        for (let rs of result) {
          if (em.dataValues.id === rs.dataValues.QuestionerID) {
            var data = {
              empName: em.dataValues.fullName,
              canId: rs.dataValues.AssignCandidate
            }
            emp_can_list.push(data);
          }
        }
      }
    }

    for (let src of candidateLists) {

      var data = {
        id: src.id,
        name: src.fullName,
        eName: src.employeeName,
        l_two_Id: "",
        l_two_status: "",
        l_two_client: "",
        l_two_process: "",
        l_two_interviewDate: "",
        l_two_InterviewStatus: "",
        l_two_remark: "",
        l_two_modified: "",
        l_two_i_remark: "",
        mobone: src.phoneNumberOne,
        mobtwo: src.phoneNumberTwo,
        createdDate: getDateOnly(src.createdAt),
        CandidateID: src.CandidateID,
        l_one_modified: "",
        l_one_remark: "",
        l_one_assessment: "",
        l_one_assessment_client: "",
        l_one_assessment_process: "",
        l_one_assessment_interview: ""
      }
      candidateList.push(data);
    }

    return getAllComapanyName();
  }).then((result) => {
    var companyData = [];
    if (result) {
      for (let src of result) {
        var companyRole = [];
        for (let data of src.dataValues.CompanyJobs) {
          var dt = {
            id: data.id,
            role: data.role,
            pseudoName: data.pseudoName
          }
          companyRole.push(dt);
        }
        var resData = {
          id: src.dataValues.id,
          name: src.dataValues.company_name,
          roleData: companyRole
        }
        companyData.push(resData);
      }
    }
    res.render("candidate/candidateList", {
      candidateData: candidateList,
      pageTitle: "Candidate",
      user: userData,
      accountAccess: accountAccess,
      currentPage: page,
      dataCount: dataCount,
      showingItem: ITEM_PER_PAGE < totalCandidateCount ? ITEM_PER_PAGE : totalCandidateCount,
      totalCandidate: totalCandidateCount,
      companyValue: companyData,
      hasNextPage: ITEM_PER_PAGE * page < totalCandidateCount,
      hasPreviousPage: page > 1,
      nextPage: page + 1,
      previousPage: page - 1,
      candidateId: null,
      lastPage: Math.ceil(totalCandidateCount / ITEM_PER_PAGE),
      formView: false,
      empList: emp_can_list,
      type: null,
      table: true,
      fresh: true
    });
  })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

async function getFreshCandidate(limit, offset) {

  return await db.sequelize.query(`
      SELECT JobSeekerEnrollmentPersonalData.id, JobSeekerEnrollmentPersonalData.fullName,
    JobSeekerEnrollmentPersonalData.employeeName, JobSeekerEnrollmentPersonalData.phoneNumberOne,
    JobSeekerEnrollmentPersonalData.phoneNumberTwo, JobSeekerEnrollmentPersonalData.createdAt,
    JobSeekerEnrollmentPersonalData.CandidateID 
      FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments
  ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id)
      LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
  ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
      where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
  JobSeekerLevelOneAssessments.Assessment IS NULL `+ ` limit ` + limit + ` offset ` + offset, {
    type: db.Sequelize.QueryTypes.SELECT,

  })
}

async function getFreshCandidateCount() {

  return await db.sequelize.query(`
      SELECT JobSeekerEnrollmentPersonalData.id, JobSeekerEnrollmentPersonalData.fullName,
    JobSeekerEnrollmentPersonalData.employeeName, JobSeekerEnrollmentPersonalData.phoneNumberOne,
    JobSeekerEnrollmentPersonalData.phoneNumberTwo, JobSeekerEnrollmentPersonalData.createdAt,
    JobSeekerEnrollmentPersonalData.CandidateID 
      FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments
  ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id)
      LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
  ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
      where JobSeekerLevelTwoAssessmentExpandLevels.Assessment IS NULL AND
  JobSeekerLevelOneAssessments.Assessment IS NULL`, {
    type: db.Sequelize.QueryTypes.SELECT,

  })
}

async function getFreshCandidateBySearchCriteria(whereStatement) { //, limit, offset
  return await db.sequelize.query(`
      SELECT JobSeekerEnrollmentPersonalData.id, JobSeekerEnrollmentPersonalData.fullName,
    JobSeekerEnrollmentPersonalData.employeeName, JobSeekerEnrollmentPersonalData.phoneNumberOne,
    JobSeekerEnrollmentPersonalData.phoneNumberTwo, JobSeekerEnrollmentPersonalData.createdAt,
    JobSeekerEnrollmentPersonalData.CandidateID 
      FROM JobSeekerEnrollmentPersonalData LEFT JOIN JobSeekerLevelOneAssessments
  ON(JobSeekerLevelOneAssessments.levelOneId = JobSeekerEnrollmentPersonalData.id)
      LEFT JOIN JobSeekerLevelTwoAssessmentExpandLevels
  ON(JobSeekerLevelTwoAssessmentExpandLevels.leveltwoId = JobSeekerEnrollmentPersonalData.id)
      ` + whereStatement, //+ ` limit ` + limit + ` offset` + offset
    {
      type: db.Sequelize.QueryTypes.SELECT
    })
}


async function getFreshCandidateByIds(list) {
  return await db.sequelize.query(`
      SELECT JobSeekerEnrollmentPersonalData.id, JobSeekerEnrollmentPersonalData.fullName,
    JobSeekerEnrollmentPersonalData.employeeName, JobSeekerEnrollmentPersonalData.phoneNumberOne,
    JobSeekerEnrollmentPersonalData.phoneNumberTwo, JobSeekerEnrollmentPersonalData.createdAt,
    JobSeekerEnrollmentPersonalData.CandidateID 
      FROM JobSeekerEnrollmentPersonalData where JobSeekerEnrollmentPersonalData.id IN(`+ list + `)`, {
    type: db.Sequelize.QueryTypes.SELECT
  })
}


async function getSkillData() { 
  return await db.jobSeekerPreferedSkillset.findAll({
    attributes: ["skill"] ,
  });
}