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

    modalForm.modalText.innerHTML = `
    Register new user:
      <div class="form-group">
        <label for="inputLogin">User login: </label>
        <input type="text" class="form-control" id="inputLogin" placeholder="Enter login" name="login">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password: </label>
        <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password">
      </div>
    `;

    modalForm.modalTitle.innerHTML = 'Register new user';
    modalForm.modalConfirm.style.visibility = "visible";
    modalForm.modalConfirm.innerHTML = 'Register';
    modalForm.modalHidden.value = 0;

};

let changeModalLogin = function (modalForm) {

    modalForm.modalText.innerHTML = `
    Log in:
      <div class="form-group">
        <label for="inputLogin">User login: </label>
        <input type="text" class="form-control" id="inputLogin" placeholder="Enter login" name="login">
      </div>
      <div class="form-group">
        <label for="inputPassword">Password: </label>
        <input type="password" class="form-control" id="inputPassword" placeholder="Password" name="password">
      </div>
    `;

    modalForm.modalTitle.innerHTML = 'Log in';
    modalForm.modalConfirm.style.visibility = "visible";
    modalForm.modalConfirm.innerHTML = 'Log in';
    modalForm.modalHidden.value = 1;
};