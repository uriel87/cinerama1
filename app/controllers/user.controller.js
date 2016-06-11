

var userSchema = require('mongoose').model('User'),
	MovieSchema = require('mongoose').model('Movie');




/* ----------------------------------
 * get all users function
 * @param req
 * @param res
-------------------------------------*/


exports.getAllUsers = function (req,res) {
	console.log('in controller getAllProduct');
	userSchema.find({},function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getUser, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getUser: " + userDoc);
			res.status(200).json(userDoc);
		}
	});
};



/* ----------------------------------
 * get user by email function
 * @param req
 * @param res
-------------------------------------*/


exports.getUser = function(req, res) {
	console.log('in controller getUser');
	console.log('req.params.email - ' + req.body.email);

	console.log('Type of - ' + typeof req.body.email);

	var query = {
		email: req.body.email
	}

	userSchema.findOne(query,function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function getUser, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller getUser: " + userDoc);
			res.status(200).json(userDoc);
		}
	})

};






/* ----------------------------------
 * get movie's user function
 * @param req
 * @param res
-------------------------------------*/


exports.getMovieUser = function(req, res) {
	console.log('in controller getMovieUser');

	var query = {
		email: req.body.email,
		orders: {
			$elemMatch: {
				commitPush: false
			}
		}
	}

	userSchema.distinct("orders.movieId",query,function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: "Database error in function getMovieUser, user.controller.js",
				err: err
			});
		}
		else {

			var aggregate = MovieSchema.aggregate();

			aggregate.match( {id: { $in: userDoc }} );

			var sumReview = {
				_id: {
					name: '$name',
					cinema: '$cinema',
					branch: '$branch'
				} 
			}

			aggregate.group(sumReview);

			aggregate.exec(function (err, moviesUserDoc) {
				if(err) {
					console.log(err);
					res.status(200).json({
						status: "404",
						msg: "Database error in function getMovieUser, user.controller.js",
						err: err
					});
				}
				else {
					console.log("controller getMovieUser: " + moviesUserDoc);
					res.status(200).json(moviesUserDoc);
				}
			});
		}
	});
};








/* ----------------------------------
 * push new review
 * @param req
 * @param res
-------------------------------------*/


exports.pushReview = function(req, res) {
	console.log('in controller pushReview');


	console.log('req.body.email - ' + req.body.email + ", req.body.movieid - " + req.body.movieid);


	var commentsArr = ["lame", "wtf", "wow", "nice"];

	if( commentsArr.indexOf(req.body.review) < 0) {
		console.log("Eroor, comment invalid");
		return res.status(200).json("Eroor, comment invalid");
	}

	var query = {
		email: req.body.email,
		orders: {
			$elemMatch: {
				movieId: req.body.movieid,
				commitPush: false
			}
		}
	}

	var setSeat = {		
		$set:{
			'orders.$.commitPush': true,
			'orders.$.comment': req.body.comment,
			'orders.$.review': req.body.review
	    }
	}

	userSchema.findOneAndUpdate(query, updateData, function (err, userDoc) {
		if(err) {
			console.log(err);
			res.status(200).json({
				status: "404",
				msg: " Database error in function pushReview, user.controller.js",
				err: err
			});
		}
		else {
			console.log("controller pushReview: " + userDoc);
			res.status(200).json(userDoc);
		}
	})

};





