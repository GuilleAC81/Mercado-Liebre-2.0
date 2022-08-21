const { validationResult } = require('express-validator');
const User = require('../models/User')
const categories = require('../data/categories');


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

	validateLogin:  (req,res) => {

		let userToLogin = User.findByField('user', req.body.user );
		let emailToLogin = User.findByField('email', req.body.user );
		let login = (userToLogin || emailToLogin);

		if(login){
			let validation = (User.validatePassword(req.body.password, login.password));
			
			if (validation){
				delete login.password;
				req.session.dataLog = login;

				if(req.body.rememberMe) {
					res.cookie('cookieId', login.id, { maxAge: (1000 * 60) * 60 })
				}

				return res.redirect('/users/' + (login.id))
			}
			return res.render('login', {
				errors: {
					user: {
						msg: 'Las credenciales son inválidas'
					}
				}
			});
		}
		return res.render('login', {
			errors: {
				user: {
					msg: 'No se encuentra el usuario en nuestra base de datos'
				}
			}
		});
	
    },
    
    register:  (req,res) => {
		res.render('userRegister',{	
			categories: categories
		});
    },
    
    create: (req,res) => {

		let validation = validationResult(req);
		let emailInDb = User.findByField('email', req.body.email);
		let userInDb = User.findByField('user', req.body.user);
		if (validation.errors.length > 0) {
			return res.render('userRegister', {
				errors: validation.mapped(),
				userData: req.body,
				categories: categories
			});
		}

		// verificamos que el email se encuentre disponible

		if (emailInDb) {
			return res.render('userRegister', {
				errors: { email: { msg: 'Este email ya se encuentra registrado'	} },
				userData: req.body,
				categories: categories
			});
		}

		// verificamos que el nombre de usuario se encuentre disponible

		if (userInDb) {
			return res.render('userRegister', {
				errors: { user: { msg: 'El nombre de usuario se encuentra en uso'	} },
				userData: req.body,
				categories: categories
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
		res.render('userEdit', {
			userData: userSelected,
			categories: categories
		});

	},

	update: (req, res) => {
		
		const validation = validationResult(req);
		if (validation.errors.length > 0) {
			return res.render('userEdit', {
				errors: validation.mapped(),
				userData: req.body,
				categories: categories
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

	logout: (req, res) => {
		res.clearCookie('cookieId');
		req.session.destroy();
		return res.redirect('/');
	}

}

module.exports = usersController;