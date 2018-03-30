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
    let genero = document.getElementsByName('genero');
    // Recorre los select de genero
    for (var i = 0; i < genero.length; i++){
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }
    const nac = document.querySelector('#txt_nac').value;
    const cui = document.querySelector('#txt_cui').value;
    // Para validacion, pendiente let auth = document.querySelector('#rad_auth');

    const admin = {
        administrador_id: countIdAdmin,
        nombre: nombre,
        apellido: apellido,
        direccion: direccion,
        telefono: telefono,
        correo: correo,
        password: password,
        genero: genero,
        nacimiento: nac,
        cui: cui,
        departamento: choosenDpto,
        municipio: choosenMncipio
    }

    administradores.push(admin);
    countIdAdmin = countIdAdmin+1;
    limpiarAdmin();
}


// Re inicia los valores del formulario de registro de Administradores
function limpiarAdmin() {
    document.querySelector('#txt_nombres').value = "";
    document.querySelector('#txt_apellidos').value = "";
    document.querySelector('#txt_direccion').value = "";
    document.querySelector('#tel_telefono').value = "";
    document.querySelector('#mail_correo').value = "";
    document.querySelector('#pass_contrasenia').value = "";
}