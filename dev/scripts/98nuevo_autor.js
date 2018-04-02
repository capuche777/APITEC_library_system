// Array que almacena los autores ingresados
let paises = [];
const mundo = ["Guatemala", "Mexico"];
let autores = [];
let choosenPais = undefined;

const slcPais = document.querySelector('#slc_autor_pais');
slcPais.addEventListener('change', getPais)
// Funcion para crear objeto y select de paices del mundo
function crearPaises(el, i, arr) {

    var pais = {
         pais_id: i+1,
         nombre: el
    }
    paises.push(pais);

    const optPais = document.createElement('option');
    const optPaisCont = document.createTextNode(`${el}`);

    optPais.setAttribute('value', `${i+1}`);
    optPais.appendChild(optPaisCont);
    slcPais.appendChild(optPais);

}
mundo.forEach(crearPaises);

const nuevoAutor = document.querySelector('#btn_ingreso_autor_aceptar');

nuevoAutor.addEventListener('click', agregarAutor);

function agregarAutor(){
    const autorNombre = document.querySelector('#txt_nombre_autor').value;
    const autorApellido = document.querySelector('#txt_apellido_autor').value;
    let autorNac = choosenPais;
    let genero = document.getElementsByName('genero');
    // Recorre los select de genero
    for (var i = 0; i < genero.length; i++){
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }
    const autorBirth = document.querySelector('#txt_autor_fecha_nacimiento').value;
    const autorDeath = document.querySelector('#txt_autor_fecha_fallecimiento').value;
    const autorIngresoFec = document.querySelector('#txt_ingreso_fecha_autor').value;

    var autor = {
        autor_id: autores.length+1,
        nombre: autorNombre,
        aperllido: autorApellido,
        nacionalidad: autorNac,
        genero: genero,
        nacimiento: autorBirth,
        fallecimiento: autorDeath,
        fecha_ingreso: autorIngresoFec
    }

    autores.push(autor);
    localStorage.setItem('autores', JSON.stringify(autores));
    limpiarAutorForm();
}

function limpiarAutorForm() {
    document.querySelector('#txt_nombre_autor').value = "";
    document.querySelector('#txt_apellido_autor').value = "";
    document.querySelector('#txt_autor_fecha_nacimiento').value = "";
    document.querySelector('#txt_autor_fecha_fallecimiento').value = "";
    document.querySelector('#txt_ingreso_fecha_autor').value = "";
}

function getPais() {
    let paisSeleccionado = this.options[slcPais.selectedIndex].value;
    choosenPais = paisSeleccionado;
}