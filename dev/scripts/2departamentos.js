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
            _select.innerHTML = ' ';
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