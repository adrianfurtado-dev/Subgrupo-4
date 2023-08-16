const email = document.querySelector('#usuario');
const password = document.querySelector('#contrasena');
const remember = document.querySelector('#recordar')
const loginButton = document.querySelector('#button-login');
const title = document.querySelector('#title');

const checkLoginInputs = () => email.value !== '' && password.value !== '';
const alertHTML =
`<div class="alert alert-danger" role="alert">
    Email o contraseña incorrectos
</div>`
const loginAlert = () => title.insertAdjacentHTML('afterend', alertHTML);

loginButton.addEventListener('click', () => {
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