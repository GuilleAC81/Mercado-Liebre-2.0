const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');
const User = require('../models/User')
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

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
		// let id = req.params.id;
		// let data = req.body;
		// let imagen = req.file;
		// let originalImage = users[id-1].image;
		// let userData ={
		// 	name: data.name,
		// 	user: data.user,
		// 	email: data.email,
		// 	bornDate: data.bornDate,
		// 	address: data.address,
		// 	perfil: data.perfil,
		// 	intereses: data.intereses,
		// 	password: data.password,
		// 	image: originalImage,
		// }
		// if (imagen != undefined){
		// 	userData.image = imagen.filename;
		// }

		// for(i=0; i<users.length; i++){
		// 	if(users[i].id==id){
		// 		users[i].name = userData.name;
		// 		users[i].user = userData.user;
		// 		users[i].email = userData.email;
		// 		users[i].bornDate = userData.bornDate;
		// 		users[i].address = userData.address;
		// 		users[i].perfil = userData.perfil;
		// 		users[i].intereses = userData.intereses;
		// 		users[i].password = userData.password;
		// 		users[i].image = userData.image;
		// 	}
		// }

	// 	let userJson = JSON.stringify(users);
	// 	fs.writeFileSync(usersFilePath,userJson);
	// 	let url = "/users/" + id;
	// 	console.log(url);
	// 	res.redirect(url);
	},

}

module.exports = usersController;