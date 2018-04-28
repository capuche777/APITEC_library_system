let administradores; // Almacena los administradores registrados
let admin_sesion; // Guarda el indice del administrador logueado

localStorage.getItem('admin_sesion') == 1 ? window.location.href = './libros.html' : false;

// Revisa si existe un objeto de administradores creado previamente
localStorage.getItem('administradores') ? administradores = JSON.parse(localStorage.getItem('administradores')) : administradores = [];

// Variables que alcanzan los elementos en la pantalla de logueo
const correo = document.querySelector('#txt_email');
const pass = document.querySelector('#pas_password');
const ingresar = document.querySelector('#btn_ingresar');

// Funcion a ejecutar al dar clic en el boton para ingresar
ingresar.addEventListener('click', () => {
// Valida que los campos de usuario y contraseña no queden sin rellenar
    if (correo.value != ""
        && pass.value != "") {
// Recorre el objeto de administradores buscando la coincidencia que haga match con el administrador que intenta loguear            
            for (let i in administradores) {
                if (correo.value == administradores[i]['correo']
                    && pass.value == administradores[i]['password']) {
                        localStorage.setItem('admin_sesion', 1);
                        localStorage.setItem('logged_admin', i);
                }
            }
// Una vez logueado el administrador envia a la pestaña de libros
            if (localStorage.getItem('admin_sesion')) {
                admin_sesion = localStorage.getItem('admin_sesion');
                if (admin_sesion == 1) {
                    alert('exito');
                    window.location.href = './libros.html'
                }
            } else {
                alert('usuario y contraseña no existen');
            }
    } else {
        alert('Los dos campos son obligatorios');
    }
})