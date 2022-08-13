const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let arregloVisitados = [];
		let arregloOfertas = [];

		arregloVisitados = products.filter(product => {
			return product.category == 'visited';
		});

		arregloOfertas = products.filter(product => {
			return product.category == 'in-sale';
		});

		res.render('index', {
			visitados: arregloVisitados,
			ofertas: arregloOfertas
		});
	},
	search: (req, res) => {
		let busqueda = req.query.keywords;
		let resultado = [];
		for (let i=0; i<products.length; i++){
			if ((products[i].name.toUpperCase()).includes(busqueda.toUpperCase())){
				resultado.push(products[i]);
			}
		};
		
		let cantidad= resultado.length;

		res.render('results',{
			resultado: resultado,
			cantidad: cantidad,
		}
			);
	},

};

module.exports = controller;
