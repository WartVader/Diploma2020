function Like(id) {
	if (window.user.id != null) {
		let send = { id: id };
		$.post(
			"./assets/php/index.php?method=addToFv", // адрес обработчика
			send, // отправляемые данные

			function (msg) {
				// получен ответ сервера
				//data = JSON.parse(msg);
				console.log(msg);
			}
		);
		ChangeStatus(id, true);
	} else {
		alert("Войдите в систему для добавление контента в понравившееся");
	}

	return true;
}

function Unlike(id) {
	let send = { id: id };
	$.post(
		"./assets/php/index.php?method=removeFv", // адрес обработчика
		send, // отправляемые данные

		function (msg) {
			// получен ответ сервера
			//data = JSON.parse(msg);
			//console.log(msg);
		}
	);
	ChangeStatus(id, false);
	return true;
}

function ChangeStatus(id, switchTo) {
	var block = document.getElementById(id);
	if (switchTo == false) {
		block.getElementsByTagName("button")[0].setAttribute("onclick", "Like(" + id + ")");
		block.getElementsByTagName("i")[0].setAttribute("class", "far fa-heart");
	} else {
		block.getElementsByTagName("button")[0].setAttribute("onclick", "Unlike(" + id + ")");
		block.getElementsByTagName("i")[0].setAttribute("class", "fas fa-heart");
	}
}

function GetFv(id) {
	if (window.user.id == null) {
		return false;
	}
	var data;

	var request = new XMLHttpRequest();
	request.open("POST", "./assets/php/index.php?method=getFvContent", false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	if (id) {
		let send = "id=" + id;
		request.send(send);
	} else {
		request.send();
	}

	if (request.status == 200) {
		data = JSON.parse(request.responseText);
		//data = request.responseText;
		console.log(data);
	}
	return data;
}
