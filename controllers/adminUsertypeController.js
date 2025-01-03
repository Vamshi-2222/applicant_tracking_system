// exports.getUserList = (req, res, next) => {
//     res.render('admin/userTable', {
//         pageTitle: 'Employee List',
//         path: '/admin/userTable'
//     });
// };

// exports.getAdminLogin = (req, res, next) => {
//     res.render('admin/userLogin', {
//         pageTitle: 'Login',
//         path: '/admin/userLogin'
//     });
// };

exports.getAdminDashboard = (req, res, next) => {
    var userData = req.session.user;
    res.render('admin/index', {
        pageTitle: 'Dashboard',
        path: '/admin/index',
        user: userData
    });
};

// exports.getAdminDashboardGetExtra = (req, res, next) => {
//     res.render('extra/add-language-graduation-job', {
//         pageTitle: 'ATS',
//         path: '/extra/add-language-graduation-job'
//     });
// };

exports.changePassword = (req, res, next) => {
    var userData = req.session.user;
    res.render('password/admin-change-password', {
        pageTitle: 'ATS',
        user: userData
    });

}