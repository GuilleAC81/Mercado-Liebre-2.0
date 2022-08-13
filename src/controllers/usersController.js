const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
    
    index:  (req,res) => {
        res.render('users', {
            users: users,
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

        let data = req.body;
		let newId = users.length+1;
		let image = req.file;
		if(!data.intereses){
			data.intereses = [];
		}
        let newUser = {
			id: newId,
			name: data.name,
			user: data.user,
			email: data.email,
			bornDate: data.bornDate,
			address: data.address,
			perfil: data.perfil,
			intereses: data.intereses,
			password: data.password,
			image: image.filename,
			/*'default.png'*/
		}

		// if (image != undefined){
		// 	newUser.image = image.filename;
		// };
		users.push(newUser);
		let usersJson = JSON.stringify(users);
		fs.writeFileSync(usersFilePath,usersJson);
		res.redirect('/users/' + newId)
	},

	userDetail: (req, res) => {
		let userId = req.params.id;
		let userSelected =  users.find(user => {
			return user.id == userId;
		});
		res.render('userDetail', {
			user: userSelected,
		});
	},

	edit: (req, res) => {
		let userId = req.params.id;
		let userSelected =  users.find(user => {
			return user.id == userId;
		});
		res.render('userEdit', {
			userData: userSelected,
		})
	},

	update: (req, res) => {
		
		let id = req.params.id;
		let data = req.body;
		let imagen = req.file;
		let originalImage = users[id-1].image;
		let userData ={
			name: data.name,
			user: data.user,
			email: data.email,
			bornDate: data.bornDate,
			address: data.address,
			perfil: data.perfil,
			intereses: data.intereses,
			password: data.password,
			image: originalImage,
		}
		if (imagen != undefined){
			userData.image = imagen.filename;
		}

		for(i=0; i<users.length; i++){
			if(users[i].id==id){
				users[i].name = userData.name;
				users[i].user = userData.user;
				users[i].email = userData.email;
				users[i].bornDate = userData.bornDate;
				users[i].address = userData.address;
				users[i].perfil = userData.perfil;
				users[i].intereses = userData.intereses;
				users[i].password = userData.password;
				users[i].image = userData.image;
			}
		}

		let userJson = JSON.stringify(users);
		fs.writeFileSync(usersFilePath,userJson);
		let url = "/users/" + id;
		console.log(url);
		res.redirect(url);
	},

}

module.exports = usersController;