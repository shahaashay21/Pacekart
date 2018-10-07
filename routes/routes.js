var indexController = require('../controllers/index_controller');
var usersController = require('../controllers/users_controller');

module.exports = (app) => {

    /////////////////////////////////////////
    //////		INITIALIZATION		   //////
    /////////////////////////////////////////
    // NOTHING FOR NOW

    /*-----------
	   Pacekart
    -----------*/
    app.get('/', indexController.index);

    /*-----------
		APIs
    -----------*/
    app.post('/newuser', usersController.newuser);
};