var Express = require('express');
var app = Express();

var port = 2046;

app.listen(port, function(){
	console.log('server started on port',port);
});

app.get('/', function(req, res, err){

	//this is where we specify what kind of file we want to send back
	//as we'll see, it only sends one file, so if you're using anything else (such as css files, image files), they won't be served
	res.sendFile(__dirname  + '/public_a/index.html');
});
