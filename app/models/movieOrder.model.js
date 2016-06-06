

/* ----------------------------------

 * create movie order schema
 
-------------------------------------*/


var mongoose = require("mongoose"),
	schema = mongoose.Schema;



var movieOrderSchema = new schema( {

	name: { type:String,  unique:true},

	review: String,

	cinema: Number,

	time: String,

	auditorium: Number,

	seats: [{
	    row: { type: Number, unique:true },
	    seat : [{
	    	number: Number,
	    	occupied: Boolean
	    }]
	}]


}, {collection: 'movieOrder'});


// // Define schema name
mongoose.model('MovieOrder',movieOrderSchema);


// review: enum: ['lame.', 'wtf.', 'wow.', 'nice'],

