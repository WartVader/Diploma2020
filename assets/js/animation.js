let w_login = false; //window login
let w_registration = false; //

let c_login = false; //check login
let c_password = false; //
let c_date = false; //

$(document).ready(function () {
	let width = $(".none-selected").width();
	let top = $(".none-selected").position().top - $(".none-selected").height() / 2;

	if (act == "registration") {
		w_registration = true;
		document.getElementById("login-block").setAttribute("style", "display:none;");
		$(".block-absolute").offset({ top: top, left: $(".select_registration").position().left });
		console.log($(".select_registration").position().left);
	} else {
		w_login = true;
		document.getElementById("registration-block").setAttribute("style", "display:none;");
		$(".block-absolute").offset({ top: top, left: $(".select_login").position().left });
		console.log($(".select_login").position().left);
	}
	//$(".block-absolute").offset({ top: top, left: $(".none-selected").position().left });

	//переход-анимация к блоку входа
	$("#slidetoLogin").click(function () {
		$(".block-absolute").animate({ left: $(".select_login").position().left }, 300);
		$(".registration").fadeOut(150);
		setTimeout(function () {
			$(".login").fadeIn(150);
		}, 150);
		w_login = true;
		w_registration = false;
	});
	//переход-анимация к блоку регистрации
	$("#slidetoReg").click(function () {
		$(".block-absolute").animate({ left: $(".select_registration").position().left }, 300);
		$(".login").fadeOut(150);
		setTimeout(function () {
			$(".registration").fadeIn(150);
		}, 150);
		w_login = false;
		w_registration = true;
	});
});
//условие при изменении размера окна
$(window).resize(function () {
	let top = $(".none-selected").position().top - $(".none-selected").height() / 2;

	if (w_login) {
		$(".block-absolute").offset({ top: top, left: $(".select_login").position().left });
	} else if (w_registration) {
		$(".block-absolute").offset({
			top: top,
			left: $(".select_registration").position().left,
		});
	}
});
