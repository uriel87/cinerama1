

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



// /* ----------------------------------
//  *  set seat function
//  * @param req
//  * @param res
// -------------------------------------*/


// exports.setSeat = function(row, newseats) {
// 	console.log(`update document...`);

// 	var query = {
// 		row: row
// 	}

// 	var attrSet = {
// 		seat: false
// 	}

// 	MovieOrderSchema.findOneAndUpdate(query,attrSet, function(err, doc) {
// 		if(err)
// 			console.log(err);
// 		else
// 			console.log(`The document was updated`);
// 			//mongoose.disconnect();
// 	});
// };





