// ************ Require's ************
const express = require('express');
const router = express.Router();
const guestMDW = require('../middlewares/guestMDW')
const userMDW = require('../middlewares/userMDW')

/***  Middlewares ***/

const validations = require('../middlewares/userValidationsMDW')
const upload = require('../middlewares/userMulterMDW')

// ************ Controller Require ************

const usersController = require('../controllers/usersController');

/*** GET ALL USERS ***/
router.get('/', guestMDW, usersController.index);

/*** Register new user ***/
router.get('/register', userMDW, usersController.register);

/*** Process new user data ***/
router.post('/register',upload.single('image'), validations, usersController.create);

/*** Login ***/
router.get('/login', userMDW, usersController.login);

/*** Process Login ***/
router.post('/login', usersController.validateLogin);

/*** Process Logout ***/
router.get('/logout', usersController.logout);

/*** Edit user ***/ 
router.get('/edit/:id', guestMDW, usersController.edit); 

/*** Process edited user data ***/
router.put('/edit/:id',upload.single('image'), usersController.update);

/*** User delete ***/
router.delete('/delete/:id', usersController.destroy);

/*** User detailed info ***/ 
router.get('/:id', guestMDW, usersController.userDetail);

module.exports = router;