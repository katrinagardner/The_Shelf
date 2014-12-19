

var last_button = document.querySelector("#last");
var next_button = document.querySelector("#next");
var input = document.querySelector("input");

var link = document.URL;
var split = link.split("/");
var page = split[split.length-1];
var book_name = split[split.length-2];
console.log(page);
console.log(book_name);



last_button.addEventListener("click", function(){
	var new_page = parseInt(page) - 1;
	var url = "/" + book_name + "/" + new_page;
	console.log(url);
	window.location.replace(url);
});

next_button.addEventListener("click", function(){
	var new_page = parseInt(page) + 1;
	var url = "/" + book_name + "/" + new_page;
	console.log(url);
	window.location.replace(url);
});

input.addEventListener("keydown", function(evt){
	console.log("hey");
	if(evt.keyCode === 13){
		console.log("yo");
		window.location.replace("/" + book_name + "/" + input.value);
	}
}, false);