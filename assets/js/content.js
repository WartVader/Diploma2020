function AddContent_KP(data) {
	//data = SearchKP_id(id);
	$.post(
		"./assets/php/index.php?method=addContent", // адрес обработчика
		data, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			console.log(JSON.parse(msg));
			//console.log(msg);
		}
	);
}
