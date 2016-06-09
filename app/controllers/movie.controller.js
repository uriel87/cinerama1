
var movie = require('node-movie'),
	movieTrailer = require('movie-trailer'),
	MovieOrderSchema = require('mongoose').model('Movie'),
	_ = require('underscore'),
	dateFormat = require('dateformat'),
	formatDate = require('format-date');






/* ----------------------------------
 * get all movies function
 * @param req
 * @param res
-------------------------------------*/


exports.getAllMovies = function (req,res) {
	console.log('in controller getAllMovies');
	MovieOrderSchema.find({},function (err, movieDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getAllMovies, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getAllMovies: " + movieDoc);
			res.status(200).json(movieDoc);
		}
	});
};






/* ----------------------------------
 * get one movie details function
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieDetails = function(req,res) {
	console.log('In controller getMovieDetails');

	var query = {
		name: req.body.name
	}

	MovieOrderSchema.find(query,function (err, doc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovieDetails, movieOrder.controller.js",
				err: err
			});
		}
		else {
			console.dir(doc);
			res.status(200).json(doc);
		}
	})

};











/* ----------------------------------
 * set seat in audituriom function
 * @param req
 * @param res
-------------------------------------*/


exports.setSeats = function(req,res) {
	console.log('in controller getSeats');

	var query = {
		name: req.body.name,
		date: req.body.date,
		time: req.body.time,
		auditorium: parseInt(req.body.auditorium),

		seats: {
			$elemMatch: {
				row: parseInt(req.body.row),
				number: parseInt(req.body.number),
				occupied: false
			}
		}
	};

	var setSeat = {		
		$set:{
	        'seats.$.occupied': true
	    }
	}

	MovieOrderSchema.findOneAndUpdate(query,setSeat, function(err, doc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function setSeats, movie.controller.js",
				err: err
			});
		}
		else
			console.log(`The your seats was saved`);
			console.log("controller setSeats: " + doc);
			res.status(200).json(doc);
	});

};









/* ----------------------------------
 * get more movie with some category
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieCategory = function(req,res) {
	console.log('In controller getMovieCategory');
	var movieName = req.body.moviename;
	movie(movieName,function (err, movieDoc) {
		//movieCat = movieDoc.Genre;
		var movieCat = movieDoc.Genre.split(",");

		someCategoryArr = findSomeCategory(movieCat);

		var query = {
			category: someCategoryArr[0],
		}

		MovieOrderSchema.find(query,function (err, docSomeCategory) {
			if(err) {
				console.log(err);
				res.status(200).json({
					status: "404",
					msg: " Database error in function getMovieCategory, movieOrder.controller.js",
					err: err
				});
			}
			else {
				console.log("controller getMovieCategory: " + docSomeCategory);
				res.status(200).json(docSomeCategory);
			}
		})

	});

};





/* ----------------------------------
 * get Movie details
 * @param req
 * @param res
-------------------------------------*/


exports.getMovie = function (req,res) {
	console.log('in controller getMovie');
	var movieName = req.body.moviename;
	movie(movieName,function (err, movieDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovie, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getMovie: " + movieDoc);
			res.status(200).json(movieDoc);
		}
	});
};






/* ----------------------------------
 * get Movie trailer url
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieTrailer = function (req,res) {
	console.log('in controller getMovieTrailer');
	var movieName = req.body.moviename;
	movieTrailer(movieName,function (err, movieTrailerDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovie, movie.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getMovie: " + movieTrailerDoc);
			res.status(200).json(movieTrailerDoc);
		}
	});
};








/* ----------------------------------
 * get reviews function
 * @param req
 * @param res
-------------------------------------*/


exports.getReviews = function(req,res) {
	console.log('in controller getReviews');

	var aggregate = MovieOrderSchema.aggregate();

	aggregate.match( {name: req.body.moviename });

	console.log(req.body.moviename);

	var sumReview = {
		_id: '$name',
        lame: {$sum: '$review.lame'},
        wtf: {$sum: "$review.wtf"},
        wow: {$sum: "$review.wow"},
        nice: {$sum: '$review.nice'}
	}

	aggregate.group(sumReview);
	aggregate.exec(function(err, reviewDoc){
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getReviews, movie.controller.js",
				err: err
			});
		}
		else
			console.log("controller getReviews: " + reviewDoc);
			res.status(200).json(reviewDoc);
	});

};





function findSomeCategory(categoryForResult) {

	var categoty = [
		"Action", "Adventure", "Animation", "Biography",
		"Comedy","Crime", "Documentary", "Drama",
		"Family", "Fantasy", "History", "Horror",
		"Music", "Mystery", "Romance", "Sci-Fi", "Sport",
		"Thriller", "War"
	]

	return _.intersection(categoty, categoryForResult);
}










