

var movieOrderController = require('../controllers/movieOrder.controller');


// products routes
module.exports = function(app) {

	app.post('/getAllMovies', movieOrderController.getAllMovies)	// all movies page

	app.post('/getMovieOrder/', movieOrderController.getMovieOrder)	// one movie to show before order page 

	app.post('/setSeats/', movieOrderController.setSeats)	// save seats in the auditorium

};