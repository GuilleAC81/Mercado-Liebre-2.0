// ************ Require's ************
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

var storage = multer.diskStorage({  
        destination: function (req, file, cb) {
            let imgAdress = path.join(__dirname,'../../public/images/products') ;
            cb(null, imgAdress);
        },
        filename: function (req, file, cb) {
            let newName = "img-product" + Date.now() + path.extname(file.originalname);
            cb(null, newName );
        },
})

var upload= multer({storage: storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

/*** GET ALL PRODUCTS ***/ 
router.get('/', productsController.index); 

/*** CREATE ONE PRODUCT ***/ 
router.get('/create', productsController.create); 
router.post('/create/',upload.single('product-img'), productsController.store); 

/*** GET ONE PRODUCT ***/ 
router.get('/:id', productsController.detail);


/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); 
router.put('/edit/:id',upload.single('product-img'), productsController.update); 


/*** DELETE ONE PRODUCT***/ 
router.delete('/:id', productsController.destroy); 


module.exports = router;
