

var foodPruductController = require('../controllers/foodPruduct.controller');


// products routes
module.exports = function(app) {

	app.get('/product/:productName', foodPruductController.getProduct)	// product by name page

	app.get('/getAllProduct', foodPruductController.getAllProduct)	// all products page

};