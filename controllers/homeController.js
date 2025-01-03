const locationCityData = require('../config/config').locationCityData;
const role = require('../util/constant').ROLES;


exports.getHome = (req, res, next) => {
    res.render('front-website/index', {
        pageTitle: 'The Placement Park',
        path: 'home'
    });

};

exports.getIndex = (req, res, next) => {
    res.render('front-website/index', {
        pageTitle: 'The Placement Park',
        path: 'index'
    });

};

exports.getLogin = (req, res, next) => {
    res.render('admin/userLogin', {
        pageTitle: 'The Placement Park',
        path: 'login'
    });

};

exports.getJob = (req, res, next) => {
    res.render('front-website/jobseeker', {
        pageTitle: 'The Placement Park',
        path: 'job'
    });

};

exports.getAbout = (req, res, next) => {
    res.render('front-website/about', {
        pageTitle: 'The Placement Park',
        path: 'about'
    });

};

exports.getBlog = (req, res, next) => {
    res.render('front-website/companies', {
        pageTitle: 'The Placement Park',
        path: 'blog'
    });

};

exports.getCompany = (req, res, next) => {
    res.render('front-website/companies', {
        pageTitle: 'The Placement Park',
        path: 'company'
    });

};

exports.getCollege = (req, res, next) => {
    res.render('front-website/crt', {
        pageTitle: 'The Placement Park',
        path: 'college'
    });

};

exports.getContract = (req, res, next) => {
    res.render('front-website/contact', {
        pageTitle: 'The Placement Park',
        path: 'contact'
    });

};

exports.getTeam = (req, res, next) => {
    res.render('front-website/team', {
        pageTitle: 'The Placement Park',
        path: 'team'
    });

};

exports.getTerms = (req, res, next) => {
    res.render('front-website/terms', {
        pageTitle: 'The Placement Park',
        path: 'terms'
    });

};

exports.getTestimonial = (req, res, next) => {
    res.render('front-website/testimonials', {
        pageTitle: 'The Placement Park',
        path: 'testimonials'
    });

};

// exports.getCompany = (req, res, next) => {
//     res.render('company/add-role', {
//         pageTitle: 'Home',
//         path: '/company/add-role'
//     });
// };

exports.getRecruiter = (req, res, next) => {
    var Role = [];
    var keys = Object.keys(role);
    for (var i = 0; i < keys.length; i++) {
        Role.push(keys[i].toString());
    }
    res.render('recruiter/add-recruiter', {
        pageTitle: 'Home',
        path: '/recruiter/add-recruiter',
        role: Role
    });
};