const btnChangePassword = document.querySelector('.btn__changePassword');
const passwords = document.querySelector('.input__password');

const displayChangePassword = () => {
    if(passwords.classList.contains('unclicked')){
        passwords.classList.remove('unclicked');
        passwords.classList.add('clicked');
        //passwords.style.display = "flex";
    }
    else {
        passwords.classList.remove('clicked');
        passwords.classList.add('unclicked');
        //passwords.style.display = "none";
    }
}
const init = () => {
    //if(passwords != null)   passwords.style.display = "none";
    if(btnChangePassword != null)   btnChangePassword.addEventListener('click', displayChangePassword);
}
init();