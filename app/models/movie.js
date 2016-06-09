

/* ----------------------------------

 * create movie order schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;




var movieSchema = new schema( {

	name: String,

	review: {
	    lame: { type: Number, default: 0 },
	    wtf: { type: Number, default: 0 },
	    wow: { type: Number, default: 0 },
	    nice: { type: Number, default: 0 }
    },

    category: String,

	cinema: String,

	branch: String,

	time: Date,

	auditorium: Number,

	seatsLeft: Number,

	seats: [{
	    row: { type: Number, unique: true },
		seat: { type: Number, unique: true },
		occupied: Boolean
	}]


}, {collection: 'movieOrder'});


// // Define schema name
mongoose.model('Movie',movieSchema);
