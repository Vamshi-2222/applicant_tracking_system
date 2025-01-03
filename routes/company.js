const express = require('express');
const route = express.Router();
const rootDir = require('../util/path');
const isAuth = require('../middleware/is-auth');
const companyController = require('../controllers/companyController');

route.get('/searchadd', isAuth, companyController.getInitialCompany);

route.post('/newCompany', isAuth, companyController.getSaveNewCompany);

route.get('/getAdd', isAuth, companyController.getAddCompanyCall);

route.get('/companyId/:companyID', isAuth, companyController.getCompanyViewEdit);

route.post('/search', companyController.getSearchResult);

route.post('/updateCompany/', isAuth, companyController.updateCompany)

route.post('/companyRole', isAuth, companyController.getSaveCompanyRole);

route.get('/roleID/:roleID', isAuth, companyController.getCompanyRoleViewEdit);

route.post('/updateRoleID', isAuth, companyController.getUpdateCompanyRole);

route.get('/notInterested', isAuth, companyController.notInterested);

route.get('/inFuture', isAuth, companyController.inFuture);

route.get('/inProcess', isAuth, companyController.inProcess);

route.get('/needToApproach', isAuth, companyController.getInApproach);

route.get('/expanelledcompany', isAuth, companyController.getExpanelled);

route.get('/rejected', isAuth, companyController.getRejected);


module.exports = route;