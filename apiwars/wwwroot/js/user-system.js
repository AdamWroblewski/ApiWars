import {getModalDomElements, getUserSystemButtons} from "./get-dom-elements.js";

export function changeLoginRegisterModal() {
    let userSystemButtons = getUserSystemButtons();
    let modalForm = getModalDomElements();

    if (userSystemButtons.registerButton){
        userSystemButtons.registerButton.addEventListener('click', () => changeModalRegister(modalForm));
    }

    if (userSystemButtons.loginButton){
        userSystemButtons.loginButton.addEventListener('click', () => changeModalLogin(modalForm));
    }
}

let changeModalRegister = function (modalForm) {
    modalForm.modalConfirm.style.visibility = "visible";
    modalForm.modalConfirm.innerHTML = 'Register';
    modalForm.modalHidden.value = 0;

};

let changeModalLogin = function (modalForm) {
    // modalForm.modalConfirm.style.visibility = "visible";
    modalForm.modalConfirm.innerHTML = 'Log in';
    // modalForm.modalHidden.value = 1;
};