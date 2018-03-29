// Array que almacena los departamentos de Guatemala
let Departamento = [];

const guate = ["Alta Verapaz", "Baja Verapaz", "Chimaltenango", "Chiquimula", "Petén", "El Progreso", "Quiché", "Escuintla", "Guatemala", "Huehuetenango", "Izabal", "Jalapa", "Jutiapa", "Quetzaltenango", "Retalhuleu", "Sacatepéquez", "San Marcos", "Santa Rosa", "Sololá", "Suchitepéquez", "Totonicapán", "Zacapa"];

// Funcion encargada de crear dinamicamente el objeto Departamento basado en la variable guate
function crearDeptos(el, i, arr) {
    let _depto = {
        departamento_id: i+1,
        nombre: el
    }
    Departamento.push(_depto)
}

guate.forEach(crearDeptos);
