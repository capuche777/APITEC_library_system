/**
 * Variable para contener a los usuarios que existan en localStorage
 */
let usuarios;
/**
 * Variable para almacenar el inicio de sesion, de este modo se bloqueará el doble inicio en una computadora
 */
let sesion;

/**
 * Chequear si existen usuarios regisrados para poder realizar la accion del logueo
 */
if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
}

/**
 * Chequear si existe sesion activa, si existe automaticamente envia a la pagina de libros, caso contrario
 * queda en la pantalla de registro
 */
if (localStorage.getItem('sesion')) {
    sesion = localStorage.getItem('sesion');
    if (sesion == 1) {
        window.location.href = 'libros.html';
    }
}

/**
 * Alcanzar el boton iniciar, para que cuando se de clic, se ejecute la funcion para validar
 * el inicio de sesion
 */
const iniciar = document.querySelector('#btn_iniciar');
iniciar.addEventListener('click', Validar_Login);

/**
 * La funcion toma los campos de correo y contrasenia
 * 1.- Valida que no esten vacios, si estos estan vacios enviara un error
 * 2.- Pasada la validacion anterior, chequea que los datos existan en un objeto
 * 3.- Si el usuario y contrasenia coinciden se crea una variable sesion con valor 1
 * 4.- Si los datos no coinciden desplegara una alerta indicando que el usuario no existe o
 * los datos ingresados no coinciden
 */
function Validar_Login() {
    const email = document.querySelector("#txt_user_email");
    const pass = document.querySelector("#txt_user_pass");

    if (email.value != ""
        && pass.value != "") {
            for (let i in usuarios) {
                if (email.value == usuarios[i]['correo']
                && pass.value == usuarios[i]['clave']) {
                    localStorage.setItem('sesion', 1);
                    localStorage.setItem('logged_user', i)
                }
            }
            if (localStorage.getItem('sesion')) {
                sesion = localStorage.getItem('sesion');
                if (sesion == "1") {
                    window.location.href = 'libros.html';
                }
            } else {
                alert('Usuario no existe y/o usuario y contraseña no coinciden');
            }
    } else {
        alert('Debe llenar los dos campos');
    }
}