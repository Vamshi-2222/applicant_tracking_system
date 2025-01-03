const http = require("http");
const express = require("express");
const app = express();
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const csrf = require("csurf");
const bcrypt = require("bcryptjs");
const fs = require("fs");
const flash = require('connect-flash');
const port = process.env.PORT || 2500;
const {Op} = require("sequelize");

const adminRoute = require("./routes/admin");
const homeRoute = require("./routes/home");
const extraRoute = require("./routes/extra");
const candidateRoute = require("./routes/candidate");
const authRoute = require("./routes/auth");
const companyRoute = require("./routes/company");
const recruiteRoute = require("./routes/recruiter");
const instituteRoute = require("./routes/institute");
const ajaxRoute = require("./routes/ajax");
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./config/config");
const errorController = require("./controllers/errorController");
const { config } = require("process");
const adminData = require("./util/constant").ADMINDATA;
const upload = require("./middleware/upload");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(bodyParser.json({
  limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));
app.use(express.json());

app.use(upload.single('file'));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  express.static(path.join(__dirname, "node_modules", "bootstrap", "dist"))
);

const sequelizeSessionStore = new SessionStore({
  db: db.sequelize,
});

const csrfProtection = csrf();

app.use(
  session({
    secret: "my d@t@ i$ $ecur#",
    store: sequelizeSessionStore,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(flash());
app.use(csrfProtection);

app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use(function (err, req, res, next) {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403);
  res.send("form tampered with invalid token! --@-@--");
});

app.use("/admin", adminRoute);
app.use("/extra", extraRoute);
app.use("/candidate", candidateRoute);
app.use("/login", authRoute);
app.use("/company", companyRoute);
app.use("/recruiter", recruiteRoute);
app.use("/institute", instituteRoute);
app.use("/ajax", ajaxRoute);
app.post("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    console.log("LOGOUT ---> ", err);
    res.redirect("/");
  });
});
app.use("/home", homeRoute);
app.use(homeRoute);
app.use(errorController.error404Page);


var id;
db.sequelize
  .sync({
    force: false,
  })

  // .then((result) => {
  //   return db.employeeRegistration.findOrCreate({
  //     where: adminData,
  //   });
  // })
  // .then((result) => {
  //   id = JSON.stringify(result[0].id, null, 2);
  //   return bcrypt.hash("123456", 12);
  // })
  // .then((hashPassword) => {
  //   return db.password.create({
  //     password: hashPassword,
  //     employeeId: id,
  //   });
  // })
  // .then(() => {
  //   return db.jobSeekerEnrollment.sync({
  //     alter: true
  //   });
  // })
  // .then(() => {
  //   return db.assignCandidate.sync({
  //     alter: true
  //   });
  // })
  .then(() => {
    console.log("Connecting...");
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!`)
    );
  })
  .catch((err) => {
    console.log("Error in connection! ", err);
  });

module.exports = app;


// db.sequelize
//   .sync({
//     force: false,
//   })
// .then((result) => {
//   return db.employeeRegistration.findOne({
//     where:
//     {
//       emailOne: "Sharukh@theplacementpark.com",
//     }
//   });
// })
//   .then((result) => {
//     id = result.dataValues.id;
//     return bcrypt.hash("123456", 12);
//   })
//   .then((hashPassword) => {
//     if (hashPassword) {
//       return db.password.update({
//         password: hashPassword,
//       }, {
//         where: {
//           employeeId: id,
//         },
//       });
//     }
//   })

