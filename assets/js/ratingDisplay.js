function getFullRating(id_content) {
	let url = new URL(document.URL);
	if (!id_content) {
		id_content = url.searchParams.get("id");
	}
	var data;

	var request = new XMLHttpRequest();
	request.open("POST", "./assets/php/index.php?method=getFullRating", false);
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

var f_rating = getFullRating();
var rating = Number(f_rating.users).toFixed(1);
console.log(rating);

document.getElementById("users-rating").textContent = rating;
document.getElementById("imdb-rating").textContent = f_rating.imdb;
/* let i = 0;
if (rating > 1) {
	while (i < 10) {
		var fullstar = document.getElementById("full-star").cloneNode();
		var halfstar = document.getElementById("half-star").cloneNode();
		var emptystar = document.getElementById("empty-star").cloneNode();

		var blockstar = document.getElementById("stars");
		if (rating - i >= 1) {
			blockstar.appendChild(fullstar);
		}
		if (rating - i < 1) {
			blockstar.appendChild(halfstar);
		}

		i++;
	}
} else {
} */
