const path = require('path');
const { body } = require('express-validator');

const validateRegisterMDW = [
	body('name')
    .notEmpty().withMessage('Tienes que escribir un nombre').bail()
    .isLength({min:3}).withMessage('El nombre debe ser mas largo').bail()
    .isLength({max:30}).withMessage('El nombre debe ser mas corto'),

    body('user')
    .notEmpty().withMessage('Tienes que escribir un nombre de usuario').bail()
    .isLength({min:3}).withMessage('El nombre de usuario debe ser mas largo').bail()
    .isLength({max:15}).withMessage('El nombre debe ser mas corto'),

    body('bornDate').notEmpty().withMessage('Olvidaste ingresar tu fecha de nacimiento'),

    body('address')
    .notEmpty().withMessage('Tienes que escribir tu domiciilio').bail()
    .isLength({min:7,max:30}).withMessage('El domicilio no es valido').bail(),

	body('email')
		.notEmpty().withMessage('Tienes que escribir un E-Mail').bail()
		.isEmail().withMessage('Debes escribir un formato de E-Mail válido'),
	
	body('perfil').notEmpty().withMessage('Tienes que elegir un perfil del usuario'),

    body('image').custom((value, { req }) => {
		let file = req.file;
		let acceptedExtensions = ['.jpg', '.png', '.bmp'];
		
		if (!file) {
			throw new Error('Tienes que subir una imagen');
		} else {
			let fileExtension = path.extname(file.originalname);
			if (!acceptedExtensions.includes(fileExtension)) {
				throw new Error(`Las extensiones de archivo permitidas son ${acceptedExtensions.join(', ')}`);
			}
		}

		return true;
	}),

    body('password').notEmpty().withMessage('Tienes que escribir una contraseña').bail()
    .custom((value, { req }) => {
		
		if (value != req.body.confirmar) {
			throw new Error('Las contraseñas no coinciden');
		} 
		return true;
	}),
]

module.exports = validateRegisterMDW;