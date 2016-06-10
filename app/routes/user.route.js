
var userController = require('../controllers/user.controller');


// products routes
module.exports = function(app) {

	app.post('/getUser/', userController.getUser);	// product by name page

	app.post('/getAllUsers', userController.getAllUsers);	// all products page

	app.post('/getMovieUser', userController.getMovieUser);	// all products page

};