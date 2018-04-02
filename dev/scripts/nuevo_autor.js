// Array que almacena los autores ingresados
let paises = [];
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