// Import dependencies
const http = require("http");
const express = require("express");
const session = require("express-session");
const SessionStore = require("express-session-sequelize")(session.Store);
const csrf = require("csurf");
const bcrypt = require("bcryptjs");
const flash = require("connect-flash");
const bodyParser = require("body-parser");
const path = require("path");

// Import custom modules
const db = require("./config/config");
const upload = require("./middleware/upload");
const errorController = require("./controllers/errorController");
const adminData = require("./util/constant").ADMINDATA;

// Import routes
const adminRoute = require("./routes/admin");
const homeRoute = require("./routes/home");
const extraRoute = require("./routes/extra");
const candidateRoute = require("./routes/candidate");
const authRoute = require("./routes/auth");
const companyRoute = require("./routes/company");
const recruiteRoute = require("./routes/recruiter");
const instituteRoute = require("./routes/institute");
const ajaxRoute = require("./routes/ajax");

// Initialize app
const app = express();
const PORT = process.env.PORT || 3000;

// Set view engine
app.set("view engine", "ejs");
app.set("views", "views");

// Middleware
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', parameterLimit: 100000, extended: true }));
app.use(express.json());
app.use(upload.single('file'));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "node_modules", "bootstrap", "dist")));

// Session setup
const sequelizeSessionStore = new SessionStore({ db: db.sequelize });
app.use(session({
  secret: "my d@t@ i$ $ecur#",
  store: sequelizeSessionStore,
  resave: false,
  saveUninitialized: false,
}));
app.use(flash());

// CSRF protection
const csrfProtection = csrf();
app.use(csrfProtection);
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

// Error handler for CSRF
app.use((err, req, res, next) => {
  if (err.code !== "EBADCSRFTOKEN") return next(err);
  res.status(403).send("Form tampered with invalid token!");
});

// Routes
app.use("/admin", adminRoute);
app.use("/extra", extraRoute);
app.use("/candidate", candidateRoute);
app.use("/login", authRoute);
app.use("/company", companyRoute);
app.use("/recruiter", recruiteRoute);
app.use("/institute", instituteRoute);
app.use("/ajax", ajaxRoute);
app.post("/logout", (req, res) => {
  req.session.destroy(err => {
    console.log("LOGOUT --->", err);
    res.redirect("/");
  });
});
app.use("/home", homeRoute);
app.use(homeRoute);
app.use(errorController.error404Page);

// Database sync and server start
let id;
db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Connecting...");
    app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));
  })
  .catch(err => {
    console.error("Error in connection!", err);
  });

// Export app module
module.exports = app;
