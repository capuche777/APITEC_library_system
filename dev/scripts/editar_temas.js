// Obtener el objeto Temas de localStorage
temas = JSON.parse(localStorage.getItem('temas'));
// Obtener la variable que almacena el item a editar
tema_edit = parseInt(localStorage.getItem('tema_edit'));

//Insertan los valores en el documento html
const tema = document.querySelector('#txt_editar_tema').value = temas[tema_edit]['tema'];
const fecha = document.querySelector('#txt_editar_fecha_tema').value = temas[tema_edit]['fecha_ingreso'];

//selecciona el boton guardar
var guardar = document.querySelector('#guardar');

// Funcion que guarda los datos editados, solo permite guardar el nombre del tema, el id y la fecha de ingreso son tomados del valor anterior
guardar.addEventListener('click', function() {
    var tema = {
        tema_id: temas[tema_edit]['tema_id'],
        tema: document.querySelector('#txt_editar_tema').value,
        fecha_ingreso: temas[tema_edit]['fecha_ingreso']
    }
    temas[tema_edit] = tema;
    localStorage.setItem('temas', JSON.stringify(temas));
    window.location.replace('/temas.html');
});

