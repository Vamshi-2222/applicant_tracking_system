const db = require("../config/config");
const Op = db.Op;
const bcrypt = require("bcryptjs");
const role = require("../util/constant");

var companyID = 100000000;
const ITEM_PER_PAGE = 50;

const {
  validationResult,
  matchedData
} = require("express-validator");

exports.getInterview = (req, res, next) => {
  var userData = req.session.user;
  var userTypeList;

  res.render("admin/interview", {
    user: userData,
  });

}

exports.getAddRecruiter = (req, res, next) => {
  var userData = req.session.user;
  var userTypeList;

  if (userData === "ADMIN") {
    userTypeList = getAdminPermission();
  } else if (userData === "MANAGER") {
    userTypeList = getManagerPermission();
  } else if (userData === "TEAM_LEADER") {
    userTypeList = getTLPermission();
  } else if (userData === "SUPERVISIOR") {
    userTypeList = getSupervisiorPermission
  }


  res.render("recruiter/add-recruiter", {
    pageTitle: "Recruiter",
    path: "/recruiter/add-recruiter",
    user: userData,
    userType: userTypeList,
    addData: true,
    editData: false,
    errors: null,
    inputData: null,
  });
};

exports.getEmployeeList = (req, res, next) => {
  var page, password;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  if (req.query.password) {
    if (req.query.password === 'true')
      password = true;
    else
      password = false;
  } else {
    password = false;
  }

  console.log(req.query.page, " --> ", req.query.password)

  const userData = req.session.user;
  const countData = employeeCount();
  let totalEmployeeCount;

  countData
    .then((count) => {
      totalEmployeeCount = count;
      return db.employeeRegistration.findAll({
        // offset: ITEM_PER_PAGE * (page - 1),
        // limit: ITEM_PER_PAGE,
      });
    })
    .then((employee) => {
      console.log("STATUS => ", password);
      res.render("recruiter/edit-delete-employee", {
        employeeData: employee,
        pageTitle: "Employee",
        path: "/recruiter/edit-delete-employee",
        user: userData,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalEmployeeCount,
        hasNextPage: ITEM_PER_PAGE * page < totalEmployeeCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEmployeeCount / ITEM_PER_PAGE),
        password: password,
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
};

exports.getManager = (req, res, next) => {
  getEmployee(req, res, "MANAGER", "ACTIVE");
};

exports.getTeamlead = (req, res, next) => {
  getEmployee(req, res, "TEAM_LEADER", "ACTIVE");
};

exports.getBusinessDevelopment = (req, res, next) => {
  getEmployee(req, res, "BUSSINESS_DEVELOPMENT", "ACTIVE");
};

exports.getSupervisior = (req, res, next) => {
  getEmployee(req, res, "SUPERVISIOR", "ACTIVE");
};

exports.getFulltime = (req, res, next) => {
  getEmployee(req, res, "FULLTIME_RECRUITER", "ACTIVE");
};

exports.getFreelancer = (req, res, next) => {
  getEmployee(req, res, "FREELANCER", "ACTIVE");
};

exports.getInternOff = (req, res, next) => {
  getEmployee(req, res, "INTERN_OFF", "ACTIVE");
};

exports.getInternOn = (req, res, next) => {
  getEmployee(req, res, "INTERN_ON", "ACTIVE");
};

exports.getSubvendor = (req, res, next) => {
  getEmployee(req, res, "SUB_VENDOR", "ACTIVE");
};

function getEmployee(req, res, value, status)
{
  var page, password;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  if (req.query.password) {
    if (req.query.password === 'true')
      password = true;
    else
      password = false;
  } else {
    password = false;
  }

  const userData = req.session.user;
  const countData = employeeCount();
  let totalEmployeeCount;

  countData
    .then((count) => {
      totalEmployeeCount = count;
      if (password)
      return db.employeeRegistration.findAll({
        where:
        {
          recruiterType: value,
        }
      });
      else
        return db.employeeRegistration.findAll({
          where: {
            recruiterType: value,
            status: status
          }
        });
        
    })
    .then((employee) => {
      console.log("STATUS => ", password);
      res.render("recruiter/edit-delete-employee", {
        employeeData: employee,
        pageTitle: "Employee",
        path: "/recruiter/edit-delete-employee",
        user: userData,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalEmployeeCount,
        hasNextPage: ITEM_PER_PAGE * page < totalEmployeeCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEmployeeCount / ITEM_PER_PAGE),
        password: password,
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
}

exports.getOnBoardEmployeeList = (req, res, next) => {
  var page, password;
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }

  if (req.query.password) {
    if (req.query.password === 'true')
      password = true;
    else
      password = false;
  } else {
    password = false;
  }

  console.log(req.query.page, " --> ", req.query.password)

  const userData = req.session.user;
  const countData = employeeCount();
  let totalEmployeeCount;

  countData
    .then((count) => {
      totalEmployeeCount = count;
      return db.employeeRegistration.findAll({
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((employee) => {
      var emp = [];
      if (employee) { 
        for (let src of employee) { 
          if (src.dataValues.onboarding === 'PENDING' && src.dataValues.documentation === 'PENDING') { 
            emp.push(src);
          }
        }
      }
      console.log("STATUS => ", password);
      res.render("admin/onBoard", {
        employeeData: emp,
        pageTitle: "Employee",
        path: "/admin/onBoard",
        user: userData,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalEmployeeCount,
        hasNextPage: ITEM_PER_PAGE * page < totalEmployeeCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalEmployeeCount / ITEM_PER_PAGE),
        password: password,
      });
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
};

exports.getSaveRecruiter = (req, res, next) => {
  var userData = req.session.user;
  var customerId;
  var userTypeList, empiD, counter = 0,
    type;
  type = req.body.recruiterType;
  var allCandidate = req.body.allCandidate ? 1 : 0;
  const recruiterType = req.body.recruiterType;
  console.log(req.body, "<<<>>>>", allCandidate);
  const errors = validationResult(req);

  if (userData === "ADMIN") {
    userTypeList = getAdminPermission();
  } else if (userData === "MANAGER") {
    userTypeList = getManagerPermission();
  } else if (userData === "TEAM_LEADER") {
    userTypeList = getTLPermission();
  } else if (userData === "SUPERVISIOR") {
    userTypeList = getSupervisiorPermission
  }

  if (!errors.isEmpty()) {
    var invalidData = errors.mapped();
    var inputData = matchedData(req);
    console.log(invalidData, "  -->  ", inputData);


    res.render("recruiter/add-recruiter", {
      pageTitle: "Recruiter",
      path: "/recruiter/add-recruiter",
      user: userData,
      userType: userTypeList,
      addData: true,
      editData: false,
      errors: invalidData,
      inputData: inputData,
    });

  } else {

    db.employeeRegistration
      .findAll({
        attributes: ["employeeId"],
      })
      .then((company) => {
        console.log('Employee_ID  => ', company.length)
        if (
          company === undefined ||
          company === null ||
          company.length === 1) {
          companyID++;
          customerId = "EMP" + companyID;
        } else {
          var value = company[company.length - 1].dataValues.employeeId;
          var valueCount = +value.replace("EMP", "");
          valueCount++;
          customerId = "EMP" + valueCount;
        }
        console.log(customerId, "EMP ID");
        const data = addEmployee(req, userData, customerId);
        return data;
      }).then(result => {
        if (result) {
          empiD = result.dataValues.id;
          // if (type === 'MANAGER') {
          //   return;
          // } else
          if (type === 'TEAM_LEADER' || type === 'SUPERVISIOR') {
            if (req.body.reportingmanager) {
              counter = 1;
              return getManagerCount(empiD, req)
            }
          } else {
            if (req.body.reportingmanager) {
              counter = 2;
              return getManagerCount(empiD, req)
            }
          }
        }
      })
      .then(result => {
        //if (result) {
        if (counter == 2) {
          if (req.body.reportingTeamLead) {
            counter = 3;
            return getTeamLeadCount(empiD, req);
          }
        }
        // else {
        //   return;
        // }
        //}
      }).then(result => {
        //if (result) {
        if (counter == 3) {
          if (req.body.reportingSupervisior) {
            counter = 4;
            return getSupervisiorCount(empiD, req);
          }
        }

        if(recruiterType === "MANAGER" &&  allCandidate === 1){
          return setCandidateCountForNewManager()
        }
        //   else {
        //     return;
        //   }
        // }
      }).then(result => {
        if(recruiterType === "MANAGER" &&  allCandidate === 1){
          if(result && Array.isArray(result)){
            var user = [];
            for(let r of result){
              var dataItem = {
                AssignBy: "MANAGER",
                QuestionerID: r.QuestionerID,
                AssignCandidate: r.AssignCandidate,
                AssignerID: empiD,
                AssessmentStatus: r.AssessmentStatus
              };
              user.push(dataItem);
            }
            return db.assignCandidate.bulkCreate(user, {
            });
          }
        }        
      })
      .then((result) => {
        if(result){
          console.log(result);
        }
        res.render("recruiter/add-recruiter", {
          pageTitle: "Recruiter",
          path: "/recruiter/add-recruiter",
          user: userData,
          userType: userTypeList,
          addData: true,
          editData: false
        });
      })
      .catch((err) => {
        console.log("Add recruiter error => ", err);
        res.redirect("/");
      });
  }
};



async function getManagerCount(empiD, req) {
  var managerCount = [];
  if (Array.isArray(req.body.reportingmanager)) {
    for (let src of req.body.reportingmanager) {
      var data = {
        'managerID': src,
        'managersId': empiD
      }
      managerCount.push(data);
    }
  } else {
    var data = {
      'managerID': req.body.reportingmanager,
      'managersId': empiD
    }
    managerCount.push(data);
  }

  return db.managerCount.bulkCreate(managerCount, {
    returning: true,
  });

}

async function getTeamLeadCount(empiD, req) {
  var managerCount = [];
  if (Array.isArray(req.body.reportingTeamLead)) {
    for (let src of req.body.reportingTeamLead) {
      var data = {
        'teamLeadID': src,
        'teamLeadsId': empiD
      }
      managerCount.push(data);
    }
  } else {
    var data = {
      'teamLeadID': req.body.reportingTeamLead,
      'teamLeadsId': empiD
    }
    managerCount.push(data);
  }

  return db.teamLeadCount.bulkCreate(managerCount, {
    returning: true,
  });

}

async function getSupervisiorCount(empiD, req) {
  var managerCount = [];
  if (Array.isArray(req.body.reportingSupervisior)) {
    for (let src of req.body.reportingSupervisior) {
      var data = {
        'superVisiorID': src,
        'supervisiorsId': empiD
      }
      managerCount.push(data);
    }
  } else {
    var data = {
      'superVisiorID': req.body.reportingSupervisior,
      'supervisiorsId': empiD
    }
    managerCount.push(data);
  }

  return db.supervisiorCount.bulkCreate(managerCount, {
    returning: true,
  });

}

exports.updateEmployee = (req, res, next) => {

  const empiD = req.body.employeeID;
  const userData = req.session.user;
  const company = findEmployeeByID(empiD);
  var counter = 0, type = req.body.recruiterType;

  var man_id = [], spr_id = [], team_id = [], can_id = [];

  company
    .then((result) => {
      console.log(result)
      if (result) {
        const data = updateEmployee(req, userData, empiD, result.dataValues.recruiterType, result.dataValues.accountAccess);
        return data;
      }
    })
    .then(result => {
      console.log("UPDATE", 1, result);
      return db.managerCount.destroy({
        where: {
          managersId: empiD
        }
      })
    })
    .then(result => {
      console.log("UPDATE", 2, result);
      return db.supervisiorCount.destroy({
        where: {
          supervisiorsId: empiD
        }
      })
    })
    .then(result => {
      console.log("UPDATE", 3, result);
      return db.teamLeadCount.destroy({
        where: {
          teamLeadsId: empiD
        }
      })
    })
    .then(result => {
      console.log("INSERT", 1, result);
      return db.assignCandidate.findAll({
        where: {
          AssignerID: empiD,
          QuestionerID: +empiD
          
        },
        attributes: ["AssignCandidate"]
      })
    }).then(result => {
      console.log("ASS_", result);
      if (result) {
        if (Array.isArray(result) && result.length > 0) {
          for (let rec of result) {
            can_id.push(rec.dataValues.AssignCandidate);
          }
        } else if (result instanceof String) {
          can_id.push(result.dataValues.AssignCandidate);
        } else {
          can_id = [];
        }
      }

        if (type === 'TEAM_LEADER' || type === 'SUPERVISIOR')
        {  
          counter = 1;
          if (req.body.reportingmanager) {
            
            return getManagerCount(empiD, req)
          }
        } else {
          counter = 2;
          if (req.body.reportingmanager) {
            
            return getManagerCount(empiD, req)
          }
        }
      
    }).then(result => {
      console.log("INSERT", 2, result);

      if (result) {
        if (Array.isArray(result) && result.length > 0)
        { 
          if (can_id.length > 0) {
            for (let rec of result) {
              for (let cID of can_id) {
                var dataItem = {
                  AssignBy: type,
                  QuestionerID: rec.dataValues.managerID,
                  AssignCandidate: +cID,
                  AssignerID: empiD
                };
                man_id.push(dataItem);
              }
            }
          }
        }
        else if (result instanceof String)
        {
          if (can_id.length > 0) {
              for (let cID of can_id) {
                var dataItem = {
                  AssignBy: type,
                  QuestionerID: rec.dataValues.managerID,
                  AssignCandidate: +cID,
                  AssignerID: empiD
                };
                man_id.push(dataItem);
              }
          }
        }
      }

      if (counter === 2) {
        counter = 3;
          if (req.body.reportingTeamLead) {
            return getTeamLeadCount(empiD, req);
          }
      }
    }).then(result => {
      console.log("INSERT", 3, result);
      
      if (result) {
        if (Array.isArray(result) && result.length > 0) {
          if (can_id.length > 0) {
            for (let rec of result) {
              for (let cID of can_id) {
                var dataItem = {
                  AssignBy: type,
                  QuestionerID: rec.dataValues.teamLeadID,
                  AssignCandidate: +cID,
                  AssignerID: empiD
                };
                team_id.push(dataItem);
              }
            }
          }
        } else if (result instanceof String) {
          if (can_id.length > 0) {
            for (let cID of can_id) {
              var dataItem = {
                AssignBy: type,
                QuestionerID: rec.dataValues.teamLeadID,
                AssignCandidate: +cID,
                AssignerID: empiD
              };
              team_id.push(dataItem);
            }
          }
        }
      }
      if (counter === 3) {
          if (req.body.reportingSupervisior) {
            return getSupervisiorCount(empiD, req);
          }
      }  
    }).then(result => {
      
      if (result) {
        if (Array.isArray(result) && result.length > 0) {
          if (can_id.length > 0) {
            for (let rec of result) {
              for (let cID of can_id) {
                var dataItem = {
                  AssignBy: type,
                  QuestionerID: rec.dataValues.superVisiorID,
                  AssignCandidate: +cID,
                  AssignerID: empiD
                };
                spr_id.push(dataItem);
              }
            }
          }
        } else if (result instanceof String) {
          if (can_id.length > 0) {
            for (let cID of can_id) {
              var dataItem = {
                AssignBy: type,
                QuestionerID: rec.dataValues.superVisiorID,
                AssignCandidate: +cID,
                AssignerID: empiD
              };
              spr_id.push(dataItem);
            }
          }
        }
      }

      return db.assignCandidate.destroy({
        where: {
          AssignerID: empiD,
          QuestionerID: {
            [Op.ne]: empiD
          }
        },
      })
    }).then((result) => {
      console.log("ASS _DEL", result);
      
      if (spr_id.length > 0)
      {
        return db.assignCandidate.bulkCreate(spr_id, {
          updateOnDuplicate: ["AssignCandidate"]
        });
      }
    }).then((result) => {
      console.log("ASS _UPT1", result);

      if (team_id.length > 0) {
        return db.assignCandidate.bulkCreate(team_id, {
          updateOnDuplicate: ["AssignCandidate"]
        });
      }
    }).then((result) => {
      console.log("ASS_UPT2", result);

      if (man_id.length > 0) {
        return db.assignCandidate.bulkCreate(man_id, {
          updateOnDuplicate: ["AssignCandidate"]
        });
      }
    }).then((result) => {
      console.log("ASS_UPT3", result);
      res.redirect("/recruiter/getEmployeeList");
    })
    .catch((err) => {
      console.log("View error ", err);
      res.redirect("/");
    });

}

exports.getEmployeeViewEdit = (req, res, next) => {

  const companyId = +req.params.employeeID;
  const view = req.query.view;
  const edit = req.query.edit;
  const deletes = req.query.delete;
  const userData = req.session.user;
  const updatepassword = req.query.updatepassword;
  const company = findEmployeeByID(companyId);

  var empData = null,
    empId = null,
    empType = null;
  var managerList = [],
    teamLeadList = [],
    supervisiorList = [];
  var counter = 0,
    teamCounter = 0;


  if (view) {
    company.then(result => {
        if (result) {
          empData = result;
          empId = result.dataValues.id;
          empType = result.dataValues.recruiterType;
        }
        if (empType) {
          console.log("1", empType);
          if (empType === 'MANAGER' || empType === 'ADMIN') {
            return null;
          } else if (empType === 'TEAM_LEADER' || empType === 'SUPERVISIOR') {
            counter = 1;
            return getManagerList(empId);
          } else {
            counter = 2;
            return getManagerList(empId);
          }
        }

      }).then(result => {
        console.log("2", result);
        if (result) {
          if (counter == 0)
            return null; //null
          else {
            var managerIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                managerIdList.push(src.dataValues.managerID);
              }
              return getEmployeeDataList(managerIdList);
            } else if (result instanceof Array && result.length == 0) {
              return true; //null
            }
            else {
              managerIdList.push(result.dataValues.managerID);
              return getEmployeeDataList(managerIdList);
            }
          }
        }else 
        {
          return true; //null
        }
      }).then(result => {
        console.log("3", result);
        if (result) {
          if (counter == 0)
            return null;
          else if (counter == 1 || counter == 2)
          {
            if (result instanceof Array && result.length != 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                managerList.push(data);
              }
            }
              if (counter == 1)
                return true;
              else {
                counter = 3;
                return getTeamLeadList(empId);
              }
            
          } else {
            return true; //null
          }
        }
        else
          return true; //null
      }).then(result => {
        console.log("4", result);
        if (result) {
          if (counter == 0 || counter == 1) {
            return null;
          } else if (counter == 3) {
            var teamLeadIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                teamLeadIdList.push(src.dataValues.teamLeadID);
              }
              return getEmployeeDataList(teamLeadIdList);
            }
            else if (result instanceof Array && result.length == 0) {
              return true; //null
            }
            else {
              teamLeadIdList.push(result.dataValues.teamLeadID);
              return getEmployeeDataList(teamLeadIdList);
            }
          }
        }
        else
          return true; //null
      }).then(result => {
        console.log("5", result);
        if (result) {
          if (counter == 0 || counter == 1)
            return null;
          else if (counter == 3)
          {
            if (result instanceof Array && result.length != 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                teamLeadList.push(data);
              }
            }
              counter = 4;
              return getSupervisiorList(empId);
           
          }
        }else {
          return true; //null
        }
      }).then(result => {
        if (result) {
          if (counter == 0 || counter == 1)
            return null;
          else if (counter == 4) {
            var SuperVisiorList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                SuperVisiorList.push(src.dataValues.superVisiorID);
              }
              return getEmployeeDataList(SuperVisiorList);
            }
            else if (result instanceof Array && result.length == 0) {
              return true; //null
            }
            else {
              SuperVisiorList.push(result.dataValues.superVisiorID);
              return getEmployeeDataList(SuperVisiorList);
            }
          }
        }
        else
          return true;
      })
      .then(result => {
        console.log("6", result);
        if (result) {
          if (counter == 0 || counter == 1)
            return null;
          else if (counter == 4) {
            if (result instanceof Array && result.length != 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                supervisiorList.push(data);
              }
              
            }  
            return true;
          }
        }else {
          return true; //null
        }
      })
      .then((result) => {
        console.log(result, teamLeadList, managerList, supervisiorList)
        if (counter == 0 || counter == 1) {
          res.render("recruiter/view-employee", {
            user: userData,
            empData: empData,
            employeeID: companyId,
            teamLeadList: teamLeadList,
            managerList: managerList,
            supervisiorList: supervisiorList,
            userType: userTypeList
          });
        }
        else if (result === null) {
          res.redirect("/recruiter/getEmployeeList");
        } else {
          res.render("recruiter/view-employee", {
            user: userData,
            empData: empData,
            employeeID: companyId,
            teamLeadList: teamLeadList,
              managerList: managerList,
            supervisiorList: supervisiorList,
              userType: userTypeList,
          });
        }
      })
      .catch((err) => {
        console.log("View error ", err);
        res.redirect("/");
      });
  }

  if (edit) {
    var userTypeList;

    if (userData === "ADMIN") {
      userTypeList = getAdminPermission();
    } else if (userData === "MANAGER") {
      userTypeList = getManagerPermission();
    } else if (userData === "TEAM_LEADER") {
      userTypeList = getTLPermission();
    } else if (userData === "SUPERVISIOR") {
      userTypeList = getSupervisiorPermission
    }

    company.then(result => {
        if (result) {
          empData = result;
          empId = result.dataValues.id;
          empType = result.dataValues.recruiterType;
        }
        if (empType) {
          console.log("1", empType);
          if (empType === 'MANAGER' || empType === 'ADMIN') {
            return null;
          } else if (empType === 'TEAM_LEADER' || empType === 'SUPERVISIOR') {
            counter = 1;
            return getManagerList(empId);
          } else {
            counter = 2;
            return getManagerList(empId);
          }
        }

      }).then(result => {
        console.log("2", result);
        if (result) {
          if (counter === 0)
            return null;
          else {
            var managerIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                managerIdList.push(src.dataValues.managerID);
              }
              return getEmployeeDataList(managerIdList);
            } else if (result instanceof Array && result.length === 0) {
              return true;
            } else {
              managerIdList.push(result.dataValues.managerID);
              return getEmployeeDataList(managerIdList);
            }
          }
        } else {
          return true;
        }
      }).then(result => {
        console.log("3", result);
        if (result) {
          if (counter === 0)
            return null;
          else if (counter === 1 || counter === 2) {
            if (result instanceof Array && result.length !== 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                managerList.push(data);
              }
            }
            if (counter == 1)
              return true;
            else {
              counter = 3;
              return getTeamLeadList(empId);
            }
          } else {
            return true;
          }
        } else
          return true;
      }).then(result => {
        console.log("4", result);
        if (result) {
          if (counter === 0 || counter === 1) {
            return null;
          } else if (counter === 3) {
            var teamLeadIdList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                teamLeadIdList.push(src.dataValues.teamLeadID);
              }
              return getEmployeeDataList(teamLeadIdList);
            } else if (result instanceof Array && result.length === 0) {
              return true;
            } else {
              teamLeadIdList.push(result.dataValues.teamLeadID);
              return getEmployeeDataList(teamLeadIdList);
            }
          }
        } else
          return true;
      }).then(result => {
        console.log("5", result);
        if (result) {
          if (counter === 0 || counter === 1)
            return null;
          else if (counter === 3) {
            if (result instanceof Array && result.length !== 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                teamLeadList.push(data);
              }
            }
            counter = 4;
            return getSupervisiorList(empId);;
          }
        } else {
          return true;
        }
      }).then(result => {
        if (result) {
          if (counter === 0 || counter === 1)
            return null;
          else if (counter == 4) {
            var SuperVisiorList = [];
            if (Array.isArray(result) && result.length > 0) {
              for (let src of result) {
                SuperVisiorList.push(src.dataValues.superVisiorID);
              }
              return getEmployeeDataList(SuperVisiorList);
            } else if (result instanceof Array && result.length === 0) {
              return true;
            } else {
              SuperVisiorList.push(result.dataValues.superVisiorID);
              return getEmployeeDataList(SuperVisiorList);
            }
          }
        } else
          return null;
      })
      .then(result => {
        console.log("6", result);
        if (result && result.length !== 0) {
          if (counter === 0 || counter === 1)
            return null;
          else if (counter === 4) {
            if (result instanceof Array && result.length !== 0) {
              for (let src of result) {
                var data = {
                  name: src.dataValues.fullName,
                  id: src.dataValues.id
                }
                supervisiorList.push(data);
              }
            }
            return true;
          }
        } else {
          return true;
        }
      })
      .then((result) => {
        console.log(result, teamLeadList, managerList, supervisiorList)
        if (counter === 0 || counter === 1) {
          res.render("recruiter/add-recruiter", {
            user: userData,
            empData: empData,
            employeeID: companyId,
            userType: userTypeList,
            editData: true,
            addData: false,
            teamLeadList: teamLeadList,
            managerList: managerList,
            supervisiorList: supervisiorList
          });
        } else if (result === null) {
          res.redirect("/recruiter/getEmployeeList");
        } else {
          res.render("recruiter/add-recruiter", {
            user: userData,
            empData: empData,
            employeeID: companyId,
            userType: userTypeList,
            editData: true,
            addData: false,
            teamLeadList: teamLeadList,
            managerList: managerList,
            supervisiorList: supervisiorList
          });
        }
      })
      .catch((err) => {
        console.log("View error ", err);
        res.redirect("/");
      });

    // company
    //   .then((result) => {
    //     console.log(result);
    //     if (result === null) {
    //       res.redirect("/recruiter/getEmployeeList");
    //     } else {
    //       res.render("recruiter/add-recruiter", {
    //         pageTitle: "Recruiter",
    //         path: "/recruiter/add-recruiter",
    //         user: userData,
    //         userType: userTypeList,
    //         empData: result,
    //         employeeID: companyId,
    //         editData: true,
    //         addData: false
    //       });

    //     }
    //   })
    //   .catch((err) => {
    //     console.log("View error ", err);
    //     res.redirect("/");
    //   });
  }

  if (deletes) { 
    var manC = [], teamC = [], SupC = [];
    company.then(result => {
      if (result) { 
        return db.managerCount.findAll({
          where: {
          managersId: companyId
        }})
      }
    }).then(result => {

      if (result) { 
        for (let src of result) { 
          manC.push(src.dataValues.id);
        }
        return db.managerCount.destroy({
          where: {
            id: manC
          }
        })
      }
    }).then(result => {
      return db.teamLeadCount.findAll({
        where: {
          teamLeadsId: companyId
        }
      })
    }).then(result => {
      if (result)
      {
        for (let src of result) {
          teamC.push(src.dataValues.id);
        }
        return db.teamLeadCount.destroy({
          where: {
            id: teamC
          }
        })
      }
    }).then(result => {
      return db.supervisiorCount.findAll({
        where: {
          supervisiorsId: companyId
        }
      })
    }).then(result => {
      if (result) {
        for (let src of result) {
          SupC.push(src.dataValues.id);
        }
        return db.supervisiorCount.destroy({
          where: {
            id: SupC
          }
        })
      }
    }).then(result => {
      return db.password.destroy({
        where: {
          employeeId: companyId
        }
      })
    }).then(result => {
      console.log(result, '++++++++++++++++++++++++-------------------')
      return db.employeeRegistration.destroy({
        where: {
          id: companyId
        }
      })
    }).then(result => {
      console.log(result, '-------------------')
        res.redirect('/recruiter/getEmployeeList')
    }).catch(error => {
      console.log(error, '-------------------')
       res.redirect('/login/index')
    })
  }

  if (updatepassword) {
    res.render("password/admin-change-password", {
      user: userData,
      employeeId: companyId,
      pageTitle: "Change Password",
    });
  }
};

exports.updatePassword = (req, res, next) => {
  const password = req.body.password;
  const empID = req.body.empID;
  const userData = req.session.user;
  console.log(empID, userData, password);
  let status = false;

  db.password
    .findOne({
      where: {
        employeeId: empID,
      },
    })
    .then(result => {
      if (result) {
        status = false;       
      } else {
         status = true;
      }
      return bcrypt.hash(password, 12);
    })
    .then((hashPassword) => {
      if (hashPassword) {
        console.log(hashPassword, status);
        if (status)
          return db.password.create({
            password: hashPassword,
            employeeId: empID,
          });
        else
          return db.password.update({
            password: hashPassword,
          }, {
            where: {
              employeeId: empID,
            },
          });
      }
    })
    .then((success) => {
      if (success) {
        console.log("S", success);
      }
      else { 
        console.log("US", success);
      }
      res.render("password/admin-change-password", {
        user: userData,
        employeeId: empID,
        pageTitle: "Change Password",
      });
    })
    .catch((err) => {
      console.log("Hashing error ", err);
      res.redirect("/");
    });
};

function getEmployeeId() {
  companyID++;
  let customerId = "EMP" + companyID;
  return customerId;
}

async function addEmployee(req, userData, customerId) {

  console.log(req.body);
  var dataJson = JSON.parse(JSON.stringify(req.body));
  console.log(dataJson);

  var mobile2 = null,
    mobile3 = null,
    mobile4 = null,
    email2 = null,
    email3 = null,
    email4 = null;

  const fullname = req.body.fullname;
  const mobile1 = req.body.mobile1;
  const email1 = req.body.email1;

  if (req.body.mobile2 && (req.body.mobile2 !== '' || req.body.mobile2 !== 'null'))
    mobile2 = req.body.mobile2;
  

  if (req.body.mobile3 && (req.body.mobile3 !== '' || req.body.mobile3 !== 'null'))
    mobile3 = req.body.mobile3;
  

  if (req.body.mobile4 && (req.body.mobile4 !== '' || req.body.mobile4 !== 'null'))
    mobile4 = req.body.mobile4;
  

  if (req.body.email2 && (req.body.email2 !== '' || req.body.email2 !== 'null'))
    email2 = req.body.email2;
  

  if (req.body.email3 && (req.body.email3 !== '' || req.body.email3 !== 'null'))
    email3 = req.body.email3;
  

  if (req.body.email4 && (req.body.email4 !== '' || req.body.email4 !== 'null'))
    email4 = req.body.email4;
  
  console.log(mobile1, mobile2, mobile3, mobile4, email1, email2, email3, email4);

  const address = req.body.address;
  const birthday = req.body.birthday;
  const recruiterType = req.body.recruiterType;
  const doj = req.body.doj;
  const accountAccess = req.body.accountAccess;
  const status = req.body.status;
  const empId = customerId;
  const onboard = req.body.onboard;
  const documentation = req.body.documentation;

  return await db.employeeRegistration.create({
    fullName: fullname,
    employeeId: empId,
    phoneNumberOne: mobile1,
    phoneNumberTwo: mobile2,
    phoneNumberthree: mobile3,
    phoneNumberfour: mobile4,
    emailOne: email1,
    emailTwo: email2,
    emailThree: email3,
    emailFour: email4,
    address: address,
    dob: birthday,
    recruiterType: recruiterType,
    doj: doj,
    accountAccess: accountAccess,
    onboarding: onboard,
    documentation: documentation,
    status: status,
    addedBy: userData,
  });
}

async function updateEmployee(req, userData, id, userType, access) {
  const fullname = req.body.fullname;
  const mobileOne = req.body.mobileOne;
  const mobileTwo = req.body.mobileTwo;
  const mobileThree = req.body.mobileThree;
  const mobileFour = req.body.mobileFour;

  const emailOne = req.body.emailOne;
  const emailTwo = req.body.emailTwo;
  const emailThree = req.body.emailThree;
  const emailFour = req.body.emailFour;

  const address = req.body.address;
  const birthday = req.body.birthday;
  const recruiterType = (req.body.recruiterType && req.body.recruiterType !== 'Select') ? req.body.recruiterType : userType;
  const doj = req.body.doj;
  const accountAccess = (req.body.accountAccess && req.body.accountAccess !== 'Select') ? req.body.accountAccess : access;
  // const reportingSupervisior1 = req.body.reportingSupervisior1;
  // const reportingSupervisior2 = req.body.reportingSupervisior2;
  // const reportingTeamLead = req.body.reportingTeamLead;
  const onboard = req.body.onboard;
  const documentation = req.body.documentation;
  const status = req.body.status;

  return await db.employeeRegistration.update({
    fullName: fullname,
    phoneNumberOne: mobileOne,
    phoneNumberTwo: mobileTwo,
    phoneNumberthree: mobileThree,
    phoneNumberfour: mobileFour,
    emailOne: emailOne,
    emailTwo: emailTwo,
    emailThree: emailThree,
    emailFour: emailFour,
    address: address,
    dob: birthday,
    recruiterType: recruiterType,
    doj: doj,
    accountAccess: accountAccess,
    onboarding: onboard,
    documentation: documentation,
    status: status,
    addedBy: userData,
  }, {
    where: {
      id: id
    }
  });
}

async function employeeCount() {
  return await db.employeeRegistration.count();
}

async function findEmployeeByID(id) {
  console.log(id);
  return await db.employeeRegistration.findByPk(id);
}

function getAdminPermission() {
  var Role = [];
  var keys = Object.keys(role.ADMIN_PERMISSION);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

function getManagerPermission() {
  var Role = [];
  var keys = Object.keys(role.MANAGER_PERMISSION);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}

function getSupervisiorPermission() {
  var Role = [];
  var keys = Object.keys(role.SUPERVISIOR_PERMISSION);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }
  return Role;
}

function getTLPermission() {
  var Role = [];
  var keys = Object.keys(role.TEAM_LEADER_PERMISSION);
  for (var i = 0; i < keys.length; i++) {
    Role.push(keys[i].toString());
  }

  return Role;
}


async function getManagerList(empID) {
  return db.managerCount.findAll({
    where: {
      managersId: empID,
    },
    attributes: ["managerID"]
  })
}

async function getTeamLeadList(empID) {
  return db.teamLeadCount.findAll({
    where: {
      teamLeadsId: empID,
    },
    attributes: ["teamLeadID"]
  })
}

async function getSupervisiorList(empID) {
  return db.supervisiorCount.findAll({
    where: {
      supervisiorsId: empID,
    },
    attributes: ["superVisiorID"]
  })
}

async function getEmployeeDataList(empID) {
  return db.employeeRegistration.findAll({
    where: {
      id: empID,
    },
    attributes: ["fullName", 'id']
  })
}

async function setCandidateCountForNewManager(){
  return await db.sequelize.query(`WITH ranked_messages AS (
    SELECT m.*, ROW_NUMBER() OVER (PARTITION BY AssignCandidate ORDER BY id DESC) AS rn
    FROM tracking.assigncandidatetables AS m)
    SELECT r.AssignBy, r.AssignCandidate, r.QuestionerID, r.AssignerID, r.AssessmentStatus  FROM ranked_messages r WHERE r.rn = 1;`, {
    type: db.Sequelize.QueryTypes.SELECT
  })
}