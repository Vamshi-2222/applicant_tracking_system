const express = require("express");
const route = express.Router();
const rootDir = require("../util/path");
const extraController = require("../controllers/extraController");
const isAuth = require("../middleware/is-auth");

console.log("Extra");

route.get("/addExtra", isAuth, extraController.addExtraPage);

route.post("/add-location", isAuth, extraController.saveLocation);

route.post("/add-prefered-job", isAuth, extraController.addpreferedjob);

route.post("/uploadVideo", isAuth, extraController.addVideo);

route.post("/upload-pdf", isAuth, extraController.addPdf);

route.post("/add-graduation", isAuth, extraController.addGraduation);

route.post("/add-post-graduation", isAuth, extraController.addPostGraduation);

route.post("/add-post-industry", isAuth, extraController.addIndustry);

route.post("/add-language", isAuth, extraController.addlanguage);

route.get("/add-blog", isAuth, extraController.addBlog);

route.get("/add-job", isAuth, extraController.addJob);

route.get("/add-team", isAuth, extraController.addTeam);

route.get("/add-testimonial", isAuth, extraController.addTestimonial);

route.get("/contact-list", isAuth, extraController.contactList);

module.exports = route;
