function SearchKP_name(name, year) {
	var data;

	var request = new XMLHttpRequest();
	let send = "name=" + name;
	request.open("POST", "/assets/php/index.php?method=searchKP_name", true);
	request.onload = function () {
		data = JSON.parse(this.response);
		//console.log(this.response);
		if (data.Response != "False") {
			data = JSON.parse(request.responseText);
			console.log(data);
			//console.log(responseText);
			DisplaySearchKP(data);
		} else {
			var er404 = document.getElementById("not-found");
			er404.hidden = false;
			var block = document.getElementById("search-add-block");
			block.hidden = true;
		}
	};

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(send);

	return data;
}

function SearchKP_id(id) {
	var data;

	var request = new XMLHttpRequest();
	let send = "id=" + id;
	request.open("POST", "/assets/php/index.php?method=searchKP_id", true);
	request.onload = function () {
		console.log(request.responseText);
		data = JSON.parse(request.responseText);

		let i = 0;
		data["fullGenres"] = "";
		data["fullCountries"] = "";
		while (i < data.data.genres.length) {
			data["fullGenres"] += data.data.genres[i].genre;
			console.log(data.data.genres[i].genre);
			i++;
			if (i != data.data.genres.length) data["fullGenres"] += ", ";
		}
		i = 0;
		while (i < data.data.countries.length) {
			data["fullCountries"] += data.data.countries[i].country;
			console.log(data.data.countries[i].country);
			i++;
			if (i != data.data.countries.length) data["fullCountries"] += ", ";
		}
		//data = request.responseText;
		console.log(data);
		AddContent_KP(data);
	};

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(send);

	return data;
}

function SearchIMDB() {
	var inputName = document.getElementById("name").value;
	//inputName = inputName.replace(/ /g, "+");
	var inputYear = document.getElementById("year").value;

	inputYear = "&y=" + inputYear;
	console.log(inputName, inputYear);

	var request = new XMLHttpRequest();

	request.open("GET", "http://www.omdbapi.com/?t=" + inputName + inputYear + "&plot=full&apikey=3acccab2", true);
	request.onload = function () {
		data = JSON.parse(this.response);
		if (data.Response != "False") {
			var linkToIMDB = "https://www.imdb.com/title/" + data.imdbID + "/";

			var block = document.getElementById("search-add-block");
			block.hidden = false;
			var er404 = document.getElementById("not-found");
			er404.hidden = true;

			var title = document.getElementById("title");
			var descr = document.getElementsByClassName("description")[0];
			var poster = document.getElementsByClassName("poster")[0];
			var IMDB = document.getElementById("linkIMDB");
			IMDB.setAttribute("href", linkToIMDB);
			title.textContent = data.Title;
			descr.textContent = data.Plot;
			console.log(data.Poster);
			poster.setAttribute("src", data.Poster);

			console.log(data);
		} else {
			var er404 = document.getElementById("not-found");
			er404.hidden = false;
			var block = document.getElementById("search-add-block");
			block.hidden = true;
		}
	};

	request.send();
}

function Search(where = "kinopoisk", returnData = false) {
	let data;
	if (where == "kinopoisk") {
		data = SearchKP_name();
		console.log("kp");
	} else data = SearchIMDB();

	if (returnData) return data;
	else return false;
}

$("#search-add").click(function () {});
/* $("#add-content").click(function () {
	let date = new Date(data.Released);

	console.log(date);
	console.log("=====");
	data.Released = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
	//data.Released = data.Released.format("yyyy-mm-dd");
	//data.Released = data.Released.toString();
	$.post(
		"./assets/php/index.php?method=addContent", // адрес обработчика
		data, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			console.log(msg);
		}
	);
});
 */
