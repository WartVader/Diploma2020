function LoadMini() {
	let data;
	$.post(
		"./assets/php/loadContent.php", // адрес обработчика
		null, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			data = JSON.parse(msg);
			//console.log(data);
			DisplayMiniData(data);
		}
	);
}
function LoadFull() {
	let data;
	$.post(
		"./assets/php/loadContent.php", // адрес обработчика
		null, // отправляемые данные

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
		"./assets/php/loadMainContent.php", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			data = JSON.parse(msg);
			//console.log(msg);
			DisplayFull(data);
		}
	);
}
