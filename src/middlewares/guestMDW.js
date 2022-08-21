module.exports = (req, res, next) => {

    if (!req.session.dataLog){
    
        return res.redirect('/users/login');

    }

    next();
};