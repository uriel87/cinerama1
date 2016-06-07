

var movieController = require('../controllers/movie.controller');


// products routes
module.exports = function(app) {

	app.post('/getMovie/', movieController.getMovie)	// all products page

	app.post('/getMovieTrailer/', movieController.getMovieTrailer)	// all products page

};


