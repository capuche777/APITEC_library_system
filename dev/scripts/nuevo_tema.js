 // Existe localStorage?
 let temas;
 let topicID = 0;
    if (localStorage.getItem('temas')) {
        temas = JSON.parse(localStorage.getItem('temas'));
        incrementarID();
    } else {
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




function incrementarID() {
    if (temas.length > 0) {
        topicID = temas[temas.length-1].tema_id+1;
    } else {
        topicID = 1;
    }
};

// funcion para regresar a la pagina de temas
document.querySelector('#btn_ingreso_tema_regresar').addEventListener('click', function(){
    window.location.href='/temas.html';
});

//Funcion encargada de crear los temas
function agregarTema() {
    const topic = document.querySelector('#txt_ingreso_tema').value;
    

    const tema = {
        tema_id: topicID,
        tema: topic,
        fecha_ingreso: dateTopic
    }

    temas.push(tema);
    localStorage.setItem('temas', JSON.stringify(temas));
    incrementarID();
    limpiarTemaForm();
}

// Funcion encargada de limpiar el formulario
function limpiarTemaForm() {
    const topic = document.querySelector('#txt_ingreso_tema').value = "";
}