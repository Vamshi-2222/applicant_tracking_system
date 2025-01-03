const db = require("../config/config");
const constant = require("../util/constant");
const locationCityData = require("../config/config").locationCityData;
const Op = db.Op;
const ITEM_PER_PAGE = 50;
var instituteID = 100000000;

exports.getInitialForm = (req, res, next) => {

    const userData = req.session.user;
    const accountAccess = req.session.accountAccess;
    let citiesList = [];
    let data = getLocationList();
    data
        .then((result) => {
            if (result) {
                for (let city of result) {
                    citiesList.push(city.dataValues.locationCity);
                }
            }
            res.render("institute/add-institute", {
                pageTitle: "Add Institute",
                locationData: citiesList,
                user: userData,
                accountAccess: accountAccess
            });
        })
        .catch((err) => {
            console.log(err);
        });

};

exports.getInstituteViewEdit = (req, res, next) => { 
    const instituteId = +req.params.instituteId;
    const view = req.query.view;
    const edit = req.query.edit;
    const deletes = req.query.delete;
    const userData = req.session.user;
    const accountAccess = req.session.accountAccess;
    var pocList = [], citiesList= [];
    let institute = {
        name: null,
        city: null,
        timing: null,
        strength: null,
        course: null,
        address: null,
        degree: null,
        internship: null,
        crt: null,
        drive_report: null,
        institute_status: null,
        remark: null,
        id:null
    }
    if (!deletes) {
        getOneInstitute(instituteId).then(result => {
            if (result) {
                institute.name = result.dataValues.instituteName,
                    institute.city = result.dataValues.city,
                    institute.timing = result.dataValues.timing,
                    institute.strength = result.dataValues.strength,
                    institute.course = result.dataValues.courseOffered,
                    institute.address = result.dataValues.address,
                    institute.degree = result.dataValues.degree,
                    institute.internship = result.dataValues.internship,
                    institute.crt = result.dataValues.crt,
                    institute.drive_report = result.dataValues.driveReport,
                    institute.institute_status = result.dataValues.instituteStatus,
                    institute.remark = result.dataValues.remark,
                    institute.id = result.dataValues.id
            }
            return getPocDataByInstituteId(instituteId);
        }).then(result => {
            if (result) {
                for (let i of result) {
                    var data = {
                        name: i.dataValues.pocName,
                        designation: i.dataValues.designation,
                        email: i.dataValues.email,
                        mobile: i.dataValues.mobile,
                        instituteId: i.dataValues.instituteId
                    }
                    pocList.push(data)
                }
            }
            return getLocationList();
        }).then((result) => {
            if (result) {
                for (let city of result) {
                    citiesList.push(city.dataValues.locationCity);
                }
            }
            res.render("institute/edit-view-institute", {
                pageTitle: "Institute",
                pocTotal: pocList.length,
                institute: institute,
                pocList: pocList,
                user: userData,
                instituteId: instituteId,
                view: view ? true : false,
                locationData: citiesList

            });

        })
        
    } else { 

        deletePocDataByInstituteId(instituteId).then(result => { 
            return deleteInstitute(instituteId);
        }).then(result => { 
            res.redirect("/institute/dashboard");
        })
    }
    

}

exports.saveInstitute = (req, res, next) => {

    let dataJson = JSON.parse(JSON.stringify(req.body));
    let poc_name1, poc_designation1, poc_email1, poc_mobile1, poc_counter;
    let instituteId = 0;
    let pocList = [];
    poc_mobile1 = req.body.mobile1;
    poc_email1 = req.body.email1;
    poc_designation1 = req.body.designation1;
    poc_name1 = req.body.poc_name1;
    poc_counter = +(req.body.instituteCount && req.body.instituteCount !== '') ? req.body.instituteCount : 0;

    const institute_name = req.body.institute_name ? req.body.institute_name : "-";
    const city = req.body.city ? req.body.city : "-";
    const timimg = req.body.timimg ? req.body.timimg : "-";
    const strength = req.body.strength ? req.body.strength : "-";
    const course_offered = req.body.course_offered ? req.body.course_offered : "-";
    const address = req.body.address ? req.body.address : "-";

    const degree = req.body.degree;
    const internship = req.body.internship;
    const crt = req.body.crt;
    const drive_report = req.body.drive_report;
    const institute_status = req.body.institute_status;
    const remark = req.body.remark ? req.body.remark : "-";

    db.institute.create({
        instituteName: institute_name,
        city: city,
        timing: timimg,
        strength: strength,
        courseOffered: course_offered,
        address: address,
        degree: degree,
        internship: internship,
        crt: crt,
        driveReport: drive_report,
        instituteStatus: institute_status,
        remark: remark
    }).then(result => {
        if (result) {
            instituteId = result.dataValues.id;
            if (poc_counter > 1) {
                for (var i = 1; i <= poc_counter; i++) {
                    var pocData = {
                        pocName: dataJson["poc_name" + i],
                        designation: dataJson["designation" + i],
                        email: dataJson["email" + i],
                        mobile: dataJson["mobile" + i],
                        instituteId: instituteId,
                    };
                    pocList.push(pocData);
                }
            } else {
                var pocdata = {
                    pocName: poc_name1,
                    designation: poc_designation1,
                    email: poc_email1,
                    mobile: poc_mobile1,
                    instituteId: instituteId,
                };
                pocList.push(pocdata);
            }
            return insertPocdata(pocList)
        }
        return null;
    }).then(result => {
        if (result)
            res.redirect('/login/index');
        else
            res.redirect('/');
    }).catch((err) => {
        req.session.destroy((err) => {
            res.redirect("/");
        });
    });
}

exports.updateInstitute = (req, res, next) => {

    let dataJson = JSON.parse(JSON.stringify(req.body));
    let poc_name1, poc_designation1, poc_email1, poc_mobile1, poc_counter;
    let pocList = [];
    poc_mobile1 = req.body.mobile1;
    poc_email1 = req.body.email1;
    poc_designation1 = req.body.designation1;
    poc_name1 = req.body.poc_name1;
    poc_counter = req.body.instituteCount && req.body.instituteCount !== '' ? +req.body.instituteCount : 0;

    const institute_name = req.body.institute_name ? req.body.institute_name : "-";
    const city = req.body.city ? req.body.city : "-";
    const timimg = req.body.timimg ? req.body.timimg : "-";
    const strength = req.body.strength ? req.body.strength : "-";
    const course_offered = req.body.course_offered ? req.body.course_offered : "-";
    const address = req.body.address ? req.body.address : "-";

    const degree = req.body.degree;
    const internship = req.body.internship;
    const crt = req.body.crt;
    const drive_report = req.body.drive_report;
    const institute_status = req.body.institute_status;
    const remark = req.body.remark ? req.body.remark : "-";
    const instituteID = req.body.instituteId ? req.body.instituteId : 0;


    getOneInstitute(instituteID).then(result => { 
        if (result) {
            return db.institute.update({
                instituteName: institute_name,
                city: city,
                timing: timimg,
                strength: strength,
                courseOffered: course_offered,
                address: address,
                degree: degree,
                internship: internship,
                crt: crt,
                driveReport: drive_report,
                instituteStatus: institute_status,
                remark: remark
            }, {
                where: {
                    id: instituteID
                }
            });
        } else { 
            res.redirect('/login/index');
        }
    }).then(result => {
        if (result) {
            if (poc_counter > 1) {
                for (var i = 1; i <= poc_counter; i++) {
                    var pocData = {
                        pocName: dataJson["poc_name" + i],
                        designation: dataJson["designation" + i],
                        email: dataJson["email" + i],
                        mobile: dataJson["mobile" + i],
                        instituteId: instituteID,
                    };
                    pocList.push(pocData);
                }
            } else {
                var pocdata = {
                    pocName: poc_name1,
                    designation: poc_designation1,
                    email: poc_email1,
                    mobile: poc_mobile1,
                    instituteId: instituteID,
                };
                pocList.push(pocdata);
            }
            return getOnePocDataByInstituteId(instituteID);
        }
        return null;
    }).then(result => {
        return deletePocListByInstituteId(instituteID);
    }).then(result => {
        if (pocList.length > 0)
            return insertPocdata(pocList);
        return result;
    }).then(result => {
        console.log("3", dataJson, result)
        if (result)
            res.redirect('/login/index');
        // else
        //     res.redirect('/');
    }).catch((err) => {
        console.log("Error", err)

        req.session.destroy((err) => {
            res.redirect("/");
        });
    });

};

exports.getDashboard = (req, res, next) => {
    var countInstitute = 0, countCollege = 0, trainingCount = 0, consultancyCount = 0;
    var skillDevelopmentCount = 0, driveReportNo = 0, driveReportYes = 0, internshipYes = 0, internshipNo = 0;
    var internshipN2a = 0, internshipFollowUp = 0, crtN2a = 0, crtFollowUp = 0, crtInProcess = 0, crtNotInterested = 0;
    var instituteStatusN2a = 0, instituteStatusFollowUp = 0, instituteStatusDriveDone = 0, instituteStatusAwaitingDrive = 0,
        instituteStatusNI = 0, instituteStatusCallback = 0;
    var user = req.session.user;
    var userId = req.session.userId;
    getInstituteCount().then((result) => { 
        if (result)
            countInstitute = result;
        return getDegreeCount();
    }).then(result => { 
        if (result)
            countCollege = result;
        return getTrainingCount();
    }).then(result => {
        if (result)
            trainingCount = result;
        return getConsultancyCount();
    }).then(result => {
        if (result)
            consultancyCount = result;
        return getSkillDevelopmentCount();
    }).then(result => {
        if (result)
            skillDevelopmentCount = result;
        return getDriveReportNoCount();
    }).then(result => {
        if (result)
            driveReportNo = result;
        return getDriveReportYesCount();
    }).then(result => {
        if (result)
            driveReportYes = result;
        return getInternshipYesCount();
    }).then(result => {
        if (result)
            internshipYes = result;
        return getInternshipNoCount();
    }).then(result => {
        if (result)
            internshipNo = result;
        return getInternshipN2ACount();
    }).then(result => {
        if (result)
            internshipN2a = result;
        return getInternshipFollowUpCount();
    }).then(result => {
        if (result)
            internshipFollowUp = result;
        return getCrtFollowUpCount();
    }).then(result => {
        if (result)
            crtFollowUp = result;
        return getCrtInProcessCount();
    }).then(result => {
        if (result)
            crtInProcess = result;
        return getCrtN2ACount();
    }).then(result => {
        if (result)
            crtN2a = result;
        return getCrtNotInterestedCount();
    }).then(result => { 
        if (result)
            crtNotInterested = result;
        return getInstituteStatusAwaitingDriveCount();
    }).then(result => {
        if (result)
            instituteStatusAwaitingDrive = result;
        return getInstituteStatusCallbackCount();
    }).then(result => {
        if (result)
            instituteStatusCallback = result;
        return getInstituteStatusDriveDoneCount();
    }).then(result => {
        if (result)
            instituteStatusDriveDone = result;
        return getInstituteStatusFollowUpCount();
    }).then(result => {
        if (result)
            instituteStatusFollowUp = result;
        return getInstituteStatusN2ACount();
    }).then(result => {
        if (result)
            instituteStatusN2a = result;
        return getInstituteStatusNICount();
    }).then((result) => {
        if (result)
            instituteStatusNI = result;
        res.render("institute/institute-dashboard", {
            pageTitle: "Dashboard",
            countInstitute: countInstitute,
            countCollege: countCollege,
            trainingCount: trainingCount,
            consultancyCount: consultancyCount,
            skillDevelopmentCount: skillDevelopmentCount,
            driveReportNo: driveReportNo,
            driveReportYes: driveReportYes,
            internshipYes: internshipYes,
            internshipNo: internshipNo,
            internshipN2a: internshipN2a,
            internshipFollowUp: internshipFollowUp,
            crtN2a: crtN2a,
            crtFollowUp: crtFollowUp,
            crtInProcess: crtInProcess,
            crtNotInterested: crtNotInterested,
            instituteStatusNI: instituteStatusNI,
            instituteStatusN2a: instituteStatusN2a,
            instituteStatusFollowUp: instituteStatusFollowUp,
            instituteStatusDriveDone: instituteStatusDriveDone,
            instituteStatusCallback: instituteStatusCallback,
            instituteStatusAwaitingDrive: instituteStatusAwaitingDrive,
            user: user,
            userId: userId,
        });
    }).catch(exception => { 
        res.redirect('/login/index');
    })


}

exports.getAllCollege = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getDegreeCount().then(result => {
        if (result) {
            total = result;
            return getDegreeData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        res.redirect("/login/index");
    });

};


exports.getAllInstitute = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteCount().then(result => {
        if (result) {
            total = result;
            return getInstituteData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.trainingCount = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getTrainingCount().then(result => {
        if (result) {
            total = result;
            return getTrainingData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.consultancyCount = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getConsultancyCount().then(result => {
        if (result) {
            total = result;
            return getConsultancyData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.skillDevelopmentCount = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getSkillDevelopmentCount().then(result => {
        if (result) {
            total = result;
            return getSkillDevelopmentData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.driveReportNo = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getDriveReportNoCount().then(result => {
        if (result) {
            total = result;
            return getDriveReportNoData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.driveReportYes = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getDriveReportYesCount().then(result => {
        if (result) {
            total = result;
            return getDriveReportYesData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.internshipYes = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInternshipYesCount().then(result => {
        if (result) {
            total = result;
            return getInternshipYesData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.internshipNo = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInternshipNoCount().then(result => {
        if (result) {
            total = result;
            return getInternshipNoData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.internshipN2a = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInternshipN2ACount().then(result => {
        if (result) {
            total = result;
            return getInternshipN2AData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.internshipFollowUp = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInternshipFollowUpCount().then(result => {
        if (result) {
            total = result;
            return getInternshipFollowUpData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.crtN2a = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getCrtN2ACount().then(result => {
        if (result) {
            total = result;
            return getCrtN2AData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.crtFollowUp = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getCrtFollowUpCount().then(result => {
        if (result) {
            total = result;
            return getCrtFollowUpData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.crtInProcess = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getCrtInProcessCount().then(result => {
        if (result) {
            total = result;
            return getCrtNInProcessData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.crtNotInterested = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getCrtNotInterestedCount().then(result => {
        if (result) {
            total = result;
            return getCrtNotInterestedData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusNI = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusNICount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusNIData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusN2a = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusN2ACount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusN2AData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusFollowUp = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusFollowUpCount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusFollowUpData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusDriveDone = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusDriveDoneCount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusDriveDoneData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusCallback = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusCallbackCount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusCallbackData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};

exports.instituteStatusAwaitingDrive = (req, res, next) => {
    var page = 1, total = 0;
    if (req.query.page) {
        page = +req.query.page;
    } else {
        page = 1;
    }
    getInstituteStatusAwaitingDriveCount().then(result => {
        if (result) {
            total = result;
            return getInstituteStatusAwaitingDriveData(page)
        } else
            return null;
    }).then((result) => {
        if (result) {
            getList(result, total, req, res, page);
        } else {
            res.redirect("/institute/dashboard");
        }
    }).catch((err) => {
        // console.log(err);
        res.redirect("/login/index");
    });
};


function getList(result, total, req, res, page) {

    var institute = [], pocList = [];
    const userData = req.session.user;

    if (result) {
        for (let i of result) {
            var data = {
                id: i.dataValues.id,
                instituteName: i.dataValues.instituteName,
                city: i.dataValues.city,
                timing: i.dataValues.timing,
                strength: i.dataValues.strength,
                pocName: '',
                designation: '',
                email: '',
                mobile: '',
                degree: i.dataValues.degree,
                internship: i.dataValues.internship,
                crt: i.dataValues.crt,
                driveReport: i.dataValues.driveReport,
                instituteStatus: i.dataValues.instituteStatus,
            }
            institute.push(data);
        }
    } else {
        res.redirect("/login/index");
    }
        
    getPocData().then(result => { 
        if (result) { 
            for (let i of result) {
                var data = {
                    name: i.dataValues.pocName,
                    designation: i.dataValues.designation,
                    email: i.dataValues.email,
                    mobile: i.dataValues.mobile,
                    instituteId: i.dataValues.instituteId
                }
                pocList.push(data)
            }
        }
        for (let i of institute) { 
            for (let j of pocList) { 
                if (j.instituteId == i.id) { 
                    i.pocName = j.name;
                    i.designation = j.designation;
                    i.email = j.email;
                    i.mobile = j.mobile;
                    break;
                }
            }
        }

        res.render("institute/list-institute", {
            pageTitle: "Institute",
            currentPage: page,
            showingItem: ITEM_PER_PAGE < institute ? ITEM_PER_PAGE : total,
            totalInstitute: total,
            hasNextPage: ITEM_PER_PAGE * page < total,
            hasPreviousPage: page > 1,
            nextPage: page + 1,
            previousPage: page - 1,
            lastPage: Math.ceil(total / ITEM_PER_PAGE),
            institute: institute,
            user: userData
        });


    }).catch((err) => {
        res.redirect("/login/index");
    });

}


async function getLocationList() {
    const location = await locationCityData.findAll({
        attributes: ["locationCity"],
    });
    return location;
}

async function insertPocdata(pocList) {
    console.log(pocList)
    return await db.institutePoc.bulkCreate(pocList, {
        returning: true,
    });
}

async function getOneInstitute(_id) {
    return await db.institute.findOne({
        where: {
            id: _id
        }
    });
}

async function getInstituteCount() {
    return await db.institute.count();
}

async function getInstituteData(page) {
    return await db.institute.findAll({
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getDegreeCount() {

    return db.institute.count({
        where: {
            degree: ["B.Tech", "B.Tech + M", "Degree", "Degree + M", "Hotel Management", "Management", "Pharma", "Pharma + M"],
        },
    });
}

async function getDegreeData(page) {

    return await db.institute.findAll({
        where: {
            degree: ["B.Tech", "B.Tech + M", "Degree", "Degree + M", "Hotel Management", "Management", "Pharma", "Pharma + M"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getPocData() {
    return await db.institutePoc.findAll();
}

async function getOnePocDataByInstituteId(_id) {
    return await db.institutePoc.findOne({
        where: {
            instituteId: _id
        }
    });
}

async function getPocDataByInstituteId(_id) {
    return await db.institutePoc.findAll({
        where: {
            instituteId : _id
        }
    });
} 

async function deletePocDataByInstituteId(_id) {
    return await db.institutePoc.destroy({
        where: {
            instituteId: _id
        }
    });
} 

async function deleteInstitute(_id) {
    return db.institute.destroy({
        where: {
            id: _id
        },
    });
}

async function getTrainingCount() {

    return db.institute.count({
        where: {
            degree: ["Aviation", "CA", "Softskills", "IT Skill Center"],
        },
    });
}

async function getTrainingData(page) {

    return await db.institute.findAll({
        where: {
            degree: ["Aviation", "CA", "Softskills", "IT Skill Center"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getConsultancyCount() {

    return db.institute.count({
        where: {
            degree: ["Consultancy"],
        },
    });
}

async function getConsultancyData(page) {

    return await db.institute.findAll({
        where: {
            degree: ["Consultancy"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getSkillDevelopmentCount() {

    return db.institute.count({
        where: {
            degree: ["Skill Development"],
        },
    });
}

async function getSkillDevelopmentData(page) {

    return await db.institute.findAll({
        where: {
            degree: ["Skill Development"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getDriveReportNoCount() {

    return db.institute.count({
        where: {
            driveReport: ["NO"],
        },
    });
}

async function getDriveReportNoData(page) {

    return await db.institute.findAll({
        where: {
            driveReport: ["NO"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getDriveReportYesCount() {

    return db.institute.count({
        where: {
            driveReport: ["YES"],
        },
    });
}

async function getDriveReportYesData(page) {

    return await db.institute.findAll({
        where: {
            driveReport: ["YES"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInternshipYesCount() {

    return db.institute.count({
        where: {
            internship: ["YES"],
        },
    });
}

async function getInternshipYesData(page) {

    return await db.institute.findAll({
        where: {
            internship: ["YES"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInternshipNoCount() {

    return db.institute.count({
        where: {
            internship: ["NO"],
        },
    });
}

async function getInternshipNoData(page) {

    return await db.institute.findAll({
        where: {
            internship: ["NO"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInternshipN2ACount() {

    return db.institute.count({
        where: {
            internship: ["N2A"],
        },
    });
}

async function getInternshipN2AData(page) {

    return await db.institute.findAll({
        where: {
            internship: ["N2A"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInternshipFollowUpCount() {

    return db.institute.count({
        where: {
            internship: ["FOLLOW-UP"],
        },
    });
}

async function getInternshipFollowUpData(page) {

    return await db.institute.findAll({
        where: {
            internship: ["FOLLOW-UP"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getCrtFollowUpCount() {

    return db.institute.count({
        where: {
            crt: ["FOLLOW-UP"],
        },
    });
}

async function getCrtFollowUpData(page) {

    return await db.institute.findAll({
        where: {
            crt: ["FOLLOW-UP"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getCrtN2AData(page) {

    return await db.institute.findAll({
        where: {
            crt: ["N2A"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getCrtN2ACount() {

    return db.institute.count({
        where: {
            crt: ["N2A"],
        },
    });
}

async function getCrtNotInterestedData(page) {

    return await db.institute.findAll({
        where: {
            crt: ["NOT INTERESTED"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getCrtNotInterestedCount() {

    return db.institute.count({
        where: {
            crt: ["NOT INTERESTED"],
        },
    });
}

async function getCrtNInProcessData(page) {

    return await db.institute.findAll({
        where: {
            crt: ["IN PROCESS"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getCrtInProcessCount() {

    return db.institute.count({
        where: {
            crt: ["IN PROCESS"],
        },
    });
}

async function getInstituteStatusN2AData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["N2A"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusN2ACount() {

    return db.institute.count({
        where: {
            instituteStatus: ["N2A"],
        },
    });
}

async function getInstituteStatusDriveDoneData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["DRIVE DONE"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusDriveDoneCount() {

    return db.institute.count({
        where: {
            instituteStatus: ["DRIVE DONE"],
        },
    });
}

async function getInstituteStatusAwaitingDriveData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["AWAITING DRIVE"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusAwaitingDriveCount() {

    return db.institute.count({
        where: {
            instituteStatus: ["AWAITING DRIVE"],
        },
    });
}

async function getInstituteStatusFollowUpData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["FOLLOW-UP"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusFollowUpCount() {

    return db.institute.count({
        where: {
            instituteStatus: ["FOLLOW-UP"],
        },
    });
}

async function getInstituteStatusNIData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["NI"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusNICount() {

    return db.institute.count({
        where: {
            instituteStatus: ["NI"],
        },
    });
}

async function getInstituteStatusCallbackData(page) {

    return await db.institute.findAll({
        where: {
            instituteStatus: ["CALLBACK"],
        },
        order: [['city', 'ASC']],
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
    });
}

async function getInstituteStatusCallbackCount() {

    return db.institute.count({
        where: {
            instituteStatus: ["CALLBACK"],
        },
    });
}

async function deletePocListByInstituteId(_id) { 
    return await db.institutePoc.destroy({
        where: {
            instituteId: _id
        }
    });
}