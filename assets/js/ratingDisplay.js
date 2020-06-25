function getFullRating(id_content) {
	var data;

	var request = new XMLHttpRequest();
	request.open("POST", "./assets/php/index.php?method=getFullRating", false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	let send = "id=" + id_content;
	request.send(send);

	if (request.status == 200) {
		data = JSON.parse(request.responseText);
		//data = request.responseText;
		//console.log(id_content, data);
	}
	return data;
}

function getUserRating(id_content) {
	let url = new URL(document.URL);
	if (!id_content) {
		id_content = url.searchParams.get("id");
	}
	var data;

	var request = new XMLHttpRequest();
	request.open("POST", "./assets/php/index.php?method=getUserRating", false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	let send = "id=" + id_content;
	request.send(send);

	if (request.status == 200) {
		data = JSON.parse(request.responseText);
		//data = request.responseText;
		console.log(data);
	}
	return data;
}

/* function DisplayRating(id) {
	var f_rating = getFullRating(id);
	var rating = Number(f_rating.users).toFixed(1);

	document.getElementById("users-rating-" + id).textContent = rating;
	document.getElementById("imdb-rating-" + id).textContent = f_rating.imdb;
	document.getElementById("kp-rating-" + id).textContent = f_rating.kp;
}

var url_rate = new URL(document.URL);
let id_content = url_rate.searchParams.get("id");
if (id_content) {
	var f_rating = getFullRating(id_content);
	var rating = Number(f_rating.users).toFixed(1);

	document.getElementById("users-rating").textContent = rating;
	document.getElementById("imdb-rating").textContent = f_rating.imdb;
	document.getElementById("kp-rating").textContent = f_rating.kp;
} */
