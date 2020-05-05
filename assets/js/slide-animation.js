function SlideToLogin(to){
    
    let login = document.getElementsByClassName("login")[0];
    let el_login = document.getElementsByClassName("select_login")[0];
    let registration = document.getElementsByClassName("registration")[0];
    let el_registration = document.getElementsByClassName("select_registration")[0];
    console.log(el_login);
    
    el_login.classList.add('d-none');
    el_registration.classList.remove('d-none');
    registration.classList.add('stretchLeft');
    setTimeout(function() {
        registration.classList.add('d-none');
        registration.classList.remove('selected');
        login.classList.remove('d-none');
        login.classList.add('selected');
    }, 300);
    
    
}

function SlideToReg(to){
    
    let login = document.getElementsByClassName("login")[0];
    let el_login = document.getElementsByClassName("select_login")[0];
    let registration = document.getElementsByClassName("registration")[0];
    let el_registration = document.getElementsByClassName("select_registration")[0];
    console.log(el_login);
    login.classList.remove('d-none');
    login.classList.add('selected');
    el_login.classList.add('d-none');
    registration.classList.add('d-none');
    registration.classList.remove('selected');
    el_registration.classList.remove('d-none');
}