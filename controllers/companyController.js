const db = require("../config/config");
const { where } = db.sequelize;
var companyID = 100000000;
const ITEM_PER_PAGE = 50;

exports.getInitialCompany = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0;
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;
  if (
    user === "TEAM_LEADER" ||
    user === "SUPERVISIOR" ||
    user === "FULLTIME_RECRUITER" ||
    user === "INTERN_OFF" ||
    user === "INTERN_ON" ||
    user === "FREELANCER" ||
     user === "SUB_VENDOR"
  ) {
    const countData = activeCompanyCount();
    let totalCompanyCount;
    countData
      .then((count) => {
        totalCompanyCount = count;
        return db.companyName.findAll({
          where: {
            company_status: 'ACTIVE'
          },
          offset: ITEM_PER_PAGE * (page - 1),
          limit: ITEM_PER_PAGE,
        })
      })
      .then((company) => {
        companyData = company;
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
        return getInApproach();
      }).then(result => {
        if (result)
          totalNeedToApproachCompany = result;
        return getExpanelled();
      }).then(result => {
        if (result)
          totalExpelledCompany = result;
        res.render("company/search-and-add", {
          companyData: company,
          pageTitle: "Company",
          path: "/company/search-and-add",
          user: user,
          userType: req.session.accountAccess,
          currentPage: page,
          showingItem: ITEM_PER_PAGE,
          totalCompany: totalCompanyCount,
          hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
          addCompany: false,
          table: true,
          updateCompany: false,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  } else {
    const countData = companyCount();
    let totalCompanyCount;

    countData
      .then((count) => {
        totalCompanyCount = count;
        return db.companyName.findAll({
          offset: ITEM_PER_PAGE * (page - 1),
          limit: ITEM_PER_PAGE,
        });
      })
      .then((company) => {
        companyData = company;
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
        return getInApproach();
      }).then(result => {
        if (result)
          totalNeedToApproachCompany = result;
        return getExpanelled();
      }).then(result => { 
        if (result)
          totalExpelledCompany = result;
        
        res.render("company/search-and-add", {
          companyData: company,
          pageTitle: "Company",
          path: "/company/search-and-add",
          user: user,
          userType: req.session.accountAccess,
          currentPage: page,
          showingItem: ITEM_PER_PAGE,
          totalCompany: totalCompanyCount,
          hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
          hasPreviousPage: page > 1,
          nextPage: page + 1,
          previousPage: page - 1,
          lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
          addCompany: false,
          table: true,
          updateCompany: false,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }
};

exports.getRejected = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0,
  totalRejected = 0;

  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "REJECTED",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalRejected = count;
      return db.companyName.findAll({
        where: {
          company_response: "REJECTED",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
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
      return getInApproach();
    }).then(result => {
      if (result)
        totalNeedToApproachCompany = result;
      return getExpanelled();
    }).then(result => {
      if (result)
        totalExpelledCompany = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.getSearchResult = (req, res, next) => {
  var companyNames = req.body.searchData;
  var companyResponse = req.body.response;


  var page = 1, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0,
    totalRejected = 0;
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      [db.Op.or]: {
        company_name: { [db.Op.like]: "%" + companyNames + "%" },
        hr_mobile: { [db.Op.like]: "%" + companyNames + "%" },
        hr_emal: { [db.Op.like]: "%" + companyNames + "%" },
        hr_name: { [db.Op.like]: "%" + companyNames + "%" },
      },
      company_response: companyResponse
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalExpelledCompany = count;
      return db.companyName.findAll({
        where: {
          [db.Op.or]: {
            company_name: { [db.Op.like]: "%" + companyNames + "%" },
            hr_mobile: { [db.Op.like]: "%" + companyNames + "%" },
            hr_emal: { [db.Op.like]: "%" + companyNames + "%" },
            hr_name: { [db.Op.like]: "%" + companyNames + "%" },
          },
          company_response: companyResponse
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
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
      return getInApproach();
    }).then(result => {
      if (result)
        totalNeedToApproachCompany = result;
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected

      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.getExpanelled = (req, res, next) => { 
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0,
    totalRejected = 0;
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "EMPANELLED",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalExpelledCompany = count;
      return db.companyName.findAll({
        where: {
          company_response: "EMPANELLED",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
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
      return getInApproach();
    }).then(result => {
      if (result)
        totalNeedToApproachCompany = result;
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected

      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.getInApproach = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalNotInterestedCompany = 0,
    totalRejected= 0,
    totalNeedToApproachCompany = 0;
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "NEED_TO_APPROACH",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalNeedToApproachCompany = count;
      return db.companyName.findAll({
        where: {
          company_response: "NEED_TO_APPROACH",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
      return getExpanelled();
    }).then(result => {
      if (result)
        totalExpelledCompany = result;
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
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.inProcess = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalRejected= 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0;
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "IN_PROCESS",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalInProcessCompany = count;
      return db.companyName.findAll({
        where: {
          company_response: "IN_PROCESS",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
      return getExpanelled();
    }).then(result => {
      if (result)
        totalExpelledCompany = result;
      return getInApproach();
    }).then(result => {
      if (result)
        totalNeedToApproachCompany = result;
      return inFuture();
    }).then(result => {
      if (result)
        totalFutureCompany = result;
      return notInterested();
    }).then(result => {
      if (result)
        totalNotInterestedCompany = result;
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.inFuture = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalRejected = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0;
  
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "FUTURE",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalFutureCompany = count;
      return db.companyName.findAll({
        where: {
          company_response: "FUTURE",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
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
      return notInterested();
    }).then(result => {
      if (result)
        totalNotInterestedCompany = result;
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}

exports.notInterested = (req, res, next) => {
  var page, companyData;

  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalRejected = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0;
  
  
  if (req.query.page) {
    page = +req.query.page;
  } else {
    page = 1;
  }
  const user = req.session.user;

  const countData = db.companyName.count({
    where: {
      company_response: "NOT_INTERESTED",
    },
  });
  let totalCompanyCount;
  countData
    .then((count) => {
      totalCompanyCount = count;
      totalNotInterestedCompany = count;
      return db.companyName.findAll({
        where: {
          company_response: "NOT_INTERESTED",
        },
        offset: ITEM_PER_PAGE * (page - 1),
        limit: ITEM_PER_PAGE,
      });
    })
    .then((company) => {
      companyData = company;
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
      return getRejected();
    }).then(result => {
      if (result)
        totalRejected = result;
      
      res.render("company/search-and-add", {
        companyData: companyData,
        pageTitle: "Company",
        path: "/company/search-and-add",
        user: user,
        userType: req.session.accountAccess,
        currentPage: page,
        showingItem: ITEM_PER_PAGE,
        totalCompany: totalCompanyCount,
        hasNextPage: ITEM_PER_PAGE * page < totalCompanyCount,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalCompanyCount / ITEM_PER_PAGE),
        addCompany: false,
        table: true,
        updateCompany: false,
        totalNotInterestedCompany: totalNotInterestedCompany,
        totalFutureCompany: totalFutureCompany,
        totalInProcessCompany: totalInProcessCompany,
        totalNeedToApproachCompany: totalNeedToApproachCompany,
        totalExpelledCompany: totalExpelledCompany,
        totalRejected: totalRejected
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
}


exports.getAddCompanyCall = (req, res, next) => {
  var userData = req.session.user;
  var page, companyData;
  let totalExpelledCompany = 0,
    totalInProcessCompany = 0,
    totalFutureCompany = 0,
    totalRejected = 0,
    totalNotInterestedCompany = 0,
    totalNeedToApproachCompany = 0;
  
  if (req.query.page) {
    page = req.query.page;
  } else {
    page = false;
  }

  if (page) {
    inProcess().
      then(result => {
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
        return getInApproach();
      }).then(result => {
        if (result)
          totalNeedToApproachCompany = result;
        return getExpanelled();
      }).then(result => {
        if (result)
          totalExpelledCompany = result;
        return getRejected();
      }).then(result => {
        if (result)
          totalRejected = result;
        res.render("company/search-and-add", {
          pageTitle: "Company",
          path: "/company/search-and-add",
          user: userData,
          addCompany: true,
          table: false,
          updateCompany: false,
          totalNotInterestedCompany: totalNotInterestedCompany,
          totalFutureCompany: totalFutureCompany,
          totalInProcessCompany: totalInProcessCompany,
          totalNeedToApproachCompany: totalNeedToApproachCompany,
          totalExpelledCompany: totalExpelledCompany,
          totalRejected: totalRejected
        });
      }).catch((err) => {
        res.redirect("/login/index");
      });
  } else {
    res.redirect("/login/index");
  }
};

exports.updateCompany = (req, res, next) => {
  var userData = req.session.user;
  const companyNames = req.body.companyName;
  const companyStatus = req.body.companyStatus ? req.body.companyStatus : null;
  const companyResponse = req.body.companyResponse ? req.body.companyResponse : null;
  const companyDescription = req.body.companyDescription;
  const hrName = req.body.hrName ? req.body.hrName : null;
  const hrMobile = req.body.hrMobile ? req.body.hrMobile : null;
  const hrEmail = req.body.hrEmail ? req.body.hrEmail : null;
  const designationDescription = req.body.designationDescription ? req.body.designationDescription : null;
  const companyID = req.body.companyID;

  db.companyName
    .findByPk(companyID).then(result => {
      if (result) {
        return db.companyName.update({
          company_name: companyNames,
          company_description: companyDescription,
          company_response: companyResponse,
          company_status: companyStatus,
          hr_name: hrName,
          hr_mobile: hrMobile,
          hr_emal: hrEmail,
          job_detail_description: designationDescription,
        },
          {
            where: {
              id: companyID
            }
          })
      } else
        return null;
    }).then(result => {
      if(result)
        res.redirect("/company/getAdd/?page=true");
      else
        res.redirect('/login/index');
    }).catch(error => {
      res.redirect('/login/index');
    });
}

exports.getSaveNewCompany = (req, res, next) => {
  var userData = req.session.user;
  const companyNames = req.body.companyName;
  const companyStatus = req.body.companyStatus ? req.body.companyStatus : null;
  const companyResponse = req.body.companyResponse ? req.body.companyResponse : null;
  const companyDescription = req.body.companyDescription;
  const hrName = req.body.hrName ? req.body.hrName : null;
  const hrMobile = req.body.hrMobile ? req.body.hrMobile : null ;
  const hrEmail = req.body.hrEmail ? req.body.hrEmail : null;
  const designationDescription  = req.body.designationDescription ? req.body.designationDescription : null;
  var customerId;

  db.companyName
    .findAll({
      attributes: ["company_id"],
    })
    .then((company) => {
      if (company === null || company === undefined || company.length === 0) {
        companyID++;
        customerId = "COM" + companyID;
      } else {
        var value = company[company.length - 1].dataValues.company_id;
        var valueCount = +value.replace("COM", "");
        valueCount++;
        customerId = "COM" + valueCount;
      }
      return db.companyName.create({
        company_name: companyNames,
        company_id: customerId,
        company_description: companyDescription,
        company_response: companyResponse,
        company_status: companyStatus,
        hr_name: hrName,
        hr_mobile: hrMobile,
        hr_emal: hrEmail,
        job_detail_description: designationDescription,
        company_addedBy: userData,
      });
    })
    .then((company) => {
      res.redirect("/company/getAdd/?page=true");
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
};

exports.getCompanyViewEdit = (req, res, next) => {
  const companyId = +req.params.companyID;
  const view = req.query.view;
  const edit = req.query.edit;
  const role = req.query.role;
  const deletes = req.query.delete;
  const userData = req.session.user;
  var companyJob = [];
  var companyData;

  if (view) {
    const company = findCompanyByID(companyId);

    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        } else {
          companyData = result;
          return findAllCompanyRoleByID(companyId);
        }
      })
      .then((result) => {
        if (!result) {
          companyJob = [];
        } else {
          if (Array.isArray(result) && result.length > 0) {
            for (let src of result) {
              var role = {
                id: src.dataValues.id,
                role: src.dataValues.role,
                designation: src.dataValues.designation,
                pseudoName: src.dataValues.pseudoName,
                jobLocation: src.dataValues.jobLocation,
                cabFacility: src.dataValues.cabFacility,
                experience: src.dataValues.experience,
                jobDescription: src.dataValues.jobDescription,
                status: src.dataValues.status,
              };

              companyJob.push(role);
            }
          } else if (result instanceof Array && result.length == 0) {
            companyJob = [];
          } else {
            var roles = {
              id: result.dataValues.id,
              role: result.dataValues.role,
              designation: result.dataValues.designation,
              pseudoName: result.dataValues.pseudoName,
              jobLocation: result.dataValues.jobLocation,
              cabFacility: result.dataValues.cabFacility,
              experience: result.dataValues.experience,
              jobDescription: result.dataValues.jobDescription,
              status: result.dataValues.status,
            };
            companyJob.push(roles);
          }
        }
        res.render("company/company", {
          company: companyData,
          user: userData,
          role: companyJob,
          companyId: companyId,
          table: true,
          form: false,
          updateCompany: false,
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }

  if (edit) {
    const company = findCompanyByID(companyId);

    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        }
        companyData = result;

        res.render("company/search-and-add", {
          company: companyData,
          pageTitle: "Company",
          path: "/company/search-and-add",
          user: userData,
          addCompany: false,
          table: false,
          updateCompany: true,
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }

  if (role) {
    const company = findCompanyByID(companyId);
    var companyData, location = [];

    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        } else {
          companyData = result;
          return getLocationList();
        }
      })
      .then(result => {
        if (result) {
          for (let src of result) {
            location.push(src.dataValues.locationCity)
          }
        } else { 
          location.push('');
        }
         res.render("company/company", {
           company: companyData,
           user: userData,
           companyId: companyId,
           table: false,
           form: true,
           updateCompany: false,
           location: location
         });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }

  if (deletes) { 
    var lId = [];
    const company = findCompanyByID(companyId);
    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        } else {
          
            return db.companyJob.findAll({
              where: {
                companyId: companyId
              }
            });
          
        }
      }).then(result => {
        if (result) { 
          if (Array.isArray(result) && result.length > 0) {
            for (let src of result) {
              lId.push(src.dataValues.id);
            }
          }
          return db.companyJobQualification.destroy({
            where: {
              companyId: lId
            }
          });
        }
      }).then(result => {
        return db.companyJob.destroy({
          where: {
            companyId: companyId
          }
        });
      }).then(result => {
        
          return db.companyName.destroy({
            where: {
              id: companyId
            }
          });
                
      }).then(result => {
        res.redirect("/company/getAdd/?page=true");
      }).catch(error => {
        res.redirect("login/index");
      })
  }
};

exports.getUpdateCompanyRole = (req, res, next) => {
  var dataJson = JSON.parse(JSON.stringify(req.body));
  const userData = req.session.user;
  const designation = req.body.designation;
  const role = req.body.role;
  const psuedoname = req.body.psuedoname;
  const qualification = req.body.qualification;
  const jobLocation = req.body.jobLocation;
  const salary = req.body.salary;
  const exampleRadios = req.body.exampleRadios;
  const documents = req.body.documents;
  const eligibility = req.body.eligibility;
  const experience = req.body.experience;
  const description = req.body.description;
  const companyID = req.body.companyID;
  const roleID = req.body.roleID;
  const status = req.body.status;
  var qualificationData = [];
  var companyJob = [],
    skillSet =[];
  var companyData;

  db.companyJob
    .update(
      {
        status: status,
        role: role,
        designation: designation,
        pseudoName: psuedoname,
        jobLocation: jobLocation,
        cabFacility: exampleRadios,
        experience: experience,
        jobDescription: description,
        salary: salary,
        documents: documents,
        eligibility: eligibility,
        companyId: companyID,
      },
      {
        where: {
          id: roleID,
        },
      }
    )
    .then((result) => {
      if (!result) {
        res.redirect("/login/index");
      }
      return updateQualification(roleID);
    })
    .then((result) => {
    
      var item = {
           qualification: qualification,
           companyId: roleID,
         };
      
      return insertQualificationforCompany(item);
    })
    .then((result) => {
      if (result) {
        res.redirect("/company/companyId/" + companyID + "/?view=true");
      }
      //res.redirect("/login/index");
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
};

exports.getCompanyRoleViewEdit = (req, res, next) => {
  const roleID = +req.params.roleID;
  const view = req.query.view;
  const edit = req.query.edit;
  const deletes = req.query.delete;
  const name = req.query.name;
  const id = +req.query.id;
  const userData = req.session.user;
  var qualification;
  var roleData;

  if (deletes) {
    findCompanyRoleQualificationByID(roleID).then(result => {
      if (result) {
         return updateQualification(roleID);
      }
    }).then(result => {
        return findCompanyRoleByID(id, roleID)
    })
      .then(result => {
        if(result)
         return deleteRole(id, roleID)
    }).then(result => {
      if (result)
        return deleteRole(id, roleID)
    }).then(result => {
      res.redirect("/company/companyId/"+id+"/?view=true")
    }).catch((err) => {
      res.redirect("/login/index");
    });
   }

  if (view) {
    const company = findCompanyRoleByID(id,roleID);
    var qualificationData;
    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        } else {
          roleData = result;
        }
        return findCompanyRoleQualificationByID(roleID);
      })
      .then((result) => {
        if (!result) {
          qualificationData = null;
        } else {
          for (let src of result)
            qualificationData = src.dataValues.qualification;
        }
        res.render("company/edit-role", {
          role: roleData,
          user: userData,
          roleID: roleID,
          companyID: id,
          qualification: qualificationData,
          name: name,
          view: true,
          edit: false,
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }

  if (edit) {
    const company = findCompanyRoleByID(id,roleID);
    var location = [];
    var qualificationData;

    company
      .then((result) => {
        if (!result) {
          res.redirect("/login/index");
        } else {
          roleData = result;
        }
        return findCompanyRoleQualificationByID(roleID);
      })
      .then((result) => {
        if (!result) {
          qualificationData = null;
        } else {
          for (let src of result)
            qualificationData = src.dataValues.qualification;
        }

        return getLocationList();
        
      }).then((result) => {
        if (result) {
          for (let src of result) {
            location.push(src.dataValues.locationCity);
          }
        } 
        res.render("company/edit-role", {
          role: roleData,
          user: userData,
          roleID: roleID,
          companyID: id,
          qualification: qualification,
          name: name,
          view: false,
          edit: true,
          location: location
        });
      })
      .catch((err) => {
        res.redirect("/login/index");
      });
  }
};

exports.getSaveCompanyRole = (req, res, next) => {
  const userData = req.session.user;
  const designation = req.body.designation;
  const role = req.body.role;
  const psuedoname = req.body.psuedoname;
  const qualification = req.body.qualification;
  const jobLocation = req.body.jobLocation;
  const salary = req.body.salary;
  const exampleRadios = req.body.exampleRadios;
  const documents = req.body.documents;
  const eligibility = req.body.eligibility;
  const experience = req.body.experience;
  const description = req.body.description;
  const companyID = req.body.companyID;
  const status = req.body.status;
  var qualificationData = [],
  skillSet= [];
  var companyJob = [];
  var companyData;
  var id; 

  db.companyJob
    .create({
      status: status,
      role: role,
      designation: designation,
      pseudoName: psuedoname,
      jobLocation: jobLocation,
      cabFacility: exampleRadios,
      experience: experience,
      jobDescription: description,
      salary: salary,
      documents: documents,
      eligibility: eligibility,
      companyId: companyID,
    })
    .then((result) => {
      if (!result) {
        res.redirect("/login/index");
      } else {
        id = result.dataValues.id;
        var skillDataSet = req.body.qualification;
        var item = {
          qualification: skillDataSet,
          companyId: id,
        };
        
      }

      return insertQualificationforCompany(item);
    })
    .then((result) => {
      
      if (!result) {
        res.redirect("/login/index");
        res.session.destroy();
      }

      const company = findCompanyByID(companyID);
      return company;
    })
    .then((result) => {
      if (!result) {
        res.redirect("/login/index");
      } else {
        companyData = result;
        return findCompanyRoleByID(companyID, id);
      }
    })
    .then((result) => {
      if (!result) {
        companyJob = [];
      } else {
        if (Array.isArray(result) && result.length > 0) {
          for (let src of result) {
            var role = {
              id: src.dataValues.id,
              role: src.dataValues.role,
              designation: src.dataValues.designation,
              pseudoName: src.dataValues.pseudoName,
              jobLocation: src.dataValues.jobLocation,
              cabFacility: src.dataValues.cabFacility,
              experience: src.dataValues.experience,
              jobDescription: src.dataValues.jobDescription,
              status: src.dataValues.status,
            };

            companyJob.push(role);
          }
        } else if (result instanceof Array && result.length == 0) {
          companyJob = [];
        } else {
          var roles = {
            id: result.dataValues.id,
            role: result.dataValues.role,
            designation: result.dataValues.designation,
            pseudoName: result.dataValues.pseudoName,
            jobLocation: result.dataValues.jobLocation,
            cabFacility: result.dataValues.cabFacility,
            experience: result.dataValues.experience,
            jobDescription: result.dataValues.jobDescription,
            status: result.dataValues.status,
          };
          companyJob.push(roles);
        }
      }

      res.render("company/company", {
        company: companyData,
        user: userData,
        role: companyJob,
        companyId: companyID,
        table: true,
        form: false,
      });
    })
    .catch((err) => {
      res.redirect("/login/index");
    });
};

function getCompanyId() {
  companyID++;
  let customerId = "COM" + companyID;
  return customerId;
}

async function companyCount() {
  return await db.companyName.count();
}

async function activeCompanyCount() {
  return await db.companyName.count({
    where: {
      company_status: "ACTIVE"
    },
  });
}

async function findCompanyByID(id) {
  return await db.companyName.findByPk(id);
}

async function findAllCompanyRoleByID(id) {
  return await db.companyJob.findAll({
    where: {
      companyId: id,
    },
  });
}

async function findCompanyRoleByID(companyID, roleId) {
  return await db.companyJob.findOne({
    where: {
      companyId: companyID,
      id: roleId
    },
  });
}

async function deleteRole(companyID, roleId) {
  return await db.companyJob.destroy({
     where: {
       companyId: companyID,
       id: roleId
     },
  });
}

async function findCompanyRoleQualificationByID(id) {
  return await db.companyJobQualification.findAll({
    where: {
      companyId: id
    },
  });
}

async function insertQualificationforCompany(QualificationList) {
  return await db.companyJobQualification.create(QualificationList);
}

async function updateQualification(id) {
  return await db.companyJobQualification.destroy({
    where: {
      companyId: id,
    },
  });
}

async function getLocationList() {
  const location = await db.locationCityData.findAll({
    attributes: ["locationCity"],
  });
  return location;
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
  return db.companyName.count({
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

async function getRejected() {
  return db.companyName.count({
    where: {
      company_response: "REJECTED",
    },
  });
}
