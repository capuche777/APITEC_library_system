//Seleccona el boton enviar del formulario de registro de usuarios
var enviar = document.querySelector('#btn_enviar');

//Encargado de obtener el clic del boton enviar del formulario y llamar a la fucion para agregar usuarios
enviar.addEventListener('click', agregarUsuario);

//Funcion engargada de agregar los usuarios a los objetos
function agregarUsuario(){

    var nombre = document.querySelector('#txt_nombres').value;
    var apellido = document.querySelector('#txt_apellidos').value;
    var direccion = document.querySelector('#txt_direccion').value;
    var telefono = document.querySelector('#tel_telefono').value;
    var correo = document.querySelector('#mail_correo').value;
    var password = document.querySelector('#pass_contrasenia').value;

    var usuario = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        password: password
    }

    usuarios.push(usuario);
    limpiarUsuario();
}

function limpiarUsuario() {
    document.querySelector('#txt_nombres').value = "";
    document.querySelector('#txt_apellidos').value = "";
    document.querySelector('#txt_direccion').value = "";
    document.querySelector('#tel_telefono').value = "";
    document.querySelector('#mail_correo').value = "";
    document.querySelector('#pass_contrasenia').value = "";
}