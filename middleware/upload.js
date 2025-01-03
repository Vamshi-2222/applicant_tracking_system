const multer = require("multer");

const excelFilter = (req, file, cb) => {
    
    if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
        return cb(new Error('Wrong extension type'));
    }
    cb(null, true);

};

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/uploads/");
    },
    filename: (req, file, cb) => {
        console.log(file.originalname);
        cb(null, `${Date.now()}-bezkoder-${file.originalname}`);
    },
});

var uploadFile = multer({
    storage: storage,
    fileFilter: excelFilter
});
module.exports = uploadFile;
