const fs = require('fs');
const path = require('path')
const bcryptjs = require('bcryptjs');

const User = {
	database: path.join(__dirname, '../data/usersDataBase.json'),

	allUsers: function()  {
		return JSON.parse(fs.readFileSync(this.database, 'utf-8'));
	},

	newId: function()  {
		let users = this.allUsers();
		let lastUser = users.pop();
		if (lastUser) {
			return lastUser.id + 1;
		}
		return 1;
	},

	findByPk: function(id)  {
		let users = this.allUsers();
		let userFound = users.find(oneUser => oneUser.id == id);
		return userFound;
	},

	findByField: function (field, text)  {
		let users = this.allUsers();
		let userFound = users.find(oneUser => oneUser[field].toUpperCase() == text.toUpperCase());
		return userFound;
	},

	create: function(userData)  {
		
		let users = this.allUsers();
		let data = userData.body;
		let image = userData.file;
		let hashedPassword = bcryptjs.hashSync(data.password, 10);
		
		if(!data.intereses){
			data.intereses = [];
		}
		if (data.intereses.length > 5){
			let temp = data.intereses
			data.intereses = [temp]
		}

		let newUser = {
			id: this.newId(),
			name: data.name,
			user: data.user,
			email: data.email,
			bornDate: data.bornDate,
			address: data.address,
			perfil: data.perfil,
			admin: "no",
			intereses: data.intereses,
			password: hashedPassword,
			image: image.filename,
		};

		users.push(newUser);
		let usersJson = JSON.stringify(users, null,  ' ');
		fs.writeFileSync(this.database, usersJson);
		return newUser;
	},

	edit: function(idEdit, reqEdit){
		
		let usersDataBase = this.allUsers();
		let dataEdit = reqEdit.body;
		let imageEdit = reqEdit.file;
		let hashedPassword = bcryptjs.hashSync(dataEdit.password, 10);
		
		if(!dataEdit.intereses){
			dataEdit.intereses = [];
		};
		
		if (dataEdit.intereses.length > 5){
			let temp = dataEdit.intereses
			dataEdit.intereses = [temp]
		}

		let userData ={
			name: dataEdit.name,
			user: dataEdit.user,
			email: dataEdit.email,
			bornDate: dataEdit.bornDate,
			address: dataEdit.address,
			perfil: dataEdit.perfil,
			intereses: dataEdit.intereses,
			password: hashedPassword,
			admin: dataEdit.admin,
			image: imageEdit.filename,
		};

		for(i=0; i<usersDataBase.length; i++){
			if(usersDataBase[i].id==idEdit){
				usersDataBase[i].name = userData.name;
				usersDataBase[i].user = userData.user;
				usersDataBase[i].email = userData.email;
				usersDataBase[i].bornDate = userData.bornDate;
				usersDataBase[i].address = userData.address;
				usersDataBase[i].perfil = userData.perfil;
				usersDataBase[i].admin = userData.admin;
				usersDataBase[i].intereses = userData.intereses;
				usersDataBase[i].password = userData.password;
				usersDataBase[i].image = userData.image;
			}
		}

		let usersJson = JSON.stringify(usersDataBase, null,  ' ');
		fs.writeFileSync(this.database, usersJson);
		
		return userData;
	
	},

	delete: function(id)  {
		let users = this.allUsers();
		let finalUsers = users.filter(user => user.id != id);
		let usersJson = JSON.stringify(finalUsers, null,  ' ');
		fs.writeFileSync(this.database, usersJson);
		return finalUsers;
	},

	validatePassword: function(password,hash){
		return bcryptjs.compareSync(password, hash)
	}
}

module.exports = User;