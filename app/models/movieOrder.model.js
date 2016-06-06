

/* ----------------------------------

 * create movie order schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;


var movieOrderSchema = new schema( {

	name: String,

	review: {
	    lame: { type: Number, default: 0 },
	    wtf: { type: Number, default: 0 },
	    wow: { type: Number, default: 0 },
	    nice: { type: Number, default: 0 }
    },

	cinema: Number,

	time: String,

	auditorium: Number,

	seats: [{
	    row: Number,
	    seat : [{
	    	number: Number,
	    	occupied: Boolean
	    }]
	}]


}, {collection: 'movieOrder'});


// // Define schema name
mongoose.model('MovieOrder',movieOrderSchema);


