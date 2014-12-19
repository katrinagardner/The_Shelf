

var http = require("http");
var fs = require("fs");

var books = ["alice_wonderland.txt", "frankenstein.txt", "grimms_fairy_tales.txt",
"gullivers_travels.txt", "huckleberry.txt", "moby_dick.txt",
"sherlock_holmes.txt", "tale_two_cities.txt", "tom_sawyer.txt", "treasure_island.txt"];
var styles = ["styleBook.css", "style.css"];

var server = http.createServer(function(request, response){
	var path = request.url;
	console.log(path);
	var split = path.split("/");
	// console.log(split);
	var path_1 = split[1];
	var l = path_1.length;
	var path_end = path_1[l-4] + path_1[l-3] + path_1[l-2] + path_1[l-1];
	var path_js = path_1[l-3] + path_1[l-2] + path_1[l-1];
	// console.log(path_end);
	/*
		split = the path splitted, 0 being "" , 1 being the url, and 2 being the page number
		path_1 = the url
		path_end = .txt, or .css, or .jpg
	*/

	// gives index if path is empty
	if(path === "/"){
		fs.readFile("index.html", function(err,data){
			if(err){
				console.log("error");
			}else{
				// console.log("hey");
				var text = data.toString();
				response.end(text);
			}
		});

	// gives style sheet according by looping through stylesheet array
	}else if(path_end === ".css"){
		fs.readFile(path_1, function(err, data){
			var text = data.toString();
			response.end(text);
		});

	}else if(path === "/favicon.ico"){
		var c_path = path.slice(1);
		// console.log(c_path);
		var img = fs.readFileSync(c_path);
	    response.writeHead(200, {'Content-Type': 'image/gif' });
	    response.end(img, 'binary');

	// gives image by looping through 
	}else if(path_end === ".jpg"){
		var c_path = path.slice(1);
		// console.log(c_path);
		var img = fs.readFileSync(c_path);
	    response.writeHead(200, {'Content-Type': 'image/gif' });
	    response.end(img, 'binary');

	//sends text file by looping through books
	}else if(path_js === ".js"){
		fs.readFile(path_1, function(err, data){
			var text = data.toString();
			response.end(text);
		});
	}else if(path_end === ".txt"){
		var isNumber = parseInt(split[2]);
		if( isNaN(isNumber) ){
			fs.readFile(split[2], function(err, data){
			var text = data.toString();
			response.end(text);
		});
		}else{
			fs.readFile("b_template.html", function(err, data){
				var html = data.toString();
				fs.readFile("books/" + path_1, function(err, data){
					var text = data.toString();
					var text_arr = text.split("\r\n");
					var num_lines = text_arr.length;
					var num_pages = num_lines / 40;
					var pages = Math.floor(num_pages) + 1;
					// console.log(text_arr);
					var half_text = [];
					// console.log(split[2]);
					var lines = parseInt(split[2]) * 40;
					var min = lines - 40;
					console.log(min);
					while(min <= lines - 1){
						half_text.push(text_arr[min]);
						min++;
						console.log(min);
					}
					// console.log(half_text);
					half_text = half_text.join("\r\n");
					var changed_text = half_text.replace(/\r\n\r\n/g, "</p><p>");
					changed_text = "<p>" + changed_text + "</p>";
					var complete = html.replace("INSERTHERE", changed_text);
					complete = complete.replace("PAGENUMBER", split[2]);
					complete = complete.replace("TOTALPAGES", pages);
					response.end(complete);
				});
			});
		}



		// books.forEach(function(book){
		// 	if(path === "/" + book){
		// 		fs.readFile("b_template.html", function(err, data){
		// 			var html = data.toString();
		// 			fs.readFile("books/" + book, function(err, data){
		// 				var text = data.toString();
		// 				console.log(text);
		// 				var changed_text = text.replace(/\r\n\r\n/g, "</p><p>");
		// 				changed_text = "<p>" + changed_text + "</p>";
		// 				var complete = html.replace("INSERTHERE", changed_text);
		// 				response.end(complete);
		// 			});
		// 		});
		// 	};
		// });
	};
});

server.listen(3000);