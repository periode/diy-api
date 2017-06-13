var Express = require('express');

// this is where we require the mongoose module
// mongoose is a node implementation of the more popular MongoDB (https://www.mongodb.com/)
var mongoose = require('mongoose');

var app = Express();

var port = 2046;

app.listen(port, function(){
	console.log('server listening on port',port);
});


// ---
// this is the part where we connect to the database
mongoose.connect('mongodb://localhost/mylibrary');

// we save our connection into a variable called `my_database`
var my_database = mongoose.connection;

my_database.on('error', function(error){
	console.log(error);
});


// once we've opened the connection with our database, we can set up its contents

var Book;

my_database.on('open', function(){
	console.log('we are connected!');

	// this is where you should declare all of the schemas that you are going to use
	// a Schema is basically defining the shape of documents in a MongoDB collection
	var bookSchema = new mongoose.Schema({
		title: String,
		author: String,
		synopsis: String
	});

	// once we've specified what Schema we are going to work with, we need to turn it into a Model
	// Models are specific manifestations (instances) of the Schemas that we have defined
	// think of it as a Schema being a blueprint and a Model being the actual building
	Book = mongoose.model('Book', bookSchema);
});


// here we specify a route just to save a specific book
app.get('/save-emma', function(req, res, err){

	// now, we can create new Schemas and save them in our database.
	var emma = new Book({
		title: 'Madame Bovary',
		author: 'Gustave Flaubert',
		synopsis: 'What happens if you give too much credibility to fiction'
	});

	// once that we have our Model, we can call the save() function within it to save it automatically to our opened database	
	emma.save(function(error, emma){
		if(error)
			throw error;
		else{
			console.log('successfully saved emma bovary!');
			res.send('successfully saved emma to mongoose!');
		}
	});
});


// finally, let's write a route that allows us to get all of those results
app.get('/get-all', function(request, response, err){

	// first, we use the find() function on our Model to find all the Models corresponding
	Book.find(function(err, all_books){
		// which are then returned as an array, here `all_books`

		// so we loop through them
		for(var i = 0; i < all_books.length; i++){

			// and we write each one to our response
			// NOTE: response.write() is similar to response.send() in that it writes something back to the client
			// NOTE: but it is different in that you can call it multiple times, and that you need to call response.end() when you're done
			response.write(all_books[i].toString()+'<br><br><hr>');
			
		}
		
		// once we've looped through all the entries and that we've written them to our response, we call end()
		response.end();
	});
});
