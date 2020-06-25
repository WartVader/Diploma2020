function RateContent(id, rating) {
	let send = { id: id, rating: rating };
	$.post(
		"./assets/php/index.php?method=rateContent", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			//data = JSON.parse(msg);
			console.log(msg);
			location.reload();
		}
	);
}

function isRate(id) {
	var request = new XMLHttpRequest();
	let send = "id=" + id;
	let data;
	if (USER.id != null) {
		request.open("POST", "/assets/php/index.php?method=isRate", true);
		request.onload = function () {
			data = JSON.parse(request.responseText);

			console.log(data);
		};

		request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		request.send(send);
	}

	return data;
}

function Unrate(id) {
	let url = new URL(document.URL);
	if (!id) {
		id = url.searchParams.get("id");
	}

	let send = { id: id };
	$.post(
		"./assets/php/index.php?method=unrate", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			//data = JSON.parse(msg);
			console.log(msg);
			location.reload();
		}
	);
}
