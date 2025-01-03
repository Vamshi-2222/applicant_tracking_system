const db = require("../config/config");

exports.addExtraPage = (req, res, next) => {
  let userData = req.session.user;
  console.log("ReDirected successfully!");
  res.render("extra/add-language-graduation-job", {
    pageTitle: "Extra ",
    path: "extra/add-language-graduation-job",
    user: userData,
    model: false,
  });
};

exports.addlanguage = (req, res, next) => {
  let userData = req.session.user;
  var title = req.body.name;
  db.jobSeekerLanguage
    .findOrCreate({
      where: {
        LanguageTitle: title
      }
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });

}


exports.addIndustry = (req, res, next) => {
  let userData = req.session.user;
  var title = req.body.name;
  db.companyPreferedIndustry
    .findOrCreate({
      where: {
        IndustryName: title
      }
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });


  
}

exports.addVideo = (req, res, next) => {
  console.log(req);
  var title = req.body.title;
  var description = req.body.description;
  var file = req.file;
  console.log(file);
  if (!file) {
    return res.status(404).render("error/error.ejs");
  }

  const imagePath = file.path;

  db.upload
    .create({
      fileType: "VIDEO",
      filePath: imagePath,
      title: title,
      description: description,
    })
    .then((result) => {
      let userData = req.session.user;
      console.log("POsted successfully!");
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: false,
      });
    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log("Upload error ---> ", err);
        res.redirect("/");
      });
    });
};

exports.addPdf = (req, res, next) => {
  console.log(req);
  var title = req.body.title;
  var description = req.body.description;
  var file = req.file;
  console.log(file);
  if (!file) {
    return res.status(404).render("error/error.ejs");
  }

  const pdfPath = file.path;

  db.upload
    .create({
      fileType: "PDF",
      filePath: pdfPath,
      title: title,
      description: description,
    })
    .then((result) => {
      let userData = req.session.user;
      console.log("POsted successfully!");
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: false,
      });
    })
    .catch((err) => {
      req.session.destroy((err) => {
        console.log("Upload error ---> ", err);
        res.redirect("/");
      });
    });
};

exports.saveLocation = (req, res, next) => {
  const nameState = req.body.nameState;
  const nameCity = req.body.nameCity;
  let userData = req.session.user;
  var id;

  db.locationCityData
    .findOrCreate({
      where: {
        locationState: nameState,
        locationCity: nameCity,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addpreferedjob = (req, res, next) => {
  const jobTitle = req.body.jobTitle;
  const jobRole = req.body.jobRole;
  var id;
  let userData = req.session.user;

  db.preferedJobRole
    .findOrCreate({
      where: {
        JobRole: jobRole,
        JobTitle: jobTitle,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addGraduation = (req, res, next) => {
  const graduationName = req.body.graduationName;
  const graduationCourse = req.body.graduationCourse;
  var id;
  let userData = req.session.user;

  console.log(req.body);
  db.graduationCourse
    .findOrCreate({
      where: {
        course: graduationName,
        subject: graduationCourse,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.addPostGraduation = (req, res, next) => {
  const postGraduationCourse = req.body.postGraduationCourse;
  const postGraduationTitle = req.body.postGraduationTitle;
  var id;
  let userData = req.session.user;

  db.postGraduationCourse
    .findOrCreate({
      where: {
        PGCourse: postGraduationTitle,
        PGSubject: postGraduationCourse,
      },
    })
    .then((result) => {
      console.log(JSON.stringify(result[0].id, null, 2));
      res.render("extra/add-language-graduation-job", {
        pageTitle: "Extra ",
        path: "extra/add-language-graduation-job",
        user: userData,
        model: true,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};


exports.addBlog = (req, res, next) => {
  res.render('front-website-module/add-blog', {
    pageTitle: 'The Placement Park',
    path: 'blog',
    user: req.session.user,
    form: true,
    action: false,
    table: false
  });
}

exports.addJob = (req, res, next) => {
  let locationData = [], locationStateData = [];
  db.locationCityData.findAll()
    .then((result) => {
    if (result) {
      for (let src of result) {
        locationData.push(src.dataValues.locationCity);
        locationStateData.push(src.dataValues.locationCity + "~" + src.dataValues.locationState);
      }
      }
      res.render('front-website-module/add-job', {
        pageTitle: 'The Placement Park',
        path: 'job',
        user: req.session.user,
        form: true,
        action: false,
        table: false,
        location: locationData
      });
    }).catch((err) => {
      console.log(err);
    });
  
 }

exports.addTeam = (req, res, next) => {
  res.render('front-website-module/add-team', {
    pageTitle: 'The Placement Park',
    path: 'team',
    user: req.session.user,
    form: true,
    action: false,
    table: false
  });
 }

exports.addTestimonial = (req, res, next) => {
  res.render('front-website-module/add-testimonial', {
    pageTitle: 'The Placement Park',
    path: 'testimonial',
    user: req.session.user,
    form: true,
    action: false,
    table: false
  });
 }

exports.contactList = (req, res, next) => {
  res.render('front-website-module/contact-us-list', {
    pageTitle: 'The Placement Park',
    path: 'contact',
    user: req.session.user,
    form: true,
    action: false,
    table: false
  });
}
 


