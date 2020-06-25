function Search(name) {
	var data = false;
	var request = new XMLHttpRequest();
	let send = "name=" + name;
	request.open("POST", "/assets/php/index.php?method=search", false);
	request.onload = function () {
		data = JSON.parse(request.responseText);
		//console.log(data);
		//AddContent_KP(data);
	};

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(send);
	console.log(data);
	return data;
}

$("#search-content").submit(function (e) {
	e.preventDefault();
	var search = document.getElementById("search-input").value;
	document.location.href = "http://diplom/contents.html?search=" + search;
	//Search(search);
});

$("#search-content-reg").submit(function (e) {
	e.preventDefault();
	var name = document.getElementById("search-input-reg").value;
	var search = Search(name);
	DisplayMiniData(search, "content");
});
