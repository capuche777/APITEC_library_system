//Encargado de obtener el clic del boton enviar del formulario y llamar a la fucion para agregar usuarios
enviar.addEventListener('click', agregarAdmin);

//Funcion encargada de agregar los usuarios a los objetos
function agregarAdmin(){

    const nombre = document.querySelector('#txt_nombres').value;
    const apellido = document.querySelector('#txt_apellidos').value;
    const direccion = document.querySelector('#txt_direccion').value;
    const telefono = document.querySelector('#tel_telefono').value;
    const correo = document.querySelector('#mail_correo').value;
    const password = document.querySelector('#pass_contrasenia').value;

    const admin = {
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        password: password
    }

    administradores.push(admin);
    limpiarAdmin();
}

function limpiarAdmin() {
    document.querySelector('#txt_nombres').value = "";
    document.querySelector('#txt_apellidos').value = "";
    document.querySelector('#txt_direccion').value = "";
    document.querySelector('#tel_telefono').value = "";
    document.querySelector('#mail_correo').value = "";
    document.querySelector('#pass_contrasenia').value = "";
}