

var movieController = require('../controllers/movie.controller');


// products routes
module.exports = function(app) {

	app.post('/getAllMovies', movieController.getAllMovies)	// all movies page

	app.post('/getMovieOrder/', movieController.getMovieOrder)	// one movie to show before order page

	app.post('/setSeats/', movieController.setSeats)	// save seats in the auditorium

	app.post('/getMovie/', movieController.getMovie)	// get movie details page

	app.post('/getMovieTrailer/', movieController.getMovieTrailer)	// get movie trailer page

	app.post('/getMovieCategory/', movieController.getMovieCategory)	// get movie trailer page

	app.post('/getReviews/', movieController.getReviews)	// get movie trailer page

};