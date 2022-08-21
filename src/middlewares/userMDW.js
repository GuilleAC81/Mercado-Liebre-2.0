module.exports = (req, res, next) => {

    if (req.session.dataLog){
    
        return res.redirect('/users/'+(req.session.dataLog.id));

    }

    next();
};
