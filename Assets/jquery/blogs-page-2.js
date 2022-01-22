
//   navbutton toggle
document.getElementById("nav-toggle-btn").addEventListener("click", tooglenav);
function tooglenav(){
	document.getElementById("side-nav").classList.toggle("center-links-toggle");
}
document.getElementById("nav-toggle-btn-2").addEventListener("click", tooglenav);
function tooglenav(){
	document.getElementById("side-nav").classList.toggle("center-links-toggle");
}

//   navbutton toggle

// catorgories
document.getElementById("catogories-btn").addEventListener("click", togglecatogory);
function togglecatogory(){
	document.getElementById("catogories-toggle-div").classList.toggle("Categories-toggle");
}
document.getElementById("catogory-close-btn").addEventListener("click", togglecatogory);
function togglecatogory(){
	document.getElementById("catogories-toggle-div").classList.toggle("Categories-toggle");
}

// catorgories

// search-bar
function searchbar(){
$( window ).resize(function() {
	if ($(window).width() < 991) {
	  $('#search-bar-move').appendTo('.input-b');
	} else {
	$('#search-bar-move').appendTo('.input-a');
	}});
}

	window.onload = searchbar;
	// search-bar

