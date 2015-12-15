var http = require('http')
var port = process.env.PORT || 13371;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Azuer\n');
}).listen(port, function(){
	console.log(port+'jj');
});
