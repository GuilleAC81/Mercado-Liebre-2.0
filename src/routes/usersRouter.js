// ************ Require's ************
const express = require('express');
const router = express.Router();

/***  Middlewares ***/

const validations = require('../middlewares/userValidationsMDW')
const upload = require('../middlewares/userMulterMDW')

// ************ Controller Require ************

const usersController = require('../controllers/usersController');

/*** GET ALL USERS ***/
router.get('/', usersController.index);

/*** Register new user ***/
router.get('/register', usersController.register);

/*** Process new user data ***/
router.post('/register',upload.single('image'), validations, usersController.create);

/*** Login ***/
router.get('/login', usersController.login);

/*** User detailed info ***/ 
router.get('/:id', usersController.userDetail);

/*** Edit user ***/ 
router.get('/edit/:id', usersController.edit); 

/*** Process edited user data ***/
router.put('/edit/:id',upload.single('image'), usersController.update);

/*** User delete ***/
router.delete('/delete/:id', usersController.destroy);


module.exports = router;