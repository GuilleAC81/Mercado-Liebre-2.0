const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', {
			products: products,
		});
	},
	// Detail - Detail from one product
	detail: (req, res) => {
		let productId = req.params.id;
		let productSelected =  products.find(product => {
			return product.id == productId;
		});
		let finalPrice = productSelected.price - (productSelected.price*productSelected.discount/100);
		res.render('detail', {
			product: productSelected,
			finalPrice: finalPrice,
		});
	},
	// Create - Form to create
	create: (req, res) => {
		let productoNuevo = {
			id: products.length+1,
			name: undefined,
			price: undefined,
			discount: undefined,
			category: undefined,
			description: undefined,
			image: 'Formulario de creación de productos'
		}
		res.render('product-create-form', {
			productoNuevo: productoNuevo,
		});
		
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let datos = req.body;
		let idNuevo = products.length+1;
		let imagen = req.file;
		let productoNuevo = {
			id: idNuevo,
			name: datos.name,
			price: datos.price,
			discount: datos.discount,
			category: datos.category,
			description: datos.description,
			image: '¡¡¡Olvidó cargar la imagen!!!'
		}
		if (imagen != undefined){
			productoNuevo.image = imagen.filename;
			products.push(productoNuevo);
			let jsonProducts = JSON.stringify(products);
			fs.writeFileSync(productsFilePath,jsonProducts);
			res.redirect("/products/" + idNuevo)
		}else{
			res.render('product-create-form',{
				productoNuevo: productoNuevo,

			})
		}
		
		// products.push(productoNuevo);
		// let jsonProducts = JSON.stringify(products);
		// fs.writeFileSync(productsFilePath,jsonProducts);
		// res.redirect("/products/" + idNuevo)
	},
	// Update - Form to edit
	edit: (req, res) => {
		let productId = req.params.id;
		let productSelected =  products.find(product => {
			return product.id == productId;
		});
		res.render('product-edit-form', {
			product: productSelected,
		})
	},
	// Update - Method to update
	update: (req, res) => {
		let id = req.params.id;
		let datos = req.body;
		let imagen = req.file;
		let originalImage = products[id-1].image;
		let datosProductos ={
			name: datos.name,
			price: datos.price,
			discount: datos.discount,
			category: datos.category,
			description: datos.description,
			image: originalImage,
		}
		if (imagen != undefined){
			datosProductos.image = imagen.filename;
		}

		for(i=0; i<products.length; i++){
			if(products[i].id==id){
				products[i].name = datosProductos.name;
				products[i].discount = datosProductos.discount;
				products[i].price = datosProductos.price;
				products[i].category = datosProductos.category;
				products[i].description = datosProductos.description;
				products[i].image = datosProductos.image;
			}
		}
		//otra forma
		// for(item of products){
		// 	if(item.id == req.params.id){
		// 		item.name = req.body.name
		// 		item.price = req.body.price
		// 		item.discount = req.body.discount
		// 		item.category = req.body.category
		// 		item.description = req.body.description
		// 	}
		// }
		let jsonProducts = JSON.stringify(products);
		fs.writeFileSync(productsFilePath,jsonProducts);
		res.redirect("/products/" + id)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let id = req.params.id;
		let productosBorrado = products.filter((producto)=> producto.id != id);
		let jsonProducts = JSON.stringify(productosBorrado);
		fs.writeFileSync(productsFilePath,jsonProducts);
		res.redirect("/products");
	}
};

module.exports = controller;