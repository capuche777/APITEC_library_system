 // Existe localStorage?
 let temas;
try {
    if (localStorage.getItem) {
        temas = JSON.parse(localStorage.getItem('temas'));
    }
} catch(err) {
    console.log('error');
    temas = [];
}


// constantes que indican que se utilizara un formato de fecha
const d = new Date();
const m = new Date ();
const y = new Date();

// constantes para obtener la fecha actual
const day = d.getDate();
const month = m.getMonth();
const year = y.getFullYear();

// constante para indicar la fecha del dia de ingreso de informacion
const dateToday = `${day}/${month+1}/${year}`

const dateTopic = document.querySelector('#txt_ingreso_fecha_tema').value = dateToday;

// Obtiene el boton aceptar para el ingreso de temas
const nuevoTema = document.querySelector('#btn_ingreso_tema_aceptar');

// Monitorea el clic sobre el boton asignado anteriormente
nuevoTema.addEventListener('click', agregarTema);
let topicID = 1;


//Funcion encargada de crear los temas
function agregarTema() {
    const topic = document.querySelector('#txt_ingreso_tema').value;
    

    const tema = {
        tema_id: topicID,
        tema: topic,
        fecha_ingreso: dateTopic
    }

    temas.push(tema);
    for (let i = 0; i < temas.length; i++) {
        topicID = temas[i]['tema_id']+1;
    }
    localStorage.setItem('temas', JSON.stringify(temas));
    limpiarTemaForm();
}

// Funcion encargada de limpiar el formulario
function limpiarTemaForm() {
    const topic = document.querySelector('#txt_ingreso_tema').value = "";
}