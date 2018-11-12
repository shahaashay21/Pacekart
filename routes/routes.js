var indexController = require('../controllers');
var usersController = require('../controllers/users');

module.exports = (app) => {

    /////////////////////////////////////////
    //////		INITIALIZATION		   //////
    /////////////////////////////////////////
    // NOTHING FOR NOW

    /*-----------
	   Pacekart
    -----------*/
    app.get('/', indexController.index);
    app.get('/getuser', usersController.getUser);

    /*-----------
		APIs
    -----------*/
    app.post('/newuser', usersController.newuser);
};