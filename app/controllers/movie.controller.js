
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
 * get one movie function
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieOrder = function(req,res) {
	console.log('In controller getMovieOrder');

	var query = {
		name: req.body.name
	}

	MovieOrderSchema.find(query,function (err, doc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getMovieOrder, movieOrder.controller.js",
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
 * set seat function
 * @param req
 * @param res
-------------------------------------*/


exports.setSeats = function(req,res) {
	console.log('in controller getSeats');

	console.log("req.body.row - " + req.body.row);
	console.log("req.body.number - " + req.body.number);
	var number = req.body.number;

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

	console.log(query.name + " " +  query.date + " " + query.time + " " + query.auditorium + " " + req.body.row + " " + req.body.number);

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
				msg: " Database error in function setSeats, movieOrder.controller.js",
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
 * get one movie function
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieCategory = function(req,res) {
	console.log('In controller getMovieOrder');
	var movieName = req.body.moviename;
	movie(movieName,function (err, movieDoc) {
		//movieCat = movieDoc.Genre;
		var movieCat = movieDoc.Genre.split(",");

		someCategoryArr = findSomeCategory(movieCat);

		var query = {
			category: someCategoryArr[0],
		}

		MovieOrderSchema.find(query,function (err, doc) {
			if(err) {
				console.log(err);
				res.status(200).json({
					status: "404",
					msg: " Database error in function getMovieOrder, movieOrder.controller.js",
					err: err
				});
			}
			else {
				console.log("controller getMovieOrder: " + doc);
				res.status(200).json(doc);
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



// .aggregate(
//   {$match : {"_id.name" : "John"}},
//   {$group : {_id : "$_id.name", 
//              dollar : {$sum : "$value.types.dollar"}, 
//              euro : {$sum : "$value.types.euro"}, 
//              unknown : {$sum : "$value.types.unknown"}}}
// )
















//Todo choose movie
/* ----------------------------------
 * get one movie function
 * @param req
 * @param res
-------------------------------------*/



// exports.getMovieOrder = function(req,res) {
// 	console.log('In controller getMovieOrder');

// 	var query = {
// 		name: req.body.name//,
// 		// cinema: req.body.cinema,
// 		// date: req.body.date,
// 		// time: req.body.time,
// 		// auditorium: req.body.auditorium
// 	}

// 	MovieOrderSchema.find(query,function (err, doc) {
// 		if(err) {
// 			console.log(err);
// 			res.status(200).json({
// 				status: "404",
// 				msg: " Database error in function getMovieOrder, movieOrder.controller.js",
// 				err: err
// 			});
// 		}
// 		else {
// 			dateFormat.masks.time = 'HH:MM';
// 			//console.log('mmmmeee' + jsonsty(doc.date))
// 			//console.log(Date.parse(doc.date));
// 			// var d = new Date(doc.date);
// 			console.dir(doc);
// 			// dateFormat(doc.time,  'isoTime');	
// 			// console.log(dateFormat(doc.time,  'isoTime'));
// 			// console.log("controller getMovieOrder: " + doc);
// 			res.status(200).json(doc);
// 		}
// 	})

// };














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










