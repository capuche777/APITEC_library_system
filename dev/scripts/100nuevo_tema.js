temas = [];

const nuevoTema = document.querySelector('#btn_ingreso_tema_aceptar');
nuevoTema.addEventListener('click', agregarTema);
let topicID = 1;

function agregarTema() {
    const topic = document.querySelector('#txt_ingreso_tema').value;
    const dateTopic = document.querySelector('#txt_ingreso_fecha_tema').value;

    const tema = {
        tema_id: topicID,
        tema: topic,
        fecha_ingreso: dateTopic
    }

    temas.push(tema);
    topicID = topicID+1;
    limpiarTemaForm();
}

function limpiarTemaForm() {
    const topic = document.querySelector('#txt_ingreso_tema').value = "";
    const dateTopic = document.querySelector('#txt_ingreso_fecha_tema').value = "";
}