const btnChangePassword = document.querySelector('.btn__changePassword');
const passwords = document.querySelector('.input__password');

const displayChangePassword = () => {
    if (passwords.classList.contains('unclicked')) {
        passwords.classList.remove('unclicked');
        passwords.classList.add('clicked');
    }
    else {
        passwords.classList.remove('clicked');
        passwords.classList.add('unclicked');
    }
}
const init = () => {
    if (btnChangePassword != null) btnChangePassword.addEventListener('click', displayChangePassword);
}
init();