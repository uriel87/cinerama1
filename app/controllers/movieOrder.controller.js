

var MovieOrderSchema = require('mongoose').model('MovieOrder');





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
		name: req.body.name,
		date: req.body.date,
		time: req.body.time,
		auditorium: req.body.auditorium
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
	        'seats.$.occupied':true
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




