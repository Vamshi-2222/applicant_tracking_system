const express = require("express");
const route = express.Router();
const rootDir = require("../util/path");
const isAuth = require("../middleware/is-auth");
const db = require("../config/config");
const Op = db.Op;

route.get("/checkemail", async (req, res, next) => {
  var value = req.query.value;
  db.jobSeekerEnrollment.findOne({
    where: {
      [Op.or]: [{
          emailOne: value,
        },
        {
          emailTwo: value,
        },
        {
          emailThree: value,
        },
        {
          emailFour: value,
        }
      ]
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else {
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);

  })
})

route.get("/checkmobile", async (req, res, next) => {
  var value = req.query.value;
  db.jobSeekerEnrollment.findOne({
    where: {
      [Op.or]: [{
          phoneNumberOne: value,
        },
        {
          phoneNumberTwo: value,
        },
        {
          phoneNumberthree: value,
        },
        {
          phoneNumberfour: value,
        }
      ]
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else { 
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);
    
  })
})

route.get('/getEmployee', async (req, res, next) => {

  const userData = req.session.user;
    var value = req.query.value;
    var status = req.query.status;

  let totalEmployeeCount;

  
    db.employeeRegistration.findAll({
        where:
        {
          recruiterType: value,
          status: status
        }
      })
      .then((employee) => {
        var emp_data = [];
        if (employee) {
          if (employee instanceof Array) {
            for (let emp of employee) {
              var datas = {
                fullName: emp.dataValues.fullName,
                employeeId: emp.dataValues.employeeId,
                recruiterType: emp.dataValues.recruiterType,
                emailOne: emp.dataValues.emailOne,
                phoneNumberOne: emp.dataValues.phoneNumberOne,
                status: status,
                password: false,
                id: emp.dataValues.id
              }
              emp_data.push(datas);
            }
          } else {
          
            var datas = {
              fullName: employee.dataValues.fullName,
              employeeId: employee.dataValues.employeeId,
              recruiterType: employee.dataValues.recruiterType,
              emailOne: employee.dataValues.emailOne,
              phoneNumberOne: employee.dataValues.phoneNumberOne,
              status: status,
              password: false,
              id: emp.dataValues.id
            }
            emp_data.push(datas);
          }
        }
        // if (emp_data.length === 0)
        // {
        //   var datas = {
        //     fullName: "",
        //     employeeId: "",
        //     recruiterType: "",
        //     emailOne: "",
        //     phoneNumberOne: "",
        //     status: status,
        //     password: false,
        //     id: ""
        //   }
        //   emp_data.push(datas);
        // }
      res.send({
        employeeData: emp_data,
        });
      
    })
    .catch((err) => {
      console.log("Crash", err);
      res.redirect("/");
    });
})


route.get("/checkemailuser", async (req, res, next) => {
  var value = req.query.value;
  db.employeeRegistration.findOne({
    where: {
      [Op.or]: [{
          emailOne: value,
        },
        {
          emailTwo: value,
        },
        {
          emailThree: value,
        },
        {
          emailFour: value,
        }
      ]
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else {
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);

  })
})

route.get("/checkmobileuser", async (req, res, next) => {
  var value = req.query.value;
  db.employeeRegistration.findOne({
    where: {
      [Op.or]: [{
          phoneNumberOne: value,
        },
        {
          phoneNumberTwo: value,
        },
        {
          phoneNumberthree: value,
        },
        {
          phoneNumberfour: value,
        }
      ]
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else {
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);

  })
})


route.get("/getUserType", (req, res, next) => {
  var supervisior = [], manager = [],
    teamLead = [];

  console.log("AJAX COLLECTION!");
  db.employeeRegistration
    .findAll({
      where: {
        recruiterType: "SUPERVISIOR",
      },
      attributes: ["fullName", "id"],
    })
    .then((data) => {
      var superVisiorData;
      if (data === null || data === undefined || data.length === 0) {
        superVisiorData = {
          id: 0,
          data: "NONE",
        };
        supervisior.push(superVisiorData);
      } else {
        for (let src of data) {
          superVisiorData = {
            id: src.dataValues.id,
            data: src.dataValues.fullName,
          };
          supervisior.push(superVisiorData);
        }
      }

      return db.employeeRegistration.findAll({
        where: {
          recruiterType: "TEAM_LEADER",
        },
        attributes: ["fullName", "id"],
      });
    })
    .then((data) => {
      var teamLeadData;
      if (data === null || data === undefined || data.length === 0) {
        teamLeadData = {
          id: 0,
          data: "NONE",
        };
        teamLead.push(teamLeadData);
      } else {
        for (let src of data) {
          teamLeadData = {
            id: src.dataValues.id,
            data: src.dataValues.fullName,
          };
          teamLead.push(teamLeadData);
        }
      }

      return db.employeeRegistration.findAll({
        where: {
          recruiterType: "MANAGER",
        },
        attributes: ["fullName", "id"],
      });
      
    }).then(
      (data) => {
        console.log('MANAGER ==> ', data);
        var managerData;
        if (!data) {
          managerData = {
            id: 0,
            data: "NONE",
          };
          manager.push(managerData);
        } else {
          for (let src of data) {
            managerData = {
              id: src.dataValues.id,
              data: src.dataValues.fullName,
            };
            manager.push(managerData);
          }
        }
        console.log('MANAGER ==> ', manager);
        res.send({
          supervisior: supervisior,
          teamLead: teamLead,
          manager: manager
        });
      }
    )
    .catch((err) => {
      console.log("AJAX", err);
      supervisior = ["None"];
      teamLead = ["None"];
      res.json({
        supervisior: supervisior,
        teamLead: teamLead,
      });
    });
});

route.get('/getCompanyRole/:id', isAuth, (req, res, next) => {

  const roleId = +req.params.id;
  var companyName = [];

  findCompanyRoleById(roleId).then(result => {
    console.log(result);
    if (!result) {
      var data = {
        name: "NONE",
        id: ""
      }
      companyName.push(data);
    } else {

      var data = {
        name: '--Select--',
        id: ''
      }
      companyName.push(data);

      for (let src of result) {
        var datas = {
          name: src.dataValues.pseudoName, //role
          id: src.dataValues.id
        }
        companyName.push(datas);
      }
    }
    console.log(companyName);
    res.send({
      companyRoleName: companyName,
    });


  }).catch(error => {
    console.log(error);
  })


})

route.get('/getGraduation', isAuth, (req, res, next) => {
  
  var graduation = [];
  db.graduationCourse.findAll().then(result => {
    if (result)
    {
      for (let data of result)
        graduation.push(data.dataValues.course + "-" + data.dataValues.subject);
    }
    res.send({
      graduation: graduation,
    });
  }).catch(err => {
    console.log(err);
  })

})

route.get("/getPostGraduation", isAuth, (req, res, next) => {
  var graduation = [];
  db.postGraduationCourse
    .findAll()
    .then((result) => {
      if (result) {
        for (let data of result)
          graduation.push(
            data.dataValues.PGCourse + "-" + data.dataValues.PGSubject
          );
      }
      res.send({
        graduation: graduation,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

route.get("/getCompany", isAuth, (req, res, next) => {
  var companyName = [];
  const data = findCompanyName();
  data
    .then((result) => {
      if (!result) {
        var data = {
          name: "NONE",
          id: ""
        }
        companyName.push(data);
      } else {
        var data = {
          name: '--Select--',
          id: ''
        }
        companyName.push(data);
        for (let src of result) {
          var datas = {
            name: src.dataValues.company_name,
            id: src.dataValues.id
          }
          companyName.push(datas);
        }
      }
      console.log(companyName);
      res.send({
        companyName: companyName,
      });
    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log(err);
      });
      res.redirect("/");
    });
});

route.get("/preferedJob", isAuth, (req, res, next) => {

  let industry = [],
    roleType = [];

  let PreferedIndustry = getPreferedIndustry();

  PreferedIndustry.then((result) => {
    if (result !== null) {
      for (let src of result) {
        industry.push(src.dataValues.IndustryName);
      }
    }
    return getPreferedJob();
  }).then((result) => {
      if (result !== null) {
        for (let src of result) {
          roleType.push(src.dataValues.JobTitle);
        }
      }
    }).then((result) => {
      res.send({
        preferedRole: roleType,
        preferedIndustry: industry
      });
      
    })
    .catch((err) => {
      console.log(err);
      req.session.destroy((err) => {
        console.log(err);
      });
      res.redirect("/");
    });
  
});

route.get('/getLanguage', isAuth, (req, res, next) => {
  let languageList = [];

  getLanguage().then(result => {
    if (result) {
      var data = {
        name: '--Select--',
        id: ''
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
        id: ''
      }
      languageList.push(data);
    }
    res.send({
      languageList: languageList
    });
  }).catch((err) => {
    console.log(err);
    req.session.destroy((err) => {
      console.log(err);
    });
    res.redirect("/");
  });
});


route.get('/userName', isAuth, (req, res, next) => {
  console.log(req.session.name)
  res.send({
    name: req.session.name
  });
});

route.get("/checkHrEmail", async (req, res, next) => {
  var value = req.query.value;
  db.companyName.findOne({
    where: {
      hr_emal: value
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else {
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);

  })
})

route.get("/checkHrMobile", async (req, res, next) => {
  var value = req.query.value;
  db.companyName.findOne({
    where: {
      hr_mobile: value
    }
  }).then(result => {
    if (result) {
      res.send("YES");
    } else {
      res.send("NO")
    }
  }).catch(err => {
    res.send(err);

  })
})



async function findCompanyName() {
  return await db.companyName.findAll({
    where: {
      company_response: 'EMPANELLED',
      company_status: 'ACTIVE'
    }
  });
}

async function findCompanyRoleById(id)
{
  return await db.companyJob.findAll({
    where: {
      companyId: id
    },
  });
}

async function getPreferedIndustry() {
  return await db.companyPreferedIndustry.findAll();
}

async function getPreferedJob() {
  return await db.preferedJobRole.findAll();
}

async function getLanguage()
{
  return await db.jobSeekerLanguage.findAll();
}

module.exports = route;
