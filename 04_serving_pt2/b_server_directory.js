var Express = require('express');
var app = Express();

var port = 2046;

app.listen(port, function(){
	console.log('server started on port',port);
});

// now that we've added that line, we can easily access any file that is in our server
// because now Express knows that it should look for any thing requested in the specified folder
// in our case we are saying to look for 'public_b'
app.use(Express.static(__dirname + '/public_b/'));

app.get('/', function(req, res, err){
	// note that, here, we don't even need to specify the directory name anymore
	// since Express will look into the designated folder (specified on line 13)
	// for that specific filename
	res.sendFile('index.html');
});
