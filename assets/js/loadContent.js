function LoadMini() {
	let data;
	$.post(
		"./assets/php/index.php?method=loadContent", // адрес обработчика
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
		"./assets/php/index.php?method=loadContent", // адрес обработчика
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
		"./assets/php/index.php?method=loadMainContent", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			data = JSON.parse(msg);
			//console.log(msg);
			DisplayMain(data);
		}
	);
}
