// Obtener los objetos necesarios del localStorage
autores = JSON.parse(localStorage.getItem('autores'));
autor_edit = parseInt(localStorage.getItem('autor_edit'));
let paises = [];
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
    // coloca el objeto paises en el local storage
    localStorage.setItem('paises', JSON.stringify(paises));

    const optPais = document.createElement('option');
    const optPaisCont = document.createTextNode(`${el}`);

    optPais.setAttribute('value', `${i+1}`);
    optPais.appendChild(optPaisCont);
    slcPais.appendChild(optPais);

}
mundo.forEach(crearPaises);

// funcion para obtener el pais que selecciona el usuario
function getPais() {
    let paisSeleccionado = this.options[slcPais.selectedIndex].value;
    choosenPais = paisSeleccionado;
}

const nombre = document.querySelector('#txt_nombre_autor').value = autores[autor_edit]['nombre'];
const apellido = document.querySelector('#txt_apellido_autor').value = autores[autor_edit]['apellido'];
const autor_pais = document.querySelector('#slc_autor_pais').value = autores[autor_edit]['nacionalidad'];
choosenPais = document.querySelector('#slc_autor_pais').value = autores[autor_edit]['nacionalidad'];
let genero = document.getElementsByName('genero');
    // Recorre los select de genero
    for (var i = 0; i < genero.length; i++){
        if (autores[autor_edit].genero == "1") {
            genero[0].setAttribute('checked', true);
        } else {
            genero[1].setAttribute('checked', true);
        }
    }
const autor_nacimiento = document.querySelector('#txt_autor_fecha_nacimiento').value = autores[autor_edit]['nacimiento'];
const autor_fallecimiento = document.querySelector('#txt_autor_fecha_fallecimiento').value = autores[autor_edit]['fallecimiento'];
const ingreso = document.querySelector('#txt_ingreso_fecha_autor').value = autores[autor_edit]['fecha_ingreso'];

// Selecciona el boton guardar
const guardar = document.querySelector('#btn_guardar');

guardar.addEventListener('click', function() {
    
    for (var i = 0; i < genero.length; i++){
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }
    var autor = {
        autor_id: autores[autor_edit]['autor_id'],
        nombre: document.querySelector('#txt_nombre_autor').value,
        apellido: document.querySelector('#txt_apellido_autor').value,
        nacionalidad: choosenPais,
        genero: genero,
        nacimiento: document.querySelector('#txt_autor_fecha_nacimiento').value,
        fallecimiento: document.querySelector('#txt_autor_fecha_fallecimiento').value,
        fecha_ingreso: autores[autor_edit].fecha_ingreso,
        total_libros: autores[autor_edit].total_libros
    }

    autores[autor_edit] = autor;
    localStorage.setItem('autores', JSON.stringify(autores));
    window.location.href='/admin/autores.html';
});