// Funcion encargada de crear dinamicamente el objeto Departamento basado en la variable guate

// Funcion para crear los departamentos
function crearDeptos(el, i, arr) {
    let _depto = {
        departamento_id: i+1,
        nombre: el
    }
    Departamento.push(_depto)
    
    // Selecciona el Select para insertar los departamentos
    var select = document.querySelector('#depto');
    // Crea la etiqueta Option vacia
    var optionDepto = document.createElement('option');
    // Indica el texto a insertar en el select
    var optionContent = document.createTextNode(`${el}`)

    // Inserta el atributo value a cada option
    optionDepto.setAttribute('value', `${i+1}`)
    // Le inserta el texto a cada uno de los options
    optionDepto.appendChild(optionContent);
    // Inserta cada option en el Select
    select.appendChild(optionDepto);
}

guate.forEach(crearDeptos);
