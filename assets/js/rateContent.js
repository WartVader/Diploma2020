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
