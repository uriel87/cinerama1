

var movieOrderController = require('../controllers/movieOrder.controller');


// products routes
module.exports = function(app) {

	//app.get('/product/:productName', foodPruductController.getProduct)	// product by name page

	app.get('/getAllMovies', movieOrderController.getAllMovies)	// all products page

	//app.get('/getAllMovies', movieOrderController.setSeat)	// all products page  

};