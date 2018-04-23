// Array que almacena los autores ingresados
let autores;
// Array que almacena los objetos de los paices para poder trabajar con ellos
let paises;
// Variable para definir el ID del Autor
let autorID = 0;

// Chequear si existe autores en localStorage
if (localStorage.getItem('autores')) {
    autores = JSON.parse(localStorage.getItem('autores'));
    AutorIDSum();
} else {
    autores = [];
    AutorIDSum();
}

// Chequear si existe el objeto Paises en localStorage
if (localStorage.getItem('paises')) {
    paises = JSON.parse(localStorage.getItem('paises'));
} else {
    paises = [];
}

//Array que contiene los paices del mundo para ser insertados en el select
const mundo = ["Afganistán", "Albania", "Alemania", "Andorra", "Angola", "Antigua y Barbuda", "Arabia Saudita", "Argelia",
"Argentina", "Armenia", "Australia", "Austria", "Azerbaiyán", "Bahamas", "Bangladés", "Barbados", "Baréin", "Bélgica", "Belice",
"Benín", "Bielorrusia", "Birmania", "Bolivia", "Bosnia y Herzegovina", "Botsuana", "Brasil", "Brunéi", "Bulgaria", "Burkina Faso",
"Burundi", "Bután", "Cabo Verde", "Camboya", "Camerún", "Canadá", "Catar", "Chad", "Chile", "China", "Chipre", "Ciudad del Vaticano",
"Colombia", "Comoras", "Corea del Norte", "Corea del Sur", "Costa de Marfil", "Costa Rica", "Croacia", "Cuba", "Dinamarca",
"Dominica", "Ecuador", "Egipto", "El Salvador", "Emiratos Árabes Unidos", "Eritrea", "Eslovaquia", "Eslovenia", "España",
"Estados Unidos", "Estonia", "Etiopía", "Filipinas", "Finlandia", "Fiyi", "Francia", "Gabón", "Gambia", "Georgia", "Ghana",
"Granada", "Grecia", "Guatemala", "Guyana", "Guinea", "Guinea ecuatorial", "Guinea-Bisáu", "Haití", "Honduras", "Hungría",
"India", "Indonesia", "Irak", "Irán", "Irlanda", "Islandia", "Islas Marshall", "Islas Salomón", "Israel", "Italia", "Jamaica",
"Japón", "Jordania", "Kazajistán", "Kenia", "Kirguistán", "Kiribati", "Kuwait", "Laos", "Lesoto", "Letonia", "Líbano", "Liberia",
"Libia", "Liechtenstein", "Lituania", "Luxemburgo", "Madagascar", "Malasia", "Malaui", "Maldivas", "Malí", "Malta", "Marruecos",
"Mauricio", "Mauritania", "México", "Micronesia", "Moldavia", "Mónaco", "Mongolia", "Montenegro", "Mozambique", "Namibia",
"Nauru", "Nepal", "Nicaragua", "Níger", "Nigeria", "Noruega", "Nueva Zelanda", "Omán", "Países Bajos", "Pakistán", "Palaos",
"Panamá", "Papúa Nueva Guinea", "Paraguay", "Perú", "Polonia", "Portugal", "Reino Unido", "República Centroafricana", "República Checa",
"República de Macedonia", "República del Congo", "República Democrática del Congo", "República Dominicana", "República Sudafricana",
"Ruanda", "Rumanía", "Rusia", "Samoa", "San Cristóbal y Nieves", "San Marino", "San Vicente y las Granadinas", "Santa Lucía",
"Santo Tomé y Príncipe", "Senegal", "Serbia", "Seychelles", "Sierra Leona", "Singapur", "Siria", "Somalia", "Sri Lanka", "Suazilandia",
"Sudán", "Sudán del Sur", "Suecia", "Suiza", "Surinam", "Tailandia", "Tanzania", "Tayikistán", "Timor Oriental", "Togo", "Tonga",
"Trinidad y Tobago", "Túnez", "Turkmenistán", "Turquía", "Tuvalu", "Ucrania", "Uganda", "Uruguay", "Uzbekistán", "Vanuatu",
"Venezuela", "Vietnam", "Yemen", "Yibuti", "Zambia", "Zimbabue"];

// Se ha declarado para obtener el valor seleccionado del usuario
let choosenPais;

const slcPais = document.querySelector('#slc_autor_pais');
slcPais.addEventListener('change', getPais)
// Funcion para crear objeto y select de paices del mundo
function crearPaises(el, i, arr) {

    var pais = {
         pais_id: i+1,
         nombre: el
    }
    paises.push(pais);
    // coloca el objeto paises en el local storage
    localStorage.setItem('paises', JSON.stringify(paises));

    const optPais = document.createElement('option');
    const optPaisCont = document.createTextNode(`${el}`);

    optPais.setAttribute('value', `${i+1}`);
    optPais.appendChild(optPaisCont);
    slcPais.appendChild(optPais);

}
mundo.forEach(crearPaises);

// constantes que indican el formato de fecha a utilizar
const d = new Date();
const m = new Date();
const y = new Date();

// constantes para obtener la fecha actual
const day = d.getDate();
const month = m.getMonth();
const year = m.getFullYear();

// constante para indicar la fecha del dia de ingreso del autor
const dateToday = `${day}/${month+1}/${year}`;

// Auto imprime la fecha del dia en el imput de fecha de ingreso
const autorIngresoFec = document.querySelector('#txt_ingreso_fecha_autor').value = dateToday;

// Funcion para autor Incrementar el ID de los autores
function AutorIDSum(){
    if (autores.length > 0) {
        autorID = autores[autores.length-1].autor_id+1;
    } else {
        autorID = 1;
    }
}

//selecciona el boton de aceptar para el ingreso de autores


/**
 * Variables declaradas para ser usadas globalmente
 */
const nombre = document.querySelector('#txt_nombre_autor');
const apellido = document.querySelector('#txt_apellido_autor');
let nacionalidad = choosenPais;
let genero = document.getElementsByName('genero');
const nacimiento = document.querySelector('#txt_autor_fecha_nacimiento');
const muerte = document.querySelector('#txt_autor_fecha_fallecimiento');

// Funcion creda para validar el ingreso de autores
let Validar_Autor = () => {
    //Recorre los radio de genero para asignar un valor
    for (var i = 0; i < genero.length; i++) {
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }

    if (nombre.value != ""
        && apellido.value != ""
        && choosenPais > 0
        && genero >= 0
        && nacimiento != "") {
        Agregar_Autor();
    } else {
        alert('Debe llenar todos los campos');
    }
}

// Obtiene el cliec en el boton aceptar
document.querySelector('#btn_aceptar').addEventListener('click', Validar_Autor);

// Duncion que se ejecuta cuando se presiona el boton Agregar agutor, debe almacenar los datos en local storage
function Agregar_Autor(){
    genero = document.getElementsByName('genero');
    // Recorre los select de genero
    for (var i = 0; i < genero.length; i++){
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }

    var autor = {
        autor_id: autorID,
        nombre: nombre.value,
        apellido: apellido.value,
        nacionalidad: choosenPais,
        genero: genero,
        nacimiento: nacimiento.value,
        fallecimiento: muerte.value,
        fecha_ingreso: autorIngresoFec
    }

    autores.push(autor);
    localStorage.setItem('autores', JSON.stringify(autores));
    AutorIDSum();
    limpiarAutorForm();
}

//funcion encargada de limpiar el formulario de autores
function limpiarAutorForm() {
    nombre.value = "";
    apellido.value = "";
    document.querySelector('#slc_autor_pais').value = "0"
    /**
     * Primero se selecciona el radio por su atributo "name"
     * posteriormente se recorre con el ciclo "for" para poder
     * establecer que ninguno de los elementos será seleccionado
     */
    genero = document.getElementsByName('genero');
    for (var i = 0; i < genero.length; i++)
        genero[i].checked = false;
    nacimiento.value = "";
    muerte.value = "";
    document.querySelector('#txt_ingreso_fecha_autor').value = dateToday;
}

// funcion para obtener el pais que selecciona el usuario
function getPais() {
    let paisSeleccionado = this.options[slcPais.selectedIndex].value;
    choosenPais = paisSeleccionado;
}

// selecciona el boton regresar del usuario
const regresar = document.querySelector('#btn_ingreso_autor_regresar');

/*regresar.addEventListener('click', function(){
    window.location.href='autores.html';
});*/