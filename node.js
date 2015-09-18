var http = require('http'),
		fs = require('fs'),
		path = require('path'),
		host = '127.0.0.1',
		port = "8000";
	
var mimes = {
	".html" : "text/html",
	".htm" : "text/html",
	".css" : "text/css",
	".js" : "text/javascript",
	".js" : "application/javascript",
	".gif" : "image/gif",
	".jpg" : "image/jpeg",
	".jpg" : "image/jpg",
	".png" : "image/png",
};

var server = http.createServer(function (req,res) {
	var filepath = (req.url === "/") ? ("./index.html") : ("." + req.url);
	var contentType = mimes[path.extname(filepath)] || "text/plain" ;

	// check for file exist or not
	fs.exists(filepath,function (file_exists) {
		if(file_exists){
			// Read and Server
			res.writeHead(200,{"Content-Type":contentType});
			var streamfile = fs.createReadStream(filepath).pipe(res);

			streamfile.on('error',function () {
				res.writeHead(500);
				res.end();
			});

		}else{
			res.writeHead(404);
			res.end("File not found");
		}
	}); 

}).listen(port,host,function () {
	console.log("server started at " + host + ":" + port);
});