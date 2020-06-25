function Login(data) {
	$.post(
		"./assets/php/index.php?method=login", // адрес обработчика
		$("#l_form").serializeArray(), // отправляемые данные

		function (msg) {
			// получен ответ сервера
			console.log(msg);
			if (msg == "true") document.location.href = "http://diplom/index.html";
			else if (msg == "false") {
				document.getElementById("invalid-entrance").hidden = false;
				if (!$("#login-enter").hasClass("incorrect")) {
					$("#login-enter").addClass("incorrect");
					console.log("asd");
				}
				if (!$("#password-enter").hasClass("incorrect")) {
					$("#password-enter").addClass("incorrect");
					console.log("asd");
				}
				if (!$(".selected").hasClass("incorrect")) {
					$(".selected").addClass("incorrect");
				}
			}
		}
	);
}
function Registration(data) {
	if ($("#login-reg").val() != "" && $("#password-reg").val() != "") {
		$.post(
			"./assets/php/index.php?method=checkReg", // адрес обработчика
			$("#r_form").serializeArray(), // отправляемые данные

			function (msg) {
				// получен ответ сервера
				let status = JSON.parse(msg);
				if ($("#login-reg").hasClass("incorrect")) {
					$("#login-reg").removeClass("incorrect");
					document.getElementById("invalid-login-null").hidden = true;
				}
				if ($("#password-reg").hasClass("incorrect")) {
					$("#password-reg").removeClass("incorrect");
					document.getElementById("invalid-password-null").hidden = true;
				}

				if (status.login == false) {
					if (!$("#login-reg").hasClass("incorrect")) {
						$("#login-reg").addClass("incorrect");
					}
					document.getElementById("invalid-login").hidden = false;
				} else {
					$("#login-reg").removeClass("incorrect");
					document.getElementById("invalid-login").hidden = true;
				}

				if (status.password == false) {
					if (!$("#r_password-reg").hasClass("incorrect")) {
						$("#r_password-reg").addClass("incorrect");
					}
					document.getElementById("invalid-password").hidden = false;
				} else {
					$("#r_password-reg").removeClass("incorrect");
					document.getElementById("invalid-password").hidden = true;
				}

				if (status.login == true && status.password == true) {
					$(".selected").removeClass("incorrect");
					$.post(
						"./assets/php/index.php?method=registration", // адрес обработчика
						data, // отправляемые данные

						function (msg) {
							// получен ответ сервера
							console.log(msg);
							if (msg == "true") document.location.href = "http://diplom/index.html";
						}
					);
					//$("#modal").modal();
				} else {
					if (!$(".selected").hasClass("incorrect")) {
						$(".selected").addClass("incorrect");
					}
				}
				console.log(status);
			}
		);
	} else {
		if (!$("#login-reg").hasClass("incorrect") && $("#login-reg").val() == "") {
			$("#login-reg").addClass("incorrect");
			document.getElementById("invalid-login-null").hidden = false;
		} else if (document.getElementById("invalid-login").hidden == true && $("#login-reg").val() != "") {
			$("#login-reg").removeClass("incorrect");
			document.getElementById("invalid-login-null").hidden = true;
		}

		if (!$("#password-reg").hasClass("incorrect") && $("#password-reg").val() == "") {
			$("#password-reg").addClass("incorrect");
			document.getElementById("invalid-password-null").hidden = false;
		} else if (document.getElementById("invalid-password").hidden == true && $("#password-reg").val() != "") {
			$("#password-reg").removeClass("incorrect");
			document.getElementById("invalid-password-null").hidden = true;
		}

		if (!$(".selected").hasClass("incorrect")) {
			$(".selected").addClass("incorrect");
		}
	}
}
