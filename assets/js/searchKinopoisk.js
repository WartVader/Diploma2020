function SearchKP_name(name, year) {
	var inputName;
	var inputYear;
	var data;

	if (!name) inputName = document.getElementById("name").value;
	else inputName = name;
	if (!year) inputYear = document.getElementById("year").value;
	else inputYear = year;

	var request = new XMLHttpRequest();

	let search = encodeURI("keyword=" + inputName + "&page=1");
	request.open("GET", "http://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?" + search, false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.setRequestHeader("X-API-KEY", "cf1fb679-cc1c-43c2-ba84-36f615f6cec2");

	//let send = "keyword=%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B0%20%D1%81%D0%B0%D0%B4%D0%BE%D0%B2&page=1";
	//request.send(send);
	request.send();
	if (request.status == 200) {
		data = JSON.parse(request.responseText);
		let i = 0;
		while (i < data.genres.length) {
			data["fullGenres"] += data.genres[i].genre;
			i++;
			if (i != data.genres.length) data["fullGenres"] += ", ";
		}
		i = 0;
		while (i < data.countries.length) {
			data["fullCountries"] += data.countries[i].country;
			i++;
			if (i != data.countries.length) data["fullCountries"] += ", ";
		}
		//data = request.responseText;
		console.log(data);
	}
	DisplaySearchKP(data);
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
	console.log("sch");
	let data;
	if (where == "kinopoisk") {
		data = SearchKP_name();
		console.log("kp");
	} else data = SearchIMDB();

	if (returnData) return data;
	else return false;
}

$("#search-add").click(function () {});
$("#add-content").click(function () {
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
