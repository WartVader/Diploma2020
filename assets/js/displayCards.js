var fv = GetFv();
//console.log(fv);

function DisplayMiniData(data) {
	let i = 0;
	console.log(data);
	while (i < data.length) {
		var block = document.getElementsByClassName("content-block")[0].cloneNode(true); //блок контента
		block.removeAttribute("hidden");
		block.setAttribute("id", data[i].id);
		var linkToContent = "./content-page.html?id=" + data[i].id; //GET запрос на вывод контента с id

		if (window.user.id != null) {
			let j = 0;
			let liked = false;
			while (j < fv.length && liked == false) {
				if (fv[j].id == data[i].id) {
					liked = true;
					block.getElementsByTagName("i")[0].setAttribute("class", "fas fa-heart");
					block.getElementsByTagName("button")[0].setAttribute("onclick", "Unlike(" + data[i].id + ")"); //Добавить в понравившееся
				}
				j++;
			}
			if (liked == false) {
				block.getElementsByTagName("button")[0].setAttribute("onclick", "Like(" + data[i].id + ")");
				block.getElementsByTagName("i")[0].setAttribute("class", "far fa-heart");
			}
		} else {
			block.getElementsByTagName("button")[0].setAttribute("onclick", "Like(" + data[i].id + ")");
			block.getElementsByTagName("i")[0].setAttribute("class", "far fa-heart");
		}

		block.getElementsByTagName("a")[0].setAttribute("href", linkToContent); //ссылка на контент

		block.getElementsByClassName("poster")[0].setAttribute("src", data[i].poster); //постер контента

		//console.log(block);

		document.getElementsByClassName("content")[0].appendChild(block);
		i++;
	}
}

function DisplayFullData(data) {
	let i = 0;
	//console.log(data);
	while (i < data.length) {
		var block = document.getElementsByClassName("content-block")[0].cloneNode(true); //блок контента
		block.removeAttribute("hidden");
		block.setAttribute("class", "content-block main-info mb-5 d-flex");
		block.setAttribute("id", data[i].id);

		var linkToContent = "./content-page.html?id=" + data[i].id; //GET запрос на вывод контента с id

		let j = 0;
		let liked = false;
		while (j < fv.length && liked == false) {
			if (fv[j].id == data[i].id) {
				liked = true;
				block.getElementsByTagName("i")[0].setAttribute("class", "fas fa-heart");
				block.getElementsByTagName("button")[0].setAttribute("onclick", "Unlike(" + data[i].id + ")"); //Добавить в понравившееся
			}
			j++;
		}
		if (liked == false) {
			block.getElementsByTagName("button")[0].setAttribute("onclick", "Like(" + data[i].id + ")");
			block.getElementsByTagName("i")[0].setAttribute("class", "far fa-heart");
		}
		block.getElementsByTagName("a")[0].setAttribute("href", linkToContent); //ссылка на контент
		block.getElementsByClassName("title")[0].textContent = data[i].title; // Наименование контента
		block.getElementsByClassName("description")[0].textContent = data[i].description; //описание контента
		block.getElementsByClassName("poster")[0].setAttribute("src", data[i].poster); //постер контента

		//console.log(block);

		document.getElementsByClassName("container")[1].appendChild(block);
		i++;
	}
}

function DisplayFv(data) {
	let i = 0;
	console.log(data);
	while (i < data.length) {
		var block = document.getElementsByClassName("content-block")[0].cloneNode(true); //блок контента
		block.removeAttribute("hidden");
		block.setAttribute("id", data[i].id);
		var linkToContent = "./content-page.html?id=" + data[i].id; //GET запрос на вывод контента с id

		block.getElementsByTagName("a")[0].setAttribute("href", linkToContent); //ссылка на контент
		block.getElementsByTagName("button")[0].setAttribute("onclick", "Unlike(" + data[i].id + ")"); //Добавить в понравившееся
		block.getElementsByClassName("poster")[0].setAttribute("src", data[i].poster); //постер контента

		//console.log(block);

		document.getElementsByClassName("content")[0].appendChild(block);
		i++;
	}
}

function DisplayMain(data) {
	let isFv = GetFv(data.id);
	console.log(isFv);

	//Заполнение полей на странице с полной информацией о контенте
	document.getElementsByClassName("main-info")[0].setAttribute("id", data.id);
	document.getElementById("poster").setAttribute("src", data.poster);
	document.getElementById("title").textContent = data.title;
	document.getElementById("actors").textContent = data.actors;
	document.getElementById("writer").textContent = data.writer;
	document.getElementById("time").textContent = data.time + " минут";
	document.getElementById("country").textContent = data.country;
	document.getElementsByClassName("description")[0].textContent = data.description;

	if (isFv) {
		document.getElementsByClassName("icon-appear")[0].setAttribute("onclick", "Unlike(" + data.id + ")");
		document.getElementsByClassName("fa-heart")[0].setAttribute("class", "fas fa-heart");
	} else {
		document.getElementsByClassName("icon-appear")[0].setAttribute("onclick", "Like(" + data.id + ")");
		document.getElementsByClassName("fa-heart")[0].setAttribute("class", "far fa-heart");
	}
}

function DisplaySearchKP(data) {
	var searchBlock = document.getElementById("search-add-block");
	searchBlock.hidden = false;

	$(".content-block + .content-block").remove();

	var i = 0;
	//console.log(data);
	while (i < data.films.length) {
		console.log("while");
		var block = document.getElementsByClassName("content-block")[0].cloneNode(true); //блок контента
		block.hidden = false;
		block.setAttribute("class", "content-block main-info mb-5 d-flex");
		block.setAttribute("name", "content-block");
		block.setAttribute("id", data.films[i].id);

		var linkToContent = "https://www.kinopoisk.ru/film/" + data.films[i].filmId + "/"; //GET запрос на вывод контента с id

		block.getElementsByTagName("a")[0].setAttribute("href", linkToContent); //ссылка на контент
		//block.getElementsByClassName("title")[0].setAttribute("class") = data.films[i].nameRu; // Наименование контента
		block.getElementsByClassName("title")[0].textContent = data.films[i].nameRu; // Наименование контента
		if (data.films[i].nameEn != "") block.getElementsByClassName("eng-title")[0].textContent = data.films[i].nameEn;
		if (data.films[i].filmLength != "") block.getElementsByClassName("time")[0].textContent = data.films[i].filmLength;
		let j = 0;
		while (j < data.films[i].genres.length) {
			block.getElementsByClassName("genres")[0].textContent += data.films[i].genres[j].genre;
			j++;
			if (j != data.films[i].genres.length) block.getElementsByClassName("genres")[0].textContent += ", ";
			else block.getElementsByClassName("genres")[0].textContent += ";";
		}
		block.getElementsByClassName("year")[0].textContent = data.films[i].year;
		//block.getElementsByClassName("description")[0].textContent = data[i].description; //описание контента
		block.getElementsByClassName("poster")[0].setAttribute("src", data.films[i].posterUrl); //постер контента

		//console.log(block);

		document.getElementById("search-add-block").appendChild(block);
		i++;
	}
}
