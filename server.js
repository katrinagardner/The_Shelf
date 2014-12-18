

var http = require("http");
var fs = require("fs");

var books = ["alice_wonderland.txt", "frankenstein.txt", "grimms_fairy_tales.txt",
"gullivers_travels.txt", "huckleberry.txt", "moby_dick.txt",
"sherlock_holmes.txt", "tale_two_cities.txt", "tom_sawyer.txt", "treasure_island.txt"];

var server = http.createServer(function(request, response){
	var path = request.url;
	var l = path.length
	var path_end = path[l-4] + path[l-3] + path[l-2] + path[l-1];
	console.log(path_end);
	console.log(path);
	if(path === "/"){
		fs.readFile("index.html", function(err,data){
			if(err){
				console.log("error");
			}else{
				console.log("hey");
				var text = data.toString();
				response.end(text);
			}
		});
	}else if(path === "/styleBook.css"){
		fs.readFile("styleBook.css", function(err, data){
			var text = data.toString();
			response.end(text);
		});
	}else if(path === "/favicon.ico"){

	}else if(path === "/style.css"){
		fs.readFile("style.css", function(err, data){
			var text = data.toString();
			response.end(text);
		});
	}else if(path_end === ".jpg"){
		var c_path = path.slice(1);
		console.log(c_path);
		// fs.readFile(c_path, function(err, data){
		// 	var text = data.toString();
		// 	response.end(text);
		// });
		var img = fs.readFileSync(c_path);
	    response.writeHead(200, {'Content-Type': 'image/gif' });
	    response.end(img, 'binary');
	}else{
		books.forEach(function(book){
			if(path === "/" + book){
				fs.readFile("b_template.html", function(err, data){
					var html = data.toString();
					fs.readFile("books/" + book, function(err, data){
						var text = data.toString();
						console.log(text);
						var changed_text = text.replace(/\r\n\r\n/g, "</p><p>");
						changed_text = "<p>" + changed_text + "</p>";
						var complete = html.replace("INSERTHERE", changed_text);
						response.end(complete);
					});
				});
			};
		});
	};
});

server.listen(3000);