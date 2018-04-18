/*
 *Las siguientes variables son necesarias para la creacion de usuarios 
 */

// Array que almacena los usuarios ingresados
let administradores;

// Variable creada para asignar el ID a los usuarios registrados
let countIdAdmin = 0;

/**
 * Chequear si existe el objeto administradores
 */
if (localStorage.getItem('administradores')) {
    administradores = JSON.parse(localStorage.getItem('administradores'));
    IncrementarID();
} else {
    administradores = [];
    IncrementarID();
}

// Array que almacena los departamentos de Guatemala
let Departamento = [];

// Variable que almacena los objetos Municipio
let Municipio = [];

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

// Toma los elementos para crear un menu dinamico
let dinamicoMuni =[];

const nombre = document.querySelector('#txt_nombres');
const apellido = document.querySelector('#txt_apellidos');
const direccion = document.querySelector('#txt_direccion');
const telefono = document.querySelector('#tel_telefono');
const correo = document.querySelector('#mail_correo');
const pass = document.querySelector('#pass_contrasenia');
const pass2 = document.querySelector('#pass_contrasenia2');
let genero = document.getElementsByName('genero');
const nacimiento = document.querySelector('#txt_nac');
const cui = document.querySelector('#txt_cui');
const auth = document.querySelector('#rad_auth');
const tos =  document.querySelector('#chk_tos');



// variable que asigna el departamento a los usuarios registrados
let choosenDpto = undefined;

//variable que asigna el departamento a los usuarios registrados
let choosenMncipio = undefined;

// Seleccona el boton enviar del formulario de registro de usuarios
const enviar = document.querySelector('#btn_enviar');

// Selecciona el elemento select#depto para generar dinamicamente los municipios
const slcDepto = document.querySelector('#depto');

// Funcion encargada de crear dinamicamente el objeto Departamento basado en la variable guate

// Funcion para crear los departamentos
function crearDeptos(el, i, arr) {
    // Clase para crear los objetos de departamento
    const _depto = {
        departamento_id: i+1,
        nombre: el
    };
    Departamento.push(_depto);

    // Selecciona el Select para insertar los departamentos
    const select = document.querySelector('#depto');
    // Crea la etiqueta Option vacia
    const optionDepto = document.createElement('option');
    // Indica el texto a insertar en el select
    const optionContent = document.createTextNode(`${el}`);

    // Inserta el atributo value a cada option
    optionDepto.setAttribute('value', `${i+1}`)
    // Le inserta el texto a cada uno de los options
    optionDepto.appendChild(optionContent);
    // Inserta cada option en el Select
    select.appendChild(optionDepto);
};

guate.forEach(crearDeptos);

// Recorre los sub arrays de munis
for (var i=0, len=munis.length; i<len; i++) {
    // recorre los elementos de cada sub array
    for (var j=0, len2=munis[i].length; j<len2; j++) {
        /*j+1 inserta el index del elemento para convertirlo en el ID,
        [i][j] extrae el nombre del elemento para convertirlo en el nombre del departamento
        i+1 inserta el index del sub array para convertilo en el id del departamento*/
        const _mncipio = {
            municipio_id: j+1,
            nombre: munis[i][j],
            departamento_id: i+1
        };
        Municipio.push(_mncipio);
    }
}

// Encargado de obtener el cambio en el select#depto para modificar la seleccion de municipios
slcDepto.addEventListener('change', genArray);

// Cada vez que hace un cambio en el Selet Departamentos se ejecuta la siguiente funcion
function genArray(){
    let seleccionado = this.options[slcDepto.selectedIndex].value;
    choosenDpto = seleccionado;
    //Coloca el array de menus a cero y al mismo tiempo limpia el select de municipios    
    function limpiarSelect() {
        if (dinamicoMuni.length > 0) {
            dinamicoMuni = [];
            // Selecciona el Select para realizar la limpieza y por ultimo limpia el array
            const _select = document.querySelector('#mncipio');
            _select.innerHTML = '<option value="0">Seleccione un municipio</option>';
        }
    }
    limpiarSelect();

    // Asigna los valores necesarios para generar el menu dinamico de muicipios
    for (var i in Municipio) {
        if (Municipio[i].departamento_id == seleccionado) {
            dinamicoMuni.push(Municipio[i].nombre);
        }
    };
    // Funcion para crear los municipios
    function crearMenuMunis(el, i, arr) {
        // Selecciona el Select para insertar los municipios
        const select = document.querySelector('#mncipio');
        // Crea la etiqueta Option vacia
        const optionDepto = document.createElement('option');
        // Indica el texto a insertar en el select
        const optionContent = document.createTextNode(`${el}`);

        // Inserta el atributo value a cada option
        optionDepto.setAttribute('value', `${i+1}`);
        // Le inserta el texto a cada uno de los options
        optionDepto.appendChild(optionContent);
        // Inserta cada option en el Select
        select.appendChild(optionDepto);
    };
    
    dinamicoMuni.forEach(crearMenuMunis);
};

const slcMncipio = document.querySelector('#mncipio');
slcMncipio.addEventListener('change', getMncipio);

function getMncipio() {
    let Munseleccionado = this.options[slcMncipio.selectedIndex].value;
    choosenMncipio = Munseleccionado;
}
//Encargado de obtener el clic del boton enviar del formulario y llamar a la fucion para agregar usuarios
enviar.addEventListener('click', Validar_Formulario);

/**
 * La siguiente funcion toma los datos almacenados en el formulario
 * de registro y los compara para saber que no quedan datos vacios
 */
function Validar_Formulario() {
    // Recorre los radio de genero
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
        && genero >= 0
        && nacimiento.value != ""
        && cui.value != ""
        && choosenDpto > 0
        && choosenMncipio > 0) {
            if (pass.value != pass2.value) {
                alert('Las contraseñas no coinciden');
            } else if (tos.cheked == false) {
                alert('Debes aceptar los teminos y condiciones')
            } else {
                agregarAdmin();
            }
    } else {
        alert('Debe llenar todos los campos')
    }
}

//Funcion encargada de agregar los usuarios a los objetos
function agregarAdmin(){
    const admin = {
        administrador_id: countIdAdmin,
        nombre: nombre.value,
        apellido: apellido.value,
        direccion: direccion.value,
        telefono: telefono.value,
        correo: correo.value,
        password: pass.value,
        genero: genero,
        nacimiento: nacimiento.value,
        cui: cui.value,
        departamento: choosenDpto,
        municipio: choosenMncipio
    }
    administradores.push(admin);
    localStorage.setItem('administradores', JSON.stringify(administradores));
    IncrementarID();
    limpiarAdmin();
}

function IncrementarID() {
    administradores.length > 0 ? countIdAdmin = administradores[administradores.length - 1]['administrador_id']+1 : countIdAdmin = 1;
}


// Re inicia los valores del formulario de registro de Administradores
function limpiarAdmin() {
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
    slcDepto.value = "0";
    slcMncipio.value = "0";
    tos.checked = false;
}