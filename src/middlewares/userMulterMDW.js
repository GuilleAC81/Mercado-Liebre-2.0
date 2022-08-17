const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({  
    destination: function (req, file, cb) {
        let imgAdress = './public/images/users'
        cb(null, imgAdress);
    },
    filename: function (req, file, cb) {
        let newName = "img-user" + Date.now() + path.extname(file.originalname);
        cb(null, newName );
    },
})

const upload= multer({storage: storage});

module.exports = upload;