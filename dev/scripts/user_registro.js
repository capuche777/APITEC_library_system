/**
 * Variable para almacenar los usuarios creados en el formulario de registro
 */
let usuarios;

/**
 * Variable creada para incrementar el ID de los usuarios conforme se registran
 */
let usuarioID = 0;

/**
 * Chequear si existen usuarios en el localStorage,
 * si existen serán descargados para empezar a almacenar
 * nuevos a partir del objeto existente, si no, se empezara
 * con un elemento nuevo, ambas opciones incrementan el ID del
 * usuario.
 */
if (localStorage.getItem('usuarios')) {
    usuarios = JSON.parse(localStorage.getItem('usuarios'));
    Usuario_ID_Sum();
} else {
    usuarios = [];
    Usuario_ID_Sum();
}

/**
 * Funcion creada para auto incrementar el ID del usuario de modo
 * que se asigna de menor a mayor 1,2,3,....10...20,etc
 */
function Usuario_ID_Sum() {
    if (usuarios.length > 0) {
        usuarioID = usuarios[usuarios.length-1].usuario_id+1;
    } else {
        usuarioID = 1;
    }
}

/**
 * Se declaran las siguientes variables como globales para poder ser utilizadas
 * mas de una vez, son las encargadas de obtener los datos dentro del fomrulario
 */
const nombre = document.querySelector('#txt_nombre');
const apellido = document.querySelector('#txt_apellido');
const direccion =  document.querySelector('#txt_direccion');
const telefono = document.querySelector('#txt_telefono');
const correo = document.querySelector('#txt_correo');
const pass = document.querySelector('#psw_contrasena');
const pass2 =  document.querySelector('#psw_contrasena2');
//const genero = PENDIENTE PORQUE ME TARDO MAS
const nacimiento = document.querySelector('#txt_nacimiento');
const cui =  document.querySelector('#txt_cui');
//const departamento = PENDIENTE PORQUE ME TARDO MAS
//const municipio = PENDIENTE PORQUE ME TARDO MAS
const zona = document.querySelector('#txt_zona');
const institucion = document.querySelector('#txt_institucion');
// const escolaridad = PENDIENTE PORQUE ME TARDO MAS
// const tos = PENDIENTE PORQUE ME TARDO MAS

/**
 * Alcanza el boton "Registrarme"
 */
const registro = document.querySelector('#btn_registro');

/**
 * Cuando se haga clic en el boton "Registrarme", este ejectuara
 * la funcion para registrar usuarios y es monitoreada a travez de
 * un evento, la funcion necesaria será validar que todos los campos esten
 * llenos
 */
registro.addEventListener('click', Validar_Formulario);

/**
 * La siguiente funcion toma los datos almacenados en cada uno de los
 * imputs, para posteriormente empujar los usuarios creados como un nuevo
 * objeto dentro del array "usuarios"
 */
function Validar_Formulario() {
    if (nombre.value != ""
        && apellido.value != ""
        && direccion.value != ""
        && telefono.value != ""
        && correo.value != ""
        && pass.value != ""
        && pass2.value != ""
        && nacimiento.value != ""
        && cui.value != ""
        && zona.value != "") {
            if (pass.value != pass2.value) {
                alert('las contraseñas no coinciden')
            } else {
                Registrar_Usuario();
            }
    } else {
        alert('Todos los campos marcados con asterisco «*» son obligatorios')
    }
}

function Registrar_Usuario(){
    var usuario = {
        usuario_id: usuarioID,
        nombres: nombre.value,
        apellidos: apellido.value,
        direccion: direccion.value,
        telefono: telefono.value,
        correo: correo.value,
        clave: pass.value
    }

    usuarios.push(usuario);
    Usuario_ID_Sum();
}