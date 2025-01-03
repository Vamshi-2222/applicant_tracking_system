const express = require('express');
const route = express.Router();
const rootDir = require('../util/path');
const homeController = require('../controllers/homeController');

route.get('/index', homeController.getIndex);

route.get('/login', homeController.getLogin);

route.get('/job', homeController.getJob);

route.get('/blog', homeController.getBlog);

route.get('/about', homeController.getAbout);

route.get('/company', homeController.getCompany);

route.get('/college', homeController.getCollege);

route.get('/team', homeController.getTeam);

route.get('/testimonials', homeController.getTestimonial);

route.get('/contact', homeController.getContract);

route.get('/terms', homeController.getTerms);

route.get('/', homeController.getHome);

module.exports = route;