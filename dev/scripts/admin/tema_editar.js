// Obtener el objeto Temas de localStorage
temas = JSON.parse(localStorage.getItem('temas'));
// Obtener la variable que almacena el item a editar
tema_edit = parseInt(localStorage.getItem('tema_edit'));

//Insertan los valores en el documento html
const tema = document.querySelector('#txt_editar_tema').value = temas[tema_edit]['tema'];
const fecha = document.querySelector('#txt_editar_fecha_tema').value = temas[tema_edit]['fecha_ingreso'];

// Funcion que guarda los datos editados, solo permite guardar el nombre del tema, el id y la fecha de ingreso son tomados del valor anterior
function Tema_Editado() {
    var tema = {
        tema_id: temas[tema_edit]['tema_id'],
        tema: document.querySelector('#txt_editar_tema').value,
        fecha_ingreso: temas[tema_edit]['fecha_ingreso'],
        total_libros: temas[tema_edit]['total_libros']
    }
    temas[tema_edit] = tema;
    localStorage.setItem('temas', JSON.stringify(temas));  
};
// Funcion encargada de validar el ingreso de temas
function ValidarIngreso(){
    const topic = document.querySelector('#txt_editar_tema');
    if (topic.value != "") {
        Tema_Editado();
        alert('El tema ha sido editado')
        return true;    
    } else {
        alert("debe ingresar tema");
        return false;
    }
}