exports.error404Page = (req, res, next) => {
    res.status(404).render('error/error.ejs');
};