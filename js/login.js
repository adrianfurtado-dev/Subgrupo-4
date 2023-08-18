const email = document.querySelector('#usuario');
const password = document.querySelector('#contrasena');
const remember = document.querySelector('#recordar')
const loginButton = document.querySelector('#button-login');
const title = document.querySelector('#title');
const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

const checkValidEmail = () => regex.test(email.value);

const checkValidPassword = () => password.value.length >= 8 && password.value.length <= 13;

const checkLoginInputs = () => checkValidEmail(email.value) && checkValidPassword();


const alertHTML =
`<div class="alert alert-danger max-content" id="login-alert" role="alert">
    Email o contraseña incorrectos
</div>`;

const loginAlert = () => {
    title.insertAdjacentHTML('afterend', alertHTML);
    setTimeout(() => {
        const alertElement = document.querySelector('#login-alert');
        alertElement.remove();
    }, 1500);
};

loginButton.addEventListener('click', event => {
    event.preventDefault();
    if(checkLoginInputs())
        if(remember.checked) {
            window.localStorage.setItem('logged', true);
            window.location.href = 'index.html';
        } else {
            window.sessionStorage.setItem('logged', true);
            window.location.href = 'index.html';
        }
    else
        loginAlert();
});