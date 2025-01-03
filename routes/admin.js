const express = require('express');
const route = express.Router();
const rootDir = require('../util/path');
const isAuth = require('../middleware/is-auth');
const adminUserTypeController = require('../controllers/adminUsertypeController');


route.get('/index', isAuth, adminUserTypeController.getAdminDashboard);
route.get('/changePassword', isAuth, adminUserTypeController.changePassword);
module.exports = route;