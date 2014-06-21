var http = require('http');
var xml2js = require('xml2js');
var Hapi = require('hapi');

var server = Hapi.createServer(8000);

var html = '<html><head><title>form</title></head><body>' +
	'<form method="post"><input type="text" name="url"><input type="submit"></form>' +
	'</body></html>';

server.route({
	method: 'GET',
	path: '/',
	handler: function (request, reply) {
		reply(html);
	}
});

server.route({
	method: 'POST',
	path: '/',
	handler: function (request, reply) {
		var opt = {showHidden: false, depth: 2, colors: true};
		if ((request.payload.url == undefined) || (request.payload.url == '')) {
			reply('bad input!');
		}

		http.get(request.payload.url, function(res) {
			var xml = '';

			res.setEncoding('utf8');
			res.on('data', function (chunk) {
				xml += chunk;
			});

			res.on('end', function() {
				xml2js.parseString(xml, {trim: true}, function (err, result) {
					if (err) {
						console.log(err);
						reply('error: ' + JSON.stringify(err));
					} else {
						reply(JSON.stringify(result));
					}
				});
			});
		}).on('error', function(e) {
			console.log("Got error: " + e.message);
			reply(e.message);
		});
	}
});

// Start the server
server.start(function() {
	console.log("Hapi server started @", server.info.uri);
});
