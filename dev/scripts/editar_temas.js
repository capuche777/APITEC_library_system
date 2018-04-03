// Existe localStorage?
temas = JSON.parse(localStorage.getItem('temas'));
tema_edit = parseInt(localStorage.getItem('tema_edit'));

const tema = document.querySelector('#txt_editar_tema').value = temas[tema_edit]['tema'];
const fecha = document.querySelector('#txt_editar_fecha_tema').value = temas[tema_edit]['fecha_ingreso'];

var guardar = document.querySelector('#guardar');

guardar.addEventListener('click', function() {
    var tema = {
        tema_id: temas[tema_edit]['tema_id'],
        tema: document.querySelector('#txt_editar_tema').value,
        fecha_ingreso: temas[tema_edit]['fecha_ingreso']
    }
    temas[tema_edit] = tema;
    localStorage.setItem('temas', JSON.stringify(temas));
});

