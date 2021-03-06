var USER = GetUser();
window.user = {
	id: USER.id,
	login: USER.login,
	username: USER.username,
	role: USER.role,
};

function GetUser() {
	var data;

	var request = new XMLHttpRequest();
	request.open("POST", "./assets/php/index.php?method=getUserInfo", false);
	request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
	request.send();

	if (request.status == 200) {
		//console.log(request.responseText);
		data = JSON.parse(request.responseText);
	}
	if (data.id != null) {
		document.getElementById("login").hidden = true;
		document.getElementById("user-icon").hidden = false;
	} else {
		document.getElementById("login").hidden = false;
		document.getElementById("user-icon").hidden = true;
	}
	if (data.role != "admin") {
		console.log(document.getElementById("add-new-content"));
		document.getElementById("add-new-content").remove();
	}

	return data;
}
