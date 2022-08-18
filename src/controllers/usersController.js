const { validationResult } = require('express-validator');
const User = require('../models/User')



const usersController = {
    
    index:  (req,res) => {
        res.render('users', {
            users: User.allUsers(),
        });
    },
	
    login:  (req,res) => {
        res.render('login', {
		});
    },
    
    register:  (req,res) => {
		res.render('register',{		
		});
    },
    
    create: (req,res) => {

		const validation = validationResult(req);
		if (validation.errors.length > 0) {
			return res.render('register', {
				errors: validation.mapped(),
				userData: req.body
			});
		}
		let id = User.newId()
		User.create(req) 

		res.redirect('/users/' + id)
	},

	userDetail: (req, res) => {
		
		let userSelected = User.findByPk(req.params.id)
		res.render('userDetail', {
			user: userSelected,
		});

	},

	edit: (req, res) => {

		let userSelected = User.findByPk(req.params.id)
		res.render('register', {
			userData: userSelected,
		});

	},

	update: (req, res) => {
		
		const validation = validationResult(req);
		if (validation.errors.length > 0) {
			return res.render('register', {
				errors: validation.mapped(),
				userData: req.body
			});
		}

		let id = req.params.id;
		User.edit(id,req)
		res.redirect('/users/' + id)
	},

	destroy: (req,res) => {
		let id = req.params.id
		User.delete(id)
		res.redirect("/users")
	},

}

module.exports = usersController;