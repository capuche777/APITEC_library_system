let administradores;
let admin_sesion;

localStorage.getItem('administradores') ? administradores = JSON.parse(localStorage.getItem('administradores')) : administradores = [];

const correo = document.querySelector('#txt_email');
const pass = document.querySelector('#pas_password');
const ingresar = document.querySelector('#btn_ingresar');

ingresar.addEventListener('click', () => {
    if (correo.value != ""
        && pass.value != "") {
            for (let i in administradores) {
                if (correo.value == administradores[i]['correo']
                    && pass.value == administradores[i]['password']) {
                        localStorage.setItem('admin_sesion', 1);
                        localStorage.setItem('logged_admin', i);
                }
            }
            // Ingresar aqui el if para obtener el admin
    } else {
        alert('Los dos campos son obligatorios')
    }
})