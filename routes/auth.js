const express = require("express");
const route = express.Router();
const rootDir = require("../util/path");
const authController = require("../controllers/authController");
const isAuth = require("../middleware/is-auth");

route.post("/user", authController.getUserLogin);

route.get("/index", isAuth, authController.getIndexPage);

module.exports = route;
