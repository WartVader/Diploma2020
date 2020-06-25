function LoadMini(recomend = false) {
	let data;
	let send = { recomend: recomend };
	$.post(
		"./assets/php/index.php?method=loadContent", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			//console.log(msg);
			data = JSON.parse(msg);
			//console.log(data);
			if (recomend == true) {
				SortByRecomend(data);
				data = MergeSort(data);
				//console.log(data);
			}
			//console.log(data);
			DisplayMiniData(data);
		}
	);
}
function LoadFull(type) {
	let data;
	let send = { type: false };
	if (type != undefined) {
		send = { type: type };
	}
	$.post(
		"./assets/php/index.php?method=loadContent", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			data = JSON.parse(msg);
			//console.log(msg);
			DisplayFullData(data);
		}
	);
}

function LoadFv() {
	var data = GetFv();
	DisplayFv(data);
}

function LoadMainContent(id) {
	let send = { id: id };
	$.post(
		"./assets/php/index.php?method=loadMainContent", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			data = JSON.parse(msg);
			//console.log(data);
			DisplayMain(data);
		}
	);
}

function SortByRecomend(data) {
	/* var rec_list;
	var request = new XMLHttpRequest();
	let send = "id=" + window.user.id;
	request.open("POST", "/assets/php/index.php?method=recomend", true);
	request.onload = function () {
		rec_list = JSON.parse(request.responseText);
		//console.log(request.responseText);
		//console.log(rec_list);
		//DisplaySearchKP(data);
	};

	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send(send); */

	return data;
}
