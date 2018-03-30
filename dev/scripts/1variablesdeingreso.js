// Array que almacena los usuarios ingresados
let administradores = [];

// Array que almacena los libros ingresados
let libros = [];

// Array que almacena los autores ingresados
let autores = [];

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

// Seleccona el boton enviar del formulario de registro de usuarios
const enviar = document.querySelector('#btn_enviar');

// Selecciona el elemento select#depto para generar dinamicamente los municipios
const slcDepto = document.querySelector('#depto');
