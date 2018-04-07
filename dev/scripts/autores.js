//llama el objeto autores del localStorage, necesario para la creacion de la tabla
autores = JSON.parse(localStorage.getItem('autores'));

//llama el objeto paises del localStorage, necesario para insertarlo en la tabla
paises = JSON.parse(localStorage.getItem('paises'));

// selecciona el div donde se insertara la tabla
const tabla =  document.querySelector('.tabla');

// Variable creada para generar dinamicamente el contenido de la tabla
let contenidoTabla = '';

// Al dar clic en el boton Agregar este debe reenviar a una nueva ventana para agregar nuevos autores
document.querySelector('#agregar_autor').addEventListener('click', function(){
    window.location.href='/nuevo_autor.html';
});

// Crea dinamicamente la tabla con los autores a, representa autores y p, representa paices en las variables declaradas
for (var a = 0; a < autores.length; a++) {
    //for (var p = 0; p < paises.length; p++) {
        contenidoTabla += "<tr class=''>"
            contenidoTabla += `<td>${parseInt(a)+1}</td>`
            contenidoTabla += `<td>${autores[a].nombre}</td>`
            contenidoTabla += `<td>${autores[a].aperllido}</td>`
            contenidoTabla += `<td>Pendiente</td>`
            contenidoTabla += `<td>${autores[a].fecha_ingreso}</td>`
            contenidoTabla += `<td id='edit${autores[a].autor_id}' onclick="AutorEditar(${a})">Editar</td>`
            contenidoTabla += `<td id='${autores[a].autor_id}' onclick="AutorEliminar(${a})">Eliminar</td>`
    //}
}
/*for (var i in autores) {
    for (var i in paises) {
        contenidoTabla += "<tr class='ocultar'>"
            contenidoTabla += `<td>${parseInt(a)+1}</td>`
            contenidoTabla += `<td>${autores[a].nombre}</td>`
    }
}*/

tabla.innerHTML = `
    <table border=1>
    <thead>
        <th>#</th>
        <th>Nombres</th>
        <th>Apellidos</th>
        <th>Nacionalidad</th>
        <th>Fecha de Ingreso</th>
        <th colspan=2>Operaciones</th>
    </thead>
    <tbody>
        ${contenidoTabla}
    </tbody>
    </table>
`;