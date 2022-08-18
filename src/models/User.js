const fs = require('fs');
const path = require('path')

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
		let userFound = users.find(oneUser => oneUser[field] === text);
		return userFound;
	},

	create: function(userData)  {
		
		let users = this.allUsers();
		let data = userData.body;
		let image = userData.file;
		
		if(!data.intereses){
			data.intereses = [];
		}

		let newUser = {
			id: this.newId(),
			name: data.name,
			user: data.user,
			email: data.email,
			bornDate: data.bornDate,
			address: data.address,
			perfil: data.perfil,
			intereses: data.intereses,
			password: data.password,
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
		
		if(!dataEdit.intereses){
			dataEdit.intereses = [];
		}

		let userData ={
			name: dataEdit.name,
			user: dataEdit.user,
			email: dataEdit.email,
			bornDate: dataEdit.bornDate,
			address: dataEdit.address,
			perfil: dataEdit.perfil,
			intereses: dataEdit.intereses,
			password: dataEdit.password,
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
	}
}

module.exports = User;