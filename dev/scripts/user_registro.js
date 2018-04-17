let sesion;
/**
 * Chequear si existe sesion activa, si existe automaticamente envia a la pagina de libros, caso contrario
 * queda en la pantalla de registro
 */
if (localStorage.getItem('sesion')) {
    sesion = localStorage.getItem('sesion');
}


let usuarios; // Variable para almacenar los usuarios creados en el formulario de registro
let usuarioID = 0; // Variable creada para incrementar el ID de los usuarios conforme se registran
let Departamento = []; // // Array que almacena los departamentos de Guatemala
let Municipio = []; // Variable que almacena los objetos Municipio

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

// Contenedor de la lista de departamentos
const guate = ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Petén", "El Progreso", "Quiché", "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa", "Quetzaltenango", "Retalhuleu", "Sacatepéquez", "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán", "Zacapa"];

// Variable que almacena los municipios de Guatemala
const munis = [
    ["Cobán", "Santa Cruz Verapaz", "San Cristobal Verapaz", "Tactíc", "Tamahú", "San Miguel Tucurú", "Panzos", "Senahú", "San Pedro Carchá", "SanJuan Chamelco", "Lanquín", "Santa María Cahabón", "Chisec", "Chahal", "Fray Bartolomé de las Casas", "Santa Catarina La Tinta"],
    ["Salamá", "San Miguel Chicaj", "Rabinal", "Cubulco", "Granados", "Santa Cruz El Chol", "San Jerónimo", "Purulhá"],
    ["Chimaltenango", "San José Poaquil", "San Martín Jilotepeque", "San Juan Comalapa", "Santa Apolonia", "Tecpán Guatemala", "Patzun", "San Miguel Pochuta", "Patzicia", "Santa Cruz Balanyá", "Acatenango", "San Pedro Yepocapa", "San Andrés Itzapa", "Parramos", "Zaragoza", "El Tejar"],
    ["Chiquimula", "San José La Arada", "San Juan Hermita", "Jocotán", "Camotán", "Olopa", "Esquipulas", "Concepción Las Minas", "Quezaltepeque", "San Jacinto", "Ipala"],
    ["Flores", "San José", "San Benito", "San Andrés", "La Libertad", "San Francisco", "Santa Ana", "Dolores", "San Luis", "Sayaxche", "Melchor de Mencos", "Poptún"],
    ["Guastatoya", "Morazán", "San Agustín Acasaguastlan", "San Cristóbal Acasaguastlan", "El Jícaro", "Sansare", "Sanarate", "San Antonio La Paz"],
    ["Santa Cruz del Quiche", "Chiche", "Chinique", "Zacualpa", "Chajul", "Santo Tomás Chichicstenango", "Patzité", "San Antonio Ilotenango", "San Pedro Jocopilas", "Cunén", "San Juan Cotzal", "Joyabaj", "Santa María Nebaj", "San Andrés Sajcabajá", "San Miguel Uspatán", "Sacapulas", "San Bartolomé Jocotenango", "Canilla", "Chicaman", "Playa Grnade - Ixcán", "Pachalúm"],
    ["Escuintla", "Santa Lucía Cotzumalguapa", "La Democracia", "Siquinalá", "Masagua", "Pueblo Nuevo Tiquisate", "La Gomera", "Guanagazapa", "Puerto de San José", "Iztapa", "Palín", "San Vicente Pacaya", "Nueva Concepción"],
    ["Guatemala", "Santa Catarina Pinula", "San José Pinula", "San José del Golfo", "Palencia", "Chinautla", "San Pedro Ayampuc", "Mixco", "San Pedro Sacatepequez", "San Juan Sacatepequez", "San Raymundo", "Chuarrancho", "Fraijanes", "Amatitlán", "Villa Nueva", "Villa Canales", "San Miguel Petapa"],
    ["Huehuetenango", "Chiantla", "Malacatancito", "Cuilco", "Nentón", "San Pedro Necta", "Jacaltenango", "San Pedro Soloma", "San Ildelfonso Ixtahuac ́n", "Santa Bárbara", "La Libertad", "La Democracia", "San Miguel Acatán", "San Rafael La Independencia", "Todos Santos Chuchcumatán", "San Juan Atitán", "Santa Eulalia", "San Mateo Ixtatán", "Colotenango", "San Sebastián Huehuetenango", "Tectitán", "Concepción Huista", "San Juan Ixcoy", "San Antonio Huista", "San Sebastián Coatán", "Santa Cruz Barillas", "Aguacatán", "San Rafael Petzal", "San Gaspar Ixchil", "Santiago Chimaltenango", "Santa Ana Huista"],
    ["Puerto Barrios", "Livingston", "El Estor", "Morales", "Los Amates"],
    ["Jalapa", "San Pedro Pinula", "San Luis Jilotepeque", "San Manuel Chaparrón", "San Carlos Alzatate", "Monjas", "Mataquescuintla"],
    ["Jutiapa", "El Progreso", "Santa Catarina Mita", "Agua Blanca", "Asunción Mita", "Yupiltepeque", "Atescatempa", "Jerez", "El Adelanto", "Zapotitlán", "Comapa", "Jalpatagua", "Conguaco", "Moyuta", "Pasaco", "San José Acatempa", "Quezada"],
    ["Quetzaltenango", "Salcajá", "Olintepeque", "San Carlos Sija", "Sibilia", "Cabrican", "Cajola", "San Miguel Siguilça", "San Juan Ostuncalco", "San Mateo", "Concepción Chiquirichapa", "San Martín Sacatepequez", "Almolonga", "Cantel", "Huitán", "Zunil", "Colomba", "San Francisco La Unión", "El Palmar", "Coatepeque", "Génova", "Flores Costa Cuca", "La Esperanza", "Palestina de los Altos"],
    ["Retalhuelu", "San Sebastián", "Santa Cruz Mulúa", "San Martín Zapotitlán", "San Felipe Retalhuleu", "San Andrés Villa Seca", "Champerico", "Nuevo San Carlos", "El Asintal"],
    ["Antigua Guatemala", "Jocotenango", "Pastores", "Sumpango", "Santo Domingo Xenacoj", "Santiago Sacatepequez", "San Bartolomé Milpas Altas", "San Lucas Sacatepequez", "Santa Lucía Milpas Altas", "Magdalena Milpas Altas", "Santa María de Jesús", "Ciudad Vieja", "San Miguel Dueñas", "San Juan Alotenango", "San Antonio Aguas Calientes", "Santa Catarina Barahona"],
    ["San Marcos", "San Pedro Sacatepéquez", "Comitancillo", "San Antonio Sacatepéquez", "San Miguel Ixtahuacan", "Concepción Tutuapa", "Tacaná", "Sibinal", "Tajumulco", "Tejutla", "San Rafael Pié de la Cuesta", "Nuevo Progreso", "El Tumbador", "San José El Rodeo", "Malacatán", "Catarina", "Ayutla", "Ocos", "San Pablo", "El Quetzal", "La Reforma", "Pajapita", "Ixchiguan", "San José Ojetenán", "San Cristóbal Cucho", "Sipacapa", "Esquipulas Palo Gordo", "Río Blanco", "San Lorenzo"],
    ["Cuilapa", "Berberena", "San Rosa de Lima", "Casillas", "San Rafael Las Flores", "Oratorio", "San Juan TEcuaco", "Chiquimulilla", "Taxisco", "Santa María Ixhuatan", "Guazacapán", "Santa Cruz Naranjo", "Pueblo Nuevo Viñas", "Nueva Santa Rosa"],
    ["Sololá", "San José Chacaya", "Santa María Visitación", "Santa Lucía Utatlán", "Nahualá", "Santa Catarina Ixtahuacán", "Santa Clara La Laguna", "Concepción", "San Andrés Semetabaj", "Panajachel", "Santa Catarina Palopó", "San Antonio Palopó", "San Lucas Tolimán", "Santa Cruz La Laguna", "Sna Pablo La Laguna", "San Marcos La Laguna", "San Juan La Laguna", "San Pedro La Laguna", "Santiago Atitlán"],
    ["Mazatenango", "Cuyotenango", "San Francisco Zapotitlán", "San Bernardino", "San José El Ídolo", "Santo Domingo Suchitepequez", "San Lorenzo", "Samayac", "San Pablo Jocopilas", "San Antonio Suchitepéquez", "San Miguel Panán", "San Gabriel", "Chicacao", "Patulul", "Santa Bárbara", "San Juan Bautista", "Santo Tomás La Unión", "Zunilito", "Pueblo Nuevo Suchitepéquez", "Río Bravo"],
    ["Totonicapán", "San Cristóbal Totonicapán", "San Francisco El Alto", "San Andrés Xecul", "Momostenango", "Santa María Chiquimula", "Santa Lucía La Reforma", "San Bartolo Aguas Calientes"],
    ["Zacapa", "Estanzuela", "Río Hondo", "Gualán", "Teculután", "Usumatlán", "Cabañas", "San Diego", "La Unión", "Huite"]
];

let municipiosDinamicos =[]; // Almacenara un array segun el indice de los departamentos seleccionados
let departamentoSeleccionado; // Variable que asigna el departamento a los usuarios registrados
let choosenMncipio = undefined; // Variable que asigna el departamento a los usuarios registrados

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
const nombre = document.querySelector('#txt_nombre'); // Alcanza el campo nombre para obtener su valor
const apellido = document.querySelector('#txt_apellido'); // Alcanza en campo apellido para obtener su valor
const direccion =  document.querySelector('#txt_direccion'); // Alcanza el campo direccion para obtener su valor
const telefono = document.querySelector('#txt_telefono'); // Alcanza el campo telefono para obtener su valor
const correo = document.querySelector('#txt_correo'); // Alcanza el campo correo para obtener su valor
const pass = document.querySelector('#psw_contrasena'); // Alcanza el campo contraseña para obtener su valor
const pass2 =  document.querySelector('#psw_contrasena2'); // Alcanza el campo de confirmación de contraseña para obtener su valor
let genero = document.getElementsByName('genero'); // Selecciona los boton radio con el name 'genero'
const nacimiento = document.querySelector('#txt_nacimiento'); // Alcanza el campo nacimiento para obtener su valor
const cui =  document.querySelector('#txt_cui'); // Alcanza el campo CUI para obtenr su valor
const departamento = document.querySelector('#slc_departamento'); // Alcanza el select de departamento para obtener su valor
const municipio = document.querySelector('#slc_municipio'); // Alcanza el select de municipio para obtener su valor
const zona = document.querySelector('#txt_zona'); // Alcanza el campo zona para obtener su valor
const institucion = document.querySelector('#txt_institucion'); // Obtiene el valor del campo institucion
const escolaridad = document.querySelector('#slc_escolaridad'); // Alcanza el select de escolaridad para determinar el nivel ecademico de las personas
const tos = document.querySelector('#chk_tos'); // Alcanza el checkbox para validar los terminos y condiciones de servicio

/**
 * Generando dinámicamente los menús de Departamento
 */
function Crear_Departamentos(el, i, arr) {
    // Clase para crear los objetos de departamento
    const _departamento = {
        departamento_id: i+1,
        nombre: el
    };
    Departamento.push(_departamento);
    
    const optionDepto = document.createElement('option'); // Crea la etiqueta Option vacia
    const optionContent = document.createTextNode(`${el}`); // Indica el texto a insertar en el select

    optionDepto.setAttribute('value', `${i+1}`) // Inserta el atributo value a cada option
    optionDepto.appendChild(optionContent); // Le inserta el texto a cada uno de los options
    departamento.appendChild(optionDepto); // Inserta cada option en el Select
};

guate.forEach(Crear_Departamentos); // Crea automaticamente los elementos del menu dinamico

/**
 * La siguiente funcion toma los elementos del array munis para crear objetos con la estructura
 * indicada en las instrucciones, dicho objeto se utilizará para crear dinamicamente el menu de
 * municipio según los cambios del menu departamentos
 */
// Recorre los sub arrays de munis
for (var i=0, len=munis.length; i<len; i++) {
// recorre los elementos de cada sub array
    for (var j=0, len2=munis[i].length; j<len2; j++) {
/*j+1 inserta el index del elemento para convertirlo en el ID,
[i][j] extrae el nombre del elemento para convertirlo en el nombre del departamento
i+1 inserta el index del sub array para convertilo en el id del departamento*/
        const _municipio = {
            municipio_id: j+1,
            nombre: munis[i][j],
            departamento_id: i+1
        };
        Municipio.push(_municipio);
    }
}

departamento.addEventListener('change', Generar_Select_Municipios); // Registra los cambios en el select de departamento para posteriormente generar dinamicamente los municipios segun su departamento

function Generar_Select_Municipios() {
    departamentoSeleccionado = this.options[departamento.selectedIndex].value; // Obtiene el indice del departametno seleccionado
/**
 * Cada vez que cambia la seleccion automaticamente se llena el array municipiosDinamicos, por lo tanto si este vuelve a cambiar
 * es necesario limpiarlo, para eso se ha creado la siguiente funcion
 */
    function Limipiar_Municipios() {
        if (municipiosDinamicos.length > 0){
            municipiosDinamicos = [];
            municipio.innerHTML = '<option value="0">Seleccione un municipio</option>';
        }
    }
    Limipiar_Municipios();
/**
 * Asigna los valores necesarios para generar los municipios
 * m = municipio (index)
 */
    for (let m in Municipio){
        if (Municipio[m]['departamento_id'] == departamentoSeleccionado){
            municipiosDinamicos.push(Municipio[m]['nombre']);
        }
    }

/**
 * Funcion que inserta los muicipios en el select de Municipios
 */
    function Insetar_Muncipios(el, i, arr) {
        const optionDepto = document.createElement('option'); // Crea la etiqueta option vacia
        const optionContent = document.createTextNode(`${el}`); // Indica el texto a insertar en el select

        optionDepto.setAttribute('value', `${i+1}`); // Inserta el atributo value a cada option
        optionDepto.appendChild(optionContent); // Le inserta el texto a cada uno de los options
        municipio.appendChild(optionDepto); // Inserta cada option en el Select
    }
    municipiosDinamicos.forEach(Insetar_Muncipios);
}


const registro = document.querySelector('#btn_registro'); // Alcanza el boton "Registrarme"

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
    // Recorre los select de genero
    for (var i = 0; i < genero.length; i++){
        if (genero[i].checked) {
            genero = genero[i].value;
        }
    }
    if (nombre.value != ""
        && apellido.value != ""
        && direccion.value != ""
        && telefono.value != ""
        && correo.value != ""
        && pass.value != ""
        && pass2.value != ""
        && genero >= 0
        && nacimiento.value != ""
        && cui.value != ""
        && departamento.value > 0
        && municipio.value > 0
        && zona.value != "") {
            if (pass.value != pass2.value) {
                alert('las contraseñas no coinciden');
            } else if (escolaridad.value > 0
                        && institucion.value == "") {
                alert('Debe ingresar Institucion Educativa');
            } else if (tos.checked == false) {
                alert('Debe aceptar los términos y condiciones');
            } else {
                Registrar_Usuario();
            }
    } else {
        alert('Todos los campos marcados con asterisco «*» son obligatorios')
    }
}

/**
 * Funcion que envia los usuarios registrados al objeto usuarios,
 * posteriormente guarda el objeto en localStorage
 * Ejecuta una suma sobre el ID del usuario para que este no se repita
 * Limpia el formulario visible por el usuario
 */
function Registrar_Usuario(){
    var usuario = {
        usuario_id: usuarioID,
        nombres: nombre.value,
        apellidos: apellido.value,
        direccion: direccion.value,
        telefono: telefono.value,
        correo: correo.value,
        clave: pass.value,
        genero: genero,
        departamento: departamento.value,
        municipio: municipio.value,
        zona: zona.value,
        institucion: institucion.value,
        escolaridad: escolaridad.value,
        estado: 1
    }
    usuarios.push(usuario);
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    Usuario_ID_Sum();
    Limpiar_Formulario();
}

/**
 * Funcion que se encarga de Limpiar el formulario luego de realizar un registro
 */
function Limpiar_Formulario() {
    nombre.value = "";
    apellido.value = "";
    direccion.value = "";
    telefono.value = "";
    correo.value = "";
    pass.value = "";
    pass2.value = "";
    genero = document.getElementsByName('genero');
    for (let i in genero) {
        genero[i].checked = false;
    }
    nacimiento.value = "";
    cui.value = "";
    departamento.value = "0";
    municipio.value = "0";
    zona.value = "";
    institucion.value = "";
    escolaridad.value = "0"
    tos.checked = false;
}