const User = require('../models/User');

function loggedMDW(req, res, next) {
	res.locals.logged = false;

	let id = req.cookies.cookieId;
	let userFromCookie = User.findByPk(id);

	if (userFromCookie) {
		req.session.dataLog = userFromCookie;
	}

	if (req.session.dataLog) {
		res.locals.logged = true;
		res.locals.dataLog = req.session.dataLog;
	}

	next();
}

module.exports = loggedMDW;