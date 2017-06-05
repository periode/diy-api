var fs = require('fs');

//here is the data we want to add to our file, without rewriting everything
var newPerson = {
	'name': 'John',
	'human': true
};

//first, we need to READ the file, to see what it contains
fs.readFile('./data/persons.json', function(error, data){
	if(error)
		throw error;

	//since every file is just text, we need to parse it as JSON (because we know that it's JSON and that JSON allows us to manipulate the data more easily)
	var existing_file = JSON.parse(data);

	//now that we have it as a JSON format, we can actually add to the array called 'everyone'
	existing_file.everyone.push(newPerson);
	
	//now that we have our updated data, we can turn it again into text, by using JSON.stringify
	writeable_data = JSON.stringify(existing_file);

	//and finally, we write the whole thing to the same file, essentially updating it
	fs.writeFile('data/persons.json', writeable_data, function(error){
		if(error)
			throw error;
		console.log('successfully added data to the file!');
	});
});
