var fs = require('fs');

var dataToBeWritten = 'world!';

fs.writeFile('data/hello.txt', dataToBeWritten, function(){
	console.log('written data to the file!');
});
