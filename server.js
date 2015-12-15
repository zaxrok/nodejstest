
var fs = require('fs');
var http = require('http');
var url = require('url');

http.createServer(function (request, response){
	var pathname = url.parse(request.url).pathname;
	fs.readFile(__dirname+'./snap/'+pathname.substr(1), function(error, data){
		if(error){
			console.log(error);
			console.log('error: '+pathname);	
			response.writeHead(404, { 'Content-Type': 'text/html' });
			response.write('<h1>404 error</h1>');
			response.write('<p>Please type http://ipaddress:55273/snap.html</p>');
		}
		else{
			response.writeHead(200, { 'Content-Type': 'text/html' });
			response.write(data.toString());
		}
		response.end();
	});
}).listen(1337, function(){
	console.log('Server Running at http://127.0.0.1:23691');
});
