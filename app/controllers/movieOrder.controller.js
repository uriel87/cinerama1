

var MovieOrderSchema = require('mongoose').model('MovieOrder');

// var movie = require('node-movie');

// var movieTrailer = require('movie-trailer');



// movie('Central Intelligence', function (err, data) {
// 	console.log(data);
// });



// var movieTrailer = require('movie-trailer');
 
// movieTrailer('Central Intelligence', function (err, url) {
//     console.log(url);
//     //=> http://path/to/trailer 
// });



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
 *  set seat function
 * @param req
 * @param res
-------------------------------------*/


exports.getSeats = function(name, date, time, auditorium, seats) {
	console.log('in getExcellenceStudent');
	
	var query = {

		name: "Central Intelligence",
		date: "1/1/2016",
		time: "17:00",
		auditorium: 1,

		seats: {
			$elemMatch: {
				row: 1,
				number: 1,
				occupied: false
			}
		}
	}

	var setSeat = {		
		$set:{
	        'seats.$.occupied':true
	    }
	}


	MovieOrderSchema.findOneAndUpdate(query,setSeat, function(err, doc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getExcellenceStudent, studentController.js",
				err: err
			});
		}
		else
			console.log(`The your seats was saved`);
			console.log("DAO getExcellenceStudent: " + doc);
			res.status(200).json(doc);
	});

};




